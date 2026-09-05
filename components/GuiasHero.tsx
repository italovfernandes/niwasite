"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Hero da página de Dossiês — vídeo do livro controlado por SCROLL.
 *
 * Estado inicial: vídeo pausado no 1º frame + informações + scrim (contraste).
 * Ao rolar: o vídeo "reproduz" (scrub do currentTime linkado ao scroll) e, ao
 * mesmo tempo, o texto e o scrim suavizam e somem — deixando o vídeo limpo no fim.
 *
 * Scroll-linked via rAF + getBoundingClientRect + estilo imperativo (Motion não
 * é confiável neste stack Next 16 / React 19). Fallback estático para
 * prefers-reduced-motion e para erro de carregamento do vídeo.
 */

const SCROLL_VH = 2.2; // viewports de rolagem além do palco sticky

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

function HeroContent({
  textRef,
}: {
  textRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute inset-0 z-20 flex items-end md:items-center">
      <div
        ref={textRef}
        className="u-container w-full pb-28 will-change-[opacity,transform] md:pb-0"
      >
        <div className="max-w-xl">
          <p className="u-eyebrow !text-[#C295D9]/85">Niwa Dossiers</p>
          <h1 className="u-display mt-6 text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.02] text-paper ">
            Your freedom
            <br />
            for <em className="font-light italic u-accent">$119.</em>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/85">
            A complete dossier — colors, makeup, hair, and lifestyle — made to
            live alongside your color fan.
          </p>
          <Link
            href="/loja?c=guias"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-[#C295D9] hover:text-plum"
          >
            I want my dossier
            <span aria-hidden className="u-arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GuiasHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [reduce, setReduce] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setDecided(true);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // vídeo vertical no mobile, horizontal no desktop
  const videoSrc = isMobile
    ? "/guia/book-scrub-mobile.mp4"
    : "/guia/book-scrub.mp4";
  const posterSrc = isMobile
    ? "/guia/book-scrub-mobile.jpg"
    : "/guia/book-scrub.jpg";

  // scrub do vídeo + fade do texto/scrim conforme o scroll
  useEffect(() => {
    if (reduce || failed) return;
    const sec = sectionRef.current;
    if (!sec) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? clamp(-rect.top / range) : 0;

      // vídeo: scrub até o fim em p≈0.85 (depois segura o último frame)
      const v = videoRef.current;
      if (v && v.duration) {
        const t = clamp(p / 0.85) * (v.duration - 0.05);
        const d = t - v.currentTime;
        if (Math.abs(d) > 0.033) v.currentTime += d * 0.25; // lerp — scrub suave
      }

      // texto: some cedo (até p≈0.4), com leve deriva pra cima
      if (textRef.current) {
        const o = clamp(1 - p / 0.4);
        textRef.current.style.opacity = String(o);
        textRef.current.style.transform = `translate3d(0,${(1 - o) * -26}px,0)`;
      }
      // scrim: suaviza um pouco depois (até p≈0.62)
      if (scrimRef.current) scrimRef.current.style.opacity = String(clamp(1 - p / 0.62));
      // dica de scroll: some quase imediatamente
      if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - p / 0.1));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, failed, isMobile, decided]);

  // ---------- fallback estático (reduced-motion ou erro no vídeo) ----------
  if (reduce || failed) {
    return (
      <section
        data-nav-sky
        className="relative -mt-[62px] flex min-h-screen items-end overflow-hidden bg-espresso pt-[62px] text-paper md:items-center"
      >
        <Image
          src={posterSrc}
          alt="Niwa Seasons dossier on the table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent md:bg-gradient-to-r"
        />
        <HeroContent />
      </section>
    );
  }

  // ---------------------- palco de vídeo scrubado ----------------------
  return (
    <section
      ref={sectionRef}
      data-nav-sky
      className="relative -mt-[62px] bg-espresso"
      style={{ height: `${(SCROLL_VH + 1) * 100}vh` }}
      aria-label="Niwa Dossiers — your freedom for $119"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[62px]">
        {/* vídeo do livro — pausado no 1º frame, scrubado no scroll */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          key={isMobile ? "m" : "d"}
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload={decided ? "auto" : "none"}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          onLoadedData={() => {
            if (videoRef.current) videoRef.current.currentTime = 0.001;
          }}
          onError={() => setFailed(true)}
        />

        {/* scrim — contraste inicial, suaviza e some no scroll */}
        <div
          ref={scrimRef}
          aria-hidden
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent will-change-[opacity] md:bg-gradient-to-r"
        />

        {/* informações — somem cedo */}
        <HeroContent textRef={textRef} />

        {/* dica de rolagem */}
        <div
          ref={hintRef}
          className="absolute inset-x-0 bottom-7 z-20 hidden text-paper/80 will-change-[opacity] md:block"
        >
          <div className="u-container flex items-center gap-3">
            <span className="block h-9 w-px overflow-hidden bg-paper/30">
              <span className="anim-scroll-line block h-full w-full bg-paper" />
            </span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em]">
              Scroll to play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
