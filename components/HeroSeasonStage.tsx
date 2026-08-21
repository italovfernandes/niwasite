"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SEASONS } from "@/lib/catalog";

/**
 * Palco Hero + Galeria de estações, com 3 modos escolhidos no mount:
 *
 *  - "full"   (conexão boa): palco único sticky — vídeo do hero controlado por
 *             scroll que faz crossfade sem emenda para a galeria em ping-pong.
 *  - "lite"   (conexão ruim): MESMA cara, porém com as IMAGENS (posters) no lugar
 *             dos vídeos — hero estático + galeria horizontal em snap, sem baixar
 *             os ~46MB de vídeo. Escolhido por saveData / effectiveType 2g-3g /
 *             downlink baixo, ou (Safari/Firefox, sem a API) por um teste de
 *             velocidade que baixa 1 still (~100KB) e mede o tempo.
 *  - "reduce" (prefers-reduced-motion): pilha vertical estática, sem scroll-jack.
 *
 * Scroll-linked via rAF + getBoundingClientRect (Motion não é confiável neste
 * stack Next 16 / React 19).
 */

const HERO_SCROLL = 1.3; // viewports de scroll na fase do hero (modo full)
const SEASON_SCROLL = 0.9; // viewports por estação
const TOTAL = HERO_SCROLL + SEASONS.length * SEASON_SCROLL;
const HERO_END = HERO_SCROLL / TOTAL; // fração de p em que o hero termina (full)

const PHRASES: Record<string, string> = {
  primavera: "Your beauty at the peak of color",
  verao: "The soft, graceful calm of your colors",
  outono: "The poetry of the season, in our color fan",
  inverno: "The bold, bright presence of your colors",
};

// ordem de exibição da galeria (a paleta não segue a estação do ano):
// Verão → Outono → Inverno → Primavera
const SEASON_ORDER = ["verao", "outono", "inverno", "primavera"] as const;
const SLIDES = SEASON_ORDER.map((id) => {
  const s = SEASONS.find((x) => x.id === id)!;
  return {
    id: s.id,
    label: s.name,
    icon: s.icon,
    accent: s.accent,
    video: `/estacoes/${s.id}.mp4`,
    poster: `/estacoes/${s.id}.jpg`,
    phrase: PHRASES[s.id],
    href: `/loja?c=ferramentas`,
  };
});

type Mode = "full" | "lite" | "reduce";

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

/** Decide se a conexão é ruim (→ modo imagens). */
async function isSlowConnection(): Promise<boolean> {
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
    }
  ).connection;
  if (c) {
    if (c.saveData) return true;
    if (c.effectiveType && ["slow-2g", "2g", "3g"].includes(c.effectiveType)) return true;
    if (typeof c.downlink === "number" && c.downlink > 0 && c.downlink < 1.5) return true;
    return false;
  }
  // Sem Network Information API (Safari/Firefox) → teste de velocidade.
  try {
    const t0 = performance.now();
    const r = await fetch(`/herovideo/hero-last.jpg?probe=${Date.now()}`, {
      cache: "no-store",
    });
    await r.blob();
    return performance.now() - t0 > 1200; // ~100KB demorando > 1,2s = ruim
  } catch {
    return false;
  }
}

/** Indicador de estação (ícones = marcador do scroll + nome) sobre degradê preto. */
function SeasonIndicator({ active, visible }: { active: number; visible: boolean }) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42vh] bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-9 transition-opacity duration-700 md:pb-12 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-7">
          {SLIDES.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.id}
              src={s.icon}
              alt=""
              aria-hidden
              className={`h-9 w-9 transition-all duration-500 ${
                i === active
                  ? "scale-125 opacity-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                  : "scale-90 opacity-40"
              }`}
            />
          ))}
        </div>
        <p
          aria-live="polite"
          className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {SLIDES[active].label}
        </p>
      </div>
    </>
  );
}

/** Headline do hero (reutilizada no full e no lite). */
function HeroHeadline() {
  return (
    <div className="anim-rise max-w-xl">
      <h1 className="u-display text-[3rem] leading-[0.98] text-ink sm:text-6xl md:text-7xl">
        Awaken the garden
        <br />
        that lives <em className="font-light italic u-accent">within you.</em>
      </h1>
      <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
        Color fans and style dossiers to elevate your self-esteem.
      </p>
      <Link
        href="/loja"
        className="mt-8 inline-block rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-marsala-deep"
      >
        View the fans
      </Link>
    </div>
  );
}

export default function HeroSeasonStage() {
  const sectionRef = useRef<HTMLElement>(null); // palco full
  const liteGalRef = useRef<HTMLElement>(null); // galeria de imagens (lite)
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroHintRef = useRef<HTMLDivElement>(null);
  const seasonRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const activeRef = useRef(0);
  const stageRef = useRef(false);
  const playingRef = useRef(-1);
  const dirRef = useRef<1 | -1>(1);
  const lastTsRef = useRef(0);

  const [active, setActive] = useState(0);
  const [galleryLive, setGalleryLive] = useState(false);
  const [mode, setMode] = useState<Mode>("full");
  const [decided, setDecided] = useState(false);

  // ---- decidir o modo no mount ----
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (!cancelled) {
          setMode("reduce");
          setDecided(true);
        }
        return;
      }
      const slow = await isSlowConnection();
      if (!cancelled) {
        setMode(slow ? "lite" : "full");
        setDecided(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- rAF do palco FULL (vídeo): só roda quando decidido e em full ----
  useEffect(() => {
    if (mode !== "full" || !decided) return;
    let raf = 0;
    const tick = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const p = range > 0 ? clamp(-rect.top / range) : 0;
        const hp = clamp(p / HERO_END);

        // hero: scrub do vídeo (chega ao fim em hp≈0.9, depois segura)
        const hv = heroVideoRef.current;
        if (hv && hv.duration) {
          const t = clamp(hp / 0.9) * (hv.duration - 0.05);
          const d = t - hv.currentTime;
          if (Math.abs(d) > 0.033) hv.currentTime += d * 0.25;
        }
        if (heroTextRef.current)
          heroTextRef.current.style.opacity = String(clamp(1 - hp / 0.5));
        if (heroHintRef.current)
          heroHintRef.current.style.opacity = String(clamp(1 - hp / 0.12));

        // crossfade da camada do hero sobre a cena idêntica
        const heroOp = clamp(1 - (hp - 0.86) / 0.14);
        if (heroLayerRef.current) {
          heroLayerRef.current.style.opacity = String(heroOp);
          heroLayerRef.current.style.pointerEvents = heroOp < 0.05 ? "none" : "auto";
        }

        // galeria: índice ativo (snap)
        const gp = clamp((p - HERO_END) / (1 - HERO_END));
        const idx = Math.min(
          SLIDES.length - 1,
          Math.max(0, Math.floor(gp * SLIDES.length))
        );
        const live = hp >= 0.86;

        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
        if (live !== stageRef.current) {
          stageRef.current = live;
          setGalleryLive(live);
        }

        // playback: só o vídeo alvo toca; Primavera congelada até o handoff
        const desired = live ? idx : -1;
        if (desired !== playingRef.current) {
          playingRef.current = desired;
          dirRef.current = 1;
          seasonRefs.current.forEach((v, i) => {
            if (!v) return;
            if (i === desired) {
              try {
                v.currentTime = 0;
              } catch {}
              v.play().catch(() => {});
            } else {
              v.pause();
              try {
                v.currentTime = 0;
              } catch {}
            }
          });
        }

        // ping-pong do vídeo ativo: toca até o fim, volta de ré, repete
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastTsRef.current) / 1000);
        lastTsRef.current = now;
        const av = desired >= 0 ? seasonRefs.current[desired] : null;
        if (av && av.duration) {
          if (dirRef.current === 1) {
            if (av.currentTime >= av.duration - 0.06) {
              dirRef.current = -1;
              av.pause();
            }
          } else {
            av.currentTime = Math.max(0, av.currentTime - dt);
            if (av.currentTime <= 0.04) {
              dirRef.current = 1;
              av.play().catch(() => {});
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, decided]);

  // ---- rAF da galeria de IMAGENS (lite): só o índice ativo (snap) ----
  useEffect(() => {
    if (mode !== "lite") return;
    let raf = 0;
    const tick = () => {
      const sec = liteGalRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const p = range > 0 ? clamp(-rect.top / range) : 0;
        const idx = Math.min(
          SLIDES.length - 1,
          Math.max(0, Math.floor(p * SLIDES.length))
        );
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // ======================= MODO REDUCE (pilha estática) =======================
  if (mode === "reduce") {
    return (
      <section
        id="home-hero"
        className="relative -mt-[62px] bg-[#efe7db]"
        aria-label="Niwa — personal color analysis"
      >
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src="/herovideo/hero-first.jpg"
            alt="Model in a pastel dress with a bouquet of flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe7db]/80 via-[#efe7db]/10 to-transparent" />
          <div className="u-container relative flex h-full items-center">
            <HeroHeadline />
          </div>
        </div>
        {SLIDES.map((s) => (
          <div key={s.id} className="relative h-[80vh] w-full overflow-hidden">
            <Image src={s.poster} alt={`${s.label} season`} fill sizes="100vw" className="object-cover object-top" />
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-black/10 to-transparent pb-12">
              <p
                className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ==================== MODO LITE (mesma cara, com imagens) ===================
  if (mode === "lite") {
    return (
      <>
        {/* hero estático */}
        <section
          id="home-hero"
          className="relative z-20 -mt-[62px] h-screen w-full overflow-hidden bg-[#efe7db]"
          aria-label="Niwa — personal color analysis"
        >
          <Image
            src="/herovideo/hero-first.jpg"
            alt="Model in a pastel dress with a bouquet of flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#efe7db]/80 via-[#efe7db]/10 to-transparent"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="u-container">
              <HeroHeadline />
            </div>
          </div>
        </section>

        {/* galeria de imagens (mesmo snap + indicador) */}
        <section
          ref={liteGalRef}
          className="relative bg-[#efe7db]"
          style={{ height: `${(SLIDES.length * SEASON_SCROLL + 1) * 100}vh` }}
          aria-label="The four seasons"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div
              className="flex h-full w-[400%] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
              style={{ transform: `translateX(-${active * 25}%)` }}
            >
              {SLIDES.map((s) => (
                <div key={s.id} className="relative h-full w-1/4 shrink-0 overflow-hidden">
                  <Image
                    src={s.poster}
                    alt={`${s.label} season`}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
            <SeasonIndicator active={active} visible />
          </div>
        </section>
      </>
    );
  }

  // ===================== MODO FULL (palco de vídeo) =====================
  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative z-20 -mt-[62px] bg-[#efe7db]"
      style={{ height: `${(TOTAL + 1) * 100}vh` }}
      aria-label="Niwa — personal color analysis"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* CAMADA GALERIA (fundo) */}
        <div className="absolute inset-0 z-0">
          <div
            className="flex h-full w-[400%] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
            style={{ transform: `translateX(-${active * 25}%)` }}
          >
            {SLIDES.map((s, i) => (
              <div key={s.id} className="relative h-full w-1/4 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  ref={(el) => {
                    seasonRefs.current[i] = el;
                  }}
                  src={s.video}
                  poster={s.poster}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            ))}
          </div>
          <SeasonIndicator active={active} visible={galleryLive} />
        </div>

        {/* CAMADA HERO (topo) */}
        <div ref={heroLayerRef} className="absolute inset-0 z-30 will-change-[opacity]">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={heroVideoRef}
            src="/herovideo/hero-scrub.mp4"
            poster="/herovideo/hero-first.jpg"
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-top"
            onLoadedData={() => {
              if (heroVideoRef.current) heroVideoRef.current.currentTime = 0.001;
            }}
            onError={() => setMode("lite")}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#efe7db]/80 via-[#efe7db]/10 to-transparent"
          />

          <div className="absolute inset-0 flex items-center">
            <div ref={heroTextRef} className="u-container will-change-[opacity,transform]">
              <HeroHeadline />
            </div>
          </div>

          <div ref={heroHintRef} className="absolute inset-x-0 bottom-7 text-ink-soft">
            <div className="u-container flex items-center gap-3">
              <span className="block h-9 w-px overflow-hidden bg-ink-soft/25">
                <span className="anim-scroll-line block h-full w-full bg-ink-soft" />
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em]">
                Scroll to begin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
