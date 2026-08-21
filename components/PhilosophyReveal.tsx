"use client";

import { useEffect, useRef } from "react";

/**
 * Filosofia Niwa — o texto vai acendendo linha por linha conforme o scroll.
 * Centralizado. Seção alta com miolo sticky; cada linha interpola de
 * esmaecida → cheia. rAF + getBoundingClientRect (Motion não é confiável).
 */
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

const LINES: { t: string; em?: boolean; mt?: boolean }[] = [
  { t: "You don't dress better" },
  { t: "by the amount of clothes you own,", em: true },
  { t: "but by the amount of knowledge" },
  { t: "you have about yourself", em: true },
  { t: "and about your colors." },
  { t: "The Niwa color fans are the synthesis of years", mt: true },
  { t: "of human and technical experience," },
  { t: "to make you feel good about yourself.", em: true },
];

export default function PhilosophyReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      lineRefs.current.forEach((el) => el && (el.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const n = LINES.length;
    const tick = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        const p = range > 0 ? clamp(-rect.top / range) : 0;
        const span = 0.84; // respiro no início/fim
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = 0.08 + (i / n) * span;
          const end = start + span / n + 0.06;
          const o = 0.12 + 0.88 * clamp((p - start) / (end - start));
          el.style.opacity = String(o);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <p className="u-display mx-auto max-w-3xl text-center text-2xl leading-[1.4] text-ink md:text-[2.4rem] md:leading-[1.35]">
          {LINES.map((line, i) => (
            <span
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              style={{ opacity: 0.12 }}
              className={`block font-light ${line.em ? "italic" : ""} ${
                line.mt ? "mt-[1.1em]" : ""
              }`}
            >
              {line.t}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
