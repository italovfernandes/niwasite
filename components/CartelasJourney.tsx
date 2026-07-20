"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Jornada da página Cartelas — vídeo (céu → campo de flores → campo dourado)
 * controlado pelo scroll. Fase 1: a filosofia sobre o céu. Fase 2: "Dê adeus"
 * sobre o campo. rAF + getBoundingClientRect (Motion não é confiável aqui).
 */
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const seg = (v: number, i0: number, i1: number, o0: number, o1: number) =>
  o0 + (o1 - o0) * clamp((v - i0) / (i1 - i0));

export default function CartelasJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (reduce || conn?.saveData) setUseVideo(false);
  }, []);

  useEffect(() => {
    if (!useVideo) return;
    let raf = 0;
    const tick = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const p = range > 0 ? clamp(-rect.top / range) : 0;

        const v = videoRef.current;
        if (v && v.duration) {
          const target = p * (v.duration - 0.05);
          const d = target - v.currentTime;
          if (Math.abs(d) > 0.033) v.currentTime += d * 0.24;
        }
        // filosofia SOBE com o scroll (não pina); some pela borda de cima
        if (text1Ref.current) {
          const up = clamp(p / 0.18) * 78; // vh
          text1Ref.current.style.transform = `translateY(calc(-50% - ${up}vh))`;
        }
        // azul dissolve a partir de quando o texto encosta no topo (ainda com céu)
        if (blueRef.current)
          blueRef.current.style.opacity = String(clamp(seg(p, 0.09, 0.22, 1, 0)));
        // fase 2 — "Dê adeus" sobre o campo (vídeo centralizado)
        const phase2 = clamp(seg(p, 0.56, 0.68, 0, 1));
        if (text2Ref.current) text2Ref.current.style.opacity = String(phase2);
        // scrim preto 25% quando o vídeo está centralizado (fase 2)
        if (scrimRef.current)
          scrimRef.current.style.opacity = String(phase2 * 0.25);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [useVideo]);

  // ---- fallback estático ----
  if (!useVideo) {
    return (
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        <Image
          src="/cartelas-hero/journey-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-24 px-6 text-center text-white">
          <Filosofia />
          <DeAdeus />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} data-nav-sky className="relative z-20" style={{ height: "440vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src="/cartelas-hero/journey.mp4"
          poster="/cartelas-hero/journey-poster.jpg"
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          onLoadedData={() => {
            if (videoRef.current) videoRef.current.currentTime = 0.001;
          }}
          onError={() => setUseVideo(false)}
        />

        {/* painel branco — fundo do texto; dissolve revelando o vídeo */}
        <div
          ref={blueRef}
          aria-hidden
          style={{ opacity: 1 }}
          className="absolute inset-0 z-10 bg-paper"
        />

        {/* scrim preto 25% — surge quando o vídeo está centralizado (fase 2) */}
        <div
          ref={scrimRef}
          aria-hidden
          style={{ opacity: 0 }}
          className="absolute inset-0 z-[15] bg-black"
        />

        {/* fase 1 — filosofia: sobe com o scroll até encostar no topo */}
        <div
          ref={text1Ref}
          style={{ transform: "translateY(-50%)" }}
          className="absolute inset-x-0 top-1/2 z-20 px-6 text-center text-ink"
        >
          <Filosofia />
        </div>

        {/* fase 2 — dê adeus (centralizado na tela) */}
        <div
          ref={text2Ref}
          style={{ opacity: 0 }}
          className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6 text-center text-white"
        >
          <DeAdeus />
        </div>
      </div>
    </section>
  );
}

function Filosofia() {
  return (
    <div className="mx-auto max-w-2xl font-display text-2xl font-light leading-[1.4] sm:text-3xl md:text-[2.4rem] md:leading-[1.35]">
      <p>
        Você não se veste melhor{" "}
        <em className="italic">pela quantidade de roupas que tem,</em> mas pela
        quantidade de <em className="italic">conhecimento que tem sobre si</em>{" "}
        mesma e sobre as suas cores.
      </p>
      <p className="mt-6">
        As cartelas Niwa são a síntese de anos de experiência humana e técnica,
        para <em className="italic">te fazer sentir-se bem consigo mesma.</em>
      </p>
    </div>
  );
}

function DeAdeus() {
  return (
    <h2 className="u-display text-5xl md:text-6xl">
      Dê adeus ao estresse
      <br />
      de <em className="font-light italic u-accent">se vestir.</em>
    </h2>
  );
}
