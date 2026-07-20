"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Hero da página Cartelas — leque animado das 12 cartelas.
 * Entrada: cards chegam RETOS e AGRUPADOS (empilhados) e então abrem no ARCO;
 * só depois o texto e os chips de descritor aparecem (sequência coreografada).
 * Animação por transição CSS (roda mesmo com rAF pausado).
 */

// ordem arco-íris (frio → quente), esquerda p/ direita
const CARDS = [
  "Deep_Winter",
  "Cool_Winter",
  "Cool_Summer",
  "Light_Summer",
  "Bright_Winter",
  "Soft_Summer",
  "Warm_Autumn",
  "Bright_Spring",
  "Light_Spring",
  "Deep_Autumn",
  "Soft_Autumn",
  "Warm_Spring",
];

const N = CARDS.length;
const A = 34; // deg — meia-abertura do arco (menor = mais suave/plano)
const R = 50; // vw — raio do arco (maior = arco mais aberto)

// chips de descritor (posições relativas à SEÇÃO). `below` = rabinho no topo.
const CHIPS = [
  { label: "suave", color: "#5f8fce", left: "28%", top: "53%", rot: -7, below: false },
  { label: "delicada", color: "#df5a5a", left: "71%", top: "51%", rot: 8, below: false },
  { label: "acolhedora", color: "#5f7a3c", left: "46%", top: "79%", rot: -3, below: true },
];

export default function CartelasFanHero() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // abre quando entra em vista (ou logo no mount, se já visível)
    const el = ref.current;
    if (!el) return;
    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      window.setTimeout(() => setOpen(true), 350);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && trigger()),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center overflow-hidden"
      style={{ "--cw": "clamp(62px, 7vw, 116px)" } as CSSProperties}
      aria-label="As cartelas Niwa"
    >
      {/* texto (aparece após o leque abrir) */}
      <div
        className="u-container absolute inset-x-0 top-[15%] z-40 text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(18px)",
          transitionDelay: open ? "1.05s" : "0s",
        }}
      >
        <p className="u-eyebrow">Cartelas Niwa</p>
        <h1 className="u-display mt-5 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
          As cores têm muito
          <br />a <em className="font-light italic u-accent">te contar.</em>
        </h1>
      </div>

      {/* leque */}
      <div className="absolute left-1/2 top-[60%] z-10">
        {CARDS.map((name, i) => {
          const t = (i - (N - 1) / 2) / ((N - 1) / 2); // -1..1
          const deg = t * A;
          const rad = (deg * Math.PI) / 180;
          const x = R * Math.sin(rad); // vw
          const y = R * (1 - Math.cos(rad)); // vw — queda circular
          const arc = `translate(-50%,-50%) translateX(${x}vw) translateY(${y}vw) rotate(${deg}deg)`;
          const stacked = `translate(-50%,-50%) translateX(${t * 4}px) rotate(0deg)`;
          return (
            // wrapper posiciona; imagem preenche
            <div
              key={name}
              className="absolute left-0 top-0 overflow-hidden rounded-2xl"
              style={{
                width: "var(--cw)",
                height: "calc(var(--cw) * 1.32)",
                zIndex: i,
                transform: open ? arc : stacked,
                transition: "transform 1.05s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${Math.abs(t) * 0.28}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/cartelas/${name}_1x1.png`}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* chips de descritor (relativos à seção; aparecem por último) */}
      {CHIPS.map((c, i) => (
          <div
            key={c.label}
            className="absolute z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              left: c.left,
              top: c.top,
              opacity: open ? 1 : 0,
              transform: `translate(-50%,-50%) scale(${open ? 1 : 0.6}) rotate(${c.rot}deg)`,
              transitionDelay: open ? `${1.35 + i * 0.12}s` : "0s",
            }}
          >
            <span
              className="relative block rounded-lg px-3 py-1 text-[0.72rem] font-medium italic text-white"
              style={{ backgroundColor: c.color }}
            >
              {c.label}
              <span
                aria-hidden
                className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 ${
                  c.below ? "-top-1" : "-bottom-1"
                }`}
                style={{ backgroundColor: c.color }}
              />
            </span>
          </div>
        ))}
    </section>
  );
}
