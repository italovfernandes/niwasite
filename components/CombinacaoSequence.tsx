"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SEASONS } from "@/lib/catalog";

/* ------------------------------------------------------------------ *
 *  Sequência única dirigida por scroll (sticky nativo). TODO o timing
 *  (opacidades + cartas) roda por UM rAF + getBoundingClientRect — o
 *  padrão confiável deste stack (Motion useTransform→opacity não é).
 *  colagem → "Combinações perfeitas" → foto cresce até tela cheia →
 *  "ritmo certo" → foto ENCOLHE e VIRA o card do slot Deep Autumn →
 *  os outros cards abrem A PARTIR dela → círculo → arco + frases.
 * ------------------------------------------------------------------ */

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const seg = (v: number, i0: number, i1: number, o0: number, o1: number) =>
  o0 + (o1 - o0) * clamp01((v - i0) / (i1 - i0));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// envelope entra→segura→sai (4 pontos)
const env = (v: number, a: number, b: number, c: number, d: number) =>
  Math.min(seg(v, a, b, 0, 1), seg(v, c, d, 1, 0));
// menor ângulo equivalente (evita giros de volta inteira)
const norm = (d: number) => {
  let x = d % 360;
  if (x > 180) x -= 360;
  if (x < -180) x += 360;
  return x;
};

/* ---------------- colagem inicial (mantida) ---------------- */
interface Card {
  src: string;
  w: number;
  h: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  rot: number;
  enter: number;
  speed: number;
}
const CARDS: Card[] = [
  // topo (acima do headline)
  { src: "/combinacao/foto-5.jpg", w: 172, h: 126, left: 3, top: 8, dx: -160, dy: -130, rot: -2, enter: 210, speed: 0.3 },
  { src: "/combinacao/foto-6.jpg", w: 150, h: 208, left: 26, top: 3, dx: -110, dy: -140, rot: 1.5, enter: 90, speed: 0.24 },
  { src: "/combinacao/foto-7.jpg", w: 150, h: 110, left: 57, top: 6, dx: 120, dy: -140, rot: -1.5, enter: 150, speed: 0.34 },
  { src: "/combinacao/foto-3.jpg", w: 168, h: 130, left: 82, top: 11, dx: 175, dy: -120, rot: 1.5, enter: 120, speed: 0.26 },
  // base (abaixo do headline)
  { src: "/combinacao/foto-4.jpg", w: 128, h: 164, left: 4, top: 66, dx: -160, dy: 120, rot: 2, enter: 60, speed: 0.22 },
  { src: "/combinacao/foto-1.jpg", w: 192, h: 136, left: 39, top: 80, dx: 0, dy: 170, rot: -1.5, enter: 230, speed: 0.32 },
  { src: "/combinacao/foto-2.jpg", w: 156, h: 202, left: 80, top: 66, dx: 175, dy: 120, rot: -2, enter: 185, speed: 0.36 },
];

function CollageCard({
  card,
  progress,
  enter,
  f,
}: {
  card: Card;
  progress: MotionValue<number>;
  enter: MotionValue<number>;
  f: number;
}) {
  const enterY = useTransform(enter, (e) => (1 - clamp01(e)) * card.enter);
  const enterOpacity = useTransform(enter, (e) => seg(e, 0, 0.6, 0, 1));
  const x = useTransform(progress, (v) => seg(v, 0, card.speed, 0, card.dx));
  const y = useTransform(progress, (v) => seg(v, 0, card.speed, 0, card.dy));
  const rotate = useTransform(progress, (v) => seg(v, 0, card.speed, card.rot, card.rot * 4));
  const scale = useTransform([enter, progress] as MotionValue[], (vals) => {
    const [e, p] = vals as number[];
    return p <= 0.0001 ? seg(e, 0, 1, 0.86, 1) : seg(p, 0, card.speed, 1, 1.16);
  });
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${card.left}%`,
        top: `${card.top}%`,
        width: card.w * f,
        height: card.h * f,
        y: enterY,
        opacity: enterOpacity,
      }}
    >
      <motion.div style={{ x, y, rotate, scale }} className="overflow-hidden rounded-2xl">
        <div style={{ position: "relative", width: card.w * f, height: card.h * f }}>
          <Image src={card.src} alt="" aria-hidden fill sizes="(max-width: 768px) 40vw, 220px" className="object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- 24 cartas do círculo — POR ESTAÇÃO ----------------------- *
 * A pedido do cliente: em vez das 12 capas de subestação, o círculo é organizado
 * por ESTAÇÃO. Cada estação = 1 card com a LOGO/ícone da estação + as 5 cores
 * (swatches) da estação = 6 cards. 4 estações × 6 = 24, preenchendo o círculo.
 * O retrato central (a foto que cresce e depois DISSOLVE) ocupa um slot de COR
 * do Verão (lavanda, próximo ao tom médio da foto) — assim o mecanismo do scroll
 * é preservado e não sobra fotografia solta no círculo.
 * --------------------------------------------------------------------------- */
// fundo tom-sobre-tom (escuro) de cada estação para o card da LOGO — o ícone
// claro e o nome branco ficam por cima (mesma matiz da estação, escurecida).
const LOGO_BG: Record<string, string> = {
  primavera: "#c19a34",
  verao: "#32856c",
  outono: "#935a2e",
  inverno: "#327a90",
};
// nomes em inglês na logo — casa com o sistema das cartelas (Light Spring etc.)
const SEASON_EN: Record<string, string> = {
  primavera: "Spring",
  verao: "Summer",
  outono: "Autumn",
  inverno: "Winter",
};
const PORTRAIT_SEASON = "verao";
const PORTRAIT_SWATCH = 2; // Lavanda (#b0a6c9) — combina com o tom médio da foto
type CItem = {
  src?: string;
  icon?: string;
  color?: string;
  label: string;
  season?: string;
  kind: "logo" | "portrait" | "tone";
};
// o ícone do Verão (teal) se confunde com as cores da estação → renderiza branco
// (só aqui neste componente; o arquivo .svg segue o mesmo em outras seções).
const iconStyle = (season?: string) =>
  season === "verao" ? { filter: "brightness(0) invert(1)" as const } : undefined;
const CIRCLE: CItem[] = SEASONS.flatMap((season) => [
  {
    kind: "logo" as const,
    icon: season.icon,
    color: LOGO_BG[season.id],
    label: SEASON_EN[season.id],
    season: season.id,
  },
  ...season.swatches.map((sw, si) =>
    season.id === PORTRAIT_SEASON && si === PORTRAIT_SWATCH
      ? {
          kind: "portrait" as const,
          src: "/combinacao/principal.jpg",
          color: sw.hex,
          icon: season.icon,
          label: "You",
          season: season.id,
        }
      : {
          kind: "tone" as const,
          color: sw.hex,
          icon: season.icon,
          label: sw.name,
          season: season.id,
        }
  ),
]);
const N = CIRCLE.length; // 24 = 4 estações × (1 logo + 5 cores)
const PORTRAIT = CIRCLE.findIndex((c) => c.kind === "portrait");
const circDist = (i: number, j: number) => {
  const d = Math.abs(i - j);
  return Math.min(d, N - d);
};

// fases (um único progresso 0→1 governa tudo)
const PH = {
  phrase1Out: [0.02, 0.1] as [number, number],
  collageOut: [0.02, 0.12] as [number, number],
  cover: [0.36, 0.46] as [number, number],
  grow: [0.1, 0.24] as [number, number],
  scrimIn: [0.22, 0.28] as [number, number],
  scrimOut: [0.42, 0.5] as [number, number],
  phrase2In: [0.26, 0.32] as [number, number],
  phrase2Out: [0.42, 0.48] as [number, number],
  shrink: [0.44, 0.58] as [number, number],
  emergeBase: 0.52,
  emergeSpread: 0.12,
  emergeWin: 0.1, // círculo fechado ~0.74
  expand: [0.68, 0.75] as [number, number], // círculo cresce e abre o vão central
  phraseCircle: [0.74, 0.79, 0.83, 0.86] as [number, number, number, number],
  morph: [0.83, 0.9] as [number, number],
  phraseArc: [0.87, 0.91, 0.95, 0.99] as [number, number, number, number],
  descend: [0.91, 1.0] as [number, number], // cartelas descem e somem (handoff)
};
const EXPAND_AMT = 0.28; // quanto o raio do círculo cresce ao "abrir"
const CARD_GROW = 0.3; // os cards crescem junto quando o círculo expande

export default function CombinacaoSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phraseCircleRef = useRef<HTMLDivElement>(null);
  const phraseArcRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    const onMotion = () => setReduced(mq.matches);
    onResize();
    onMotion();
    window.addEventListener("resize", onResize);
    mq.addEventListener?.("change", onMotion);
    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", onMotion);
    };
  }, []);

  const f = Math.min(1, Math.max(0.52, vp.w / 1440));

  // useScroll só p/ a colagem (CollageCard); o resto roda por rAF
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const { scrollYProgress: enterProgress } = useScroll({ target: wrapRef, offset: ["start end", "start start"] });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const sec = wrapRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const range = rect.height - vh;
        const p = range > 0 ? clamp01(-rect.top / range) : 0;

        // ---- opacidades (imperativas, confiáveis) ----
        const set = (ref: React.RefObject<HTMLDivElement | null>, o: number, ty?: number) => {
          const el = ref.current;
          if (!el) return;
          el.style.opacity = String(o);
          if (ty !== undefined) el.style.transform = `translateY(${ty}px)`;
        };
        set(collageRef, seg(p, PH.collageOut[0], PH.collageOut[1], 1, 0));
        set(phrase1Ref, seg(p, PH.phrase1Out[0], PH.phrase1Out[1], 1, 0), seg(p, PH.phrase1Out[0], PH.phrase1Out[1], 0, -30));
        set(coverRef, seg(p, PH.cover[0], PH.cover[1], 0, 1));
        set(scrimRef, env(p, PH.scrimIn[0], PH.scrimIn[1], PH.scrimOut[0], PH.scrimOut[1]));
        set(phrase2Ref, env(p, PH.phrase2In[0], PH.phrase2In[1], PH.phrase2Out[0], PH.phrase2Out[1]), seg(p, PH.phrase2In[0], PH.phrase2In[1], 28, 0));
        set(phraseCircleRef, env(p, PH.phraseCircle[0], PH.phraseCircle[1], PH.phraseCircle[2], PH.phraseCircle[3]));
        set(phraseArcRef, env(p, PH.phraseArc[0], PH.phraseArc[1], PH.phraseArc[2], PH.phraseArc[3]));

        // ---- geometria ----
        const minDim = Math.min(vw, vh);
        const rBase = Math.min(minDim * 0.46, 470);
        const cardW = Math.min(Math.max(minDim * 0.1, 54), 104);
        const cardH = cardW * 1.5;
        const isMobile = vw < 768;
        const baseRadius = Math.min(vw, vh * 1.5);
        const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
        const arcCenterY = vh * (isMobile ? 0.45 : 0.4) + arcRadius;
        const spread = isMobile ? 100 : 130;
        const startAngle = -90 - spread / 2;
        const step = spread / (N - 1);
        const mp = clamp01((p - PH.morph[0]) / (PH.morph[1] - PH.morph[0]));
        // círculo FORMA menor (contido, sem tocar as bordas) e depois EXPANDE
        // até o tamanho maior (com a frase). Só a formação ficou menor.
        const expandT = seg(p, PH.expand[0], PH.expand[1], 0, 1);
        const radiusForm = Math.min(minDim * 0.36, 360);
        const radiusBig = rBase * (1 + EXPAND_AMT);
        const radiusEff = lerp(radiusForm, radiusBig, expandT);
        const circleScale = 1 + expandT * CARD_GROW; // cards crescem na expansão

        const pca = ((PORTRAIT / N) * 360 * Math.PI) / 180;
        const pcx = Math.cos(pca) * radiusEff;
        const pcy = Math.sin(pca) * radiusEff;

        for (let i = 0; i < N; i++) {
          const el = cardRefs.current[i];
          if (!el) continue;
          const ca = ((i / N) * 360 * Math.PI) / 180;
          const ccx = Math.cos(ca) * radiusEff;
          const ccy = Math.sin(ca) * radiusEff;
          const crotN = norm((i / N) * 360 + 90); // rotação do card no círculo (curta)
          const aa = startAngle + i * step;
          const arad = (aa * Math.PI) / 180;
          const acx = Math.cos(arad) * arcRadius;
          const acy = Math.sin(arad) * arcRadius + arcCenterY;
          const arotDelta = norm(aa + 90 - ((i / N) * 360 + 90)); // círculo→arco (curto)
          const ascale = isMobile ? 1.4 : 1.8;

          let w = cardW, h = cardH, x = ccx, y = ccy, rot = crotN, scale = 1, opacity = 1, radiusPx = 14;

          if (i === PORTRAIT) {
            if (p < PH.shrink[0]) {
              // começa como card pequeno (visível já na colagem, no topo-centro)
              // e cresce até tela cheia — SEM rotação
              const g = clamp01((p - PH.grow[0]) / (PH.grow[1] - PH.grow[0]));
              const startW = cardW * 1.9;
              const startH = startW * 0.6; // horizontal (landscape), menor
              const startY = -vh * 0.28; // mais alto, acima da frase
              w = lerp(startW, vw, g);
              h = lerp(startH, vh, g);
              x = 0;
              y = lerp(startY, 0, g);
              rot = 0;
              radiusPx = lerp(16, 0, g);
              opacity = 1;
            } else if (p < PH.morph[0]) {
              // encolhe até o slot do círculo e gira até a rotação do slot
              const s = clamp01((p - PH.shrink[0]) / (PH.shrink[1] - PH.shrink[0]));
              w = lerp(vw, cardW, s);
              h = lerp(vh, cardH, s);
              x = lerp(0, pcx, s);
              y = lerp(0, pcy, s);
              rot = crotN * s; // gira da foto (0°) até a rotação do slot no círculo
              scale = s >= 1 ? circleScale : 1; // cresce junto na expansão
              radiusPx = lerp(0, 14, s);
            } else {
              x = lerp(pcx, acx, mp);
              y = lerp(pcy, acy, mp);
              rot = crotN + arotDelta * mp; // círculo→arco a partir da rotação do slot
              scale = lerp(circleScale, ascale, mp);
            }
          } else if (p < PH.morph[0]) {
            // demais cartas: abrem a partir da posição do retrato
            const d = circDist(i, PORTRAIT);
            const es = PH.emergeBase + (d / 12) * PH.emergeSpread;
            const ep = clamp01((p - es) / PH.emergeWin);
            x = lerp(pcx, ccx, ep);
            y = lerp(pcy, ccy, ep);
            rot = crotN * ep;
            scale = lerp(0.3, circleScale, ep);
            opacity = ep;
          } else {
            x = lerp(ccx, acx, mp);
            y = lerp(ccy, acy, mp);
            rot = crotN + arotDelta * mp;
            scale = lerp(circleScale, ascale, mp);
          }

          // descida final — as cartelas descem de vez e somem (handoff p/ estações)
          const descend = seg(p, PH.descend[0], PH.descend[1], 0, 1);
          y += descend * vh * 0.9;
          opacity *= 1 - descend;

          el.style.width = `${w}px`;
          el.style.height = `${h}px`;
          el.style.opacity = String(opacity);
          el.style.borderRadius = `${radiusPx}px`;
          el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rot}deg) scale(${scale})`;

          // retrato central: a foto some (dissolve) durante o encolhimento,
          // deixando só a div com o tom semelhante à foto (PORTRAIT_TONE)
          if (i === PORTRAIT && portraitImgRef.current) {
            portraitImgRef.current.style.opacity = String(
              seg(p, PH.shrink[0], PH.shrink[1], 1, 0)
            );
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // ---------------------- reduced-motion fallback ----------------------
  if (reduced) {
    return (
      <section data-nav-dark className="bg-plum py-20 md:py-28">
        <div className="u-container">
          <h2 className="u-display mx-auto max-w-2xl text-center text-4xl text-paper md:text-6xl">
            Perfect{" "}
            <em className="font-light italic u-accent">combinations</em>,
            <br />
            from head to toe.
          </h2>
          <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {CIRCLE.map((c, i) => (
              <div
                key={i}
                className="relative flex aspect-[2/3] flex-col items-center justify-center overflow-hidden rounded-xl text-center"
                style={{ backgroundColor: c.color }}
              >
                {c.icon && c.kind !== "logo" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.icon} alt="" aria-hidden className="h-1/4 w-auto opacity-50" style={iconStyle(c.season)} />
                )}
                {c.kind === "portrait" && (
                  <Image src={c.src!} alt="" aria-hidden fill sizes="30vw" className="object-cover object-top" />
                )}
                {c.kind === "logo" && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.icon} alt="" aria-hidden className="h-10 w-auto" style={iconStyle(c.season)} />
                    <span className="u-display mt-1.5 text-sm text-white">{c.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <h2 className="u-display mx-auto mt-14 max-w-2xl text-center text-4xl text-paper md:text-6xl">
            Color theory, now{" "}
            <em className="font-light italic u-accent">practical, easy, and yours.</em>
          </h2>
        </div>
      </section>
    );
  }

  // ---------------------------- animated ----------------------------
  return (
    <section ref={wrapRef} data-nav-dark className="relative z-10" style={{ height: "640vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-plum">
        {/* colagem */}
        <div ref={collageRef} style={{ opacity: 1 }} className="absolute inset-0 z-10">
          {CARDS.map((card) => (
            <CollageCard key={card.src} card={card} progress={scrollYProgress} enter={enterProgress} f={f} />
          ))}
        </div>

        {/* frase 1 */}
        <div ref={phrase1Ref} style={{ opacity: 1 }} className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <h2 className="u-display text-center text-4xl text-paper sm:text-5xl md:text-[4rem]">
            Perfect{" "}
            <em className="font-light italic u-accent">combinations</em>,
            <br />
            from head to toe.
          </h2>
        </div>

        {/* cobertura plum — esconde restos das seções anteriores */}
        <div ref={coverRef} aria-hidden style={{ opacity: 0 }} className="absolute inset-0 z-[25] bg-plum" />

        {/* cartas do círculo — o retrato É o card do slot Deep Autumn */}
        <div className="absolute inset-0 z-30">
          {CIRCLE.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 overflow-hidden"
              style={{
                opacity: 0,
                willChange: "transform",
                backgroundColor: item.color,
              }}
            >
              {item.icon && item.kind !== "logo" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden
                    className="h-[26%] w-auto opacity-50"
                    style={iconStyle(item.season)}
                  />
                </div>
              )}
              {item.kind === "portrait" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  ref={portraitImgRef}
                  src={item.src}
                  alt=""
                  aria-hidden
                  className="relative z-10 h-full w-full object-cover object-top"
                />
              )}
              {item.kind === "logo" && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden
                    className="h-[34%] w-auto"
                    style={iconStyle(item.season)}
                  />
                  <span className="u-display text-[9px] leading-tight text-white sm:text-[11px]">
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* scrim de leitura */}
        <div
          ref={scrimRef}
          aria-hidden
          style={{
            opacity: 0,
            background: "rgba(0,0,0,0.42)",
          }}
          className="absolute inset-0 z-40"
        />

        {/* frase 2 */}
        <div ref={phrase2Ref} style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center text-paper">
          <h2 className="u-display text-4xl sm:text-5xl md:text-[3.6rem]">
            Show your personality
            <br />
            with the{" "}
            <em className="font-light italic u-accent">right colors for you.</em>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/90 sm:text-base">
            It&apos;s not magic, even though it seems so.
            <br className="hidden sm:block" /> It&apos;s technique, emotion, and
            empathy — through a guide made for you.
          </p>
        </div>

        {/* frase do círculo */}
        <div ref={phraseCircleRef} style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-6 text-center">
          <h2 className="u-display text-paper text-4xl sm:text-5xl md:text-[3.6rem]">
            Color theory, now
            <br />
            <em className="font-light italic u-accent">practical, easy, and yours.</em>
          </h2>
        </div>

        {/* frase do arco */}
        <div ref={phraseArcRef} style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-6 text-center">
          <h2 className="u-display text-paper text-4xl sm:text-5xl md:text-[3.6rem]">
            New ways
            <br />
            <em className="font-light italic u-accent">
              to experience color.
            </em>
          </h2>
        </div>
      </div>
    </section>
  );
}
