"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Seg = { text: string; em?: boolean };

/**
 * Revela um parágrafo PALAVRA A PALAVRA (sobe + fade, escalonado) quando entra
 * em vista. Segmentos com `em` recebem ênfase (itálico/peso). Sem sombras.
 */
export default function WordsReveal({
  segments,
  className = "",
  stepMs = 24,
  as: Tag = "p",
}: {
  segments: Seg[];
  className?: string;
  stepMs?: number;
  as?: "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wi = 0;
  const out: ReactNode[] = [];
  segments.forEach((seg, si) => {
    seg.text.split(/(\s+)/).forEach((tok, k) => {
      if (tok === "") return;
      if (/^\s+$/.test(tok)) {
        out.push(<span key={`s-${si}-${k}`}> </span>);
        return;
      }
      const delay = wi * stepMs;
      wi += 1;
      out.push(
        <span
          key={`w-${si}-${k}`}
          className="inline-block"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(0.45em)",
            transition:
              "opacity 0.5s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${delay}ms`,
          }}
        >
          {seg.em ? <em className="italic">{tok}</em> : tok}
        </span>
      );
    });
  });

  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement>} className={className}>
      {out}
    </Tag>
  );
}
