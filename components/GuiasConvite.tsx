"use client";

import { useEffect, useRef } from "react";

/**
 * "O convite" — manifesto sem imagem, revelado frase a frase conforme o scroll
 * (mesmo padrão da filosofia na página de cartelas). Opacidade por frase via
 * rAF + getBoundingClientRect imperativo. No preview pane o rAF fica pausado —
 * as frases só aparecem no browser real.
 */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) =>
  b <= a ? 0 : clamp((p - a) / (b - a));

const PHRASES = [
  <>Nosso guia de estilo, para cada estação,</>,
  (
    <>
      é ao mesmo tempo um{" "}
      <em className="font-light italic u-accent">
        convite para uma viagem interior
      </em>
    </>
  ),
  <>e um bilhete para a jornada que vai te ensinar</>,
  (
    <>
      a usar as cores{" "}
      <em className="font-light italic u-accent">da cabeça aos pés.</em>
    </>
  ),
];

export default function GuiasConvite() {
  const sectionRef = useRef<HTMLElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? clamp(-rect.top / range) : 0;
      phraseRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.08 + i * 0.14;
        el.style.opacity = seg(p, start, start + 0.11).toFixed(3);
      });
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
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-paper" style={{ height: "210vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="u-container text-center">
          <p className="u-eyebrow">O convite</p>
          <div className="mx-auto mt-8 max-w-3xl font-display text-2xl font-light leading-[1.4] text-ink sm:text-3xl md:text-[2.5rem] md:leading-[1.32]">
            {PHRASES.map((ph, i) => (
              <span
                key={i}
                ref={(el) => {
                  phraseRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
                className="block"
              >
                {ph}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
