"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Hero da página Cartelas — céu + leque das 12 cartelas emergindo das nuvens.
 * Entrada: cards chegam empilhados e abrem no arco; headline aparece depois.
 * (mesma técnica do leque da home, agora sobre o céu com as nuvens à frente.)
 */

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
const A = 33; // deg — meia-abertura (menor = cards mais próximos)
const R = 40; // vw — raio

export default function CartelasSkyHero() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      window.setTimeout(() => setOpen(true), 400);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && trigger()),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-nav-sky
      className="relative z-10 -mt-[62px] min-h-screen overflow-hidden bg-[#3f8fd4]"
      style={{ "--cw": "clamp(66px, 7.6vw, 118px)" } as CSSProperties}
      aria-label="As cartelas Niwa"
    >
      {/* céu */}
      <Image
        src="/cartelas-hero/sky.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* headline */}
      <div
        className="absolute inset-x-0 top-[20%] z-30 px-6 text-center text-white"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: open ? "0.9s" : "0s",
        }}
      >
        <h1
          className="u-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
          style={{ textShadow: "0 2px 30px rgba(20,60,110,0.35)" }}
        >
          As cores têm muito
          <br />a te contar.
        </h1>
      </div>

      {/* leque */}
      <div className="absolute left-1/2 top-[70%] z-10">
        {CARDS.map((name, i) => {
          const t = (i - (N - 1) / 2) / ((N - 1) / 2);
          const deg = t * A;
          const rad = (deg * Math.PI) / 180;
          const x = R * Math.sin(rad);
          const y = R * (1 - Math.cos(rad));
          const arc = `translate(-50%,-50%) translateX(${x}vw) translateY(${y}vw) rotate(${deg}deg)`;
          const stacked = `translate(-50%,-50%) translateX(${t * 3}px) rotate(0deg)`;
          return (
            <div
              key={name}
              className="absolute left-0 top-0 overflow-hidden rounded-2xl"
              style={{
                width: "var(--cw)",
                height: "calc(var(--cw) * 2.45)",
                zIndex: i,
                transform: open ? arc : stacked,
                transition: "transform 1.05s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${Math.abs(t) * 0.28}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/cartelas-hero/cards/${name}.png`}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>

    </section>
  );
}
