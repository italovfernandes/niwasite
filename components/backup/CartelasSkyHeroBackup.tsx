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

export default function CartelasSkyHeroBackup() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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

  // geometria do leque — no mobile: cards maiores, arco mais aberto e baixo
  // (encostam nas bordas e mergulham nas nuvens); no desktop: como antes.
  const A = isMobile ? 39 : 33; // deg — meia-abertura
  const R = isMobile ? 62 : 40; // vw — raio
  const CW = isMobile ? "clamp(98px, 27vw, 140px)" : "clamp(66px, 7.6vw, 118px)";
  const fanTop = isMobile ? "81%" : "70%";

  return (
    <section
      ref={ref}
      data-nav-sky
      className="relative z-10 -mt-[62px] min-h-screen overflow-hidden bg-[#3f8fd4]"
      style={{ "--cw": CW } as CSSProperties}
      aria-label="The Niwa color fans"
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

      {/* headline — centralizado verticalmente no mobile, mais alto no desktop */}
      <div className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center text-white md:top-[20%] md:translate-y-0">
        <div
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: open ? "0.9s" : "0s",
          }}
        >
          <h1
            className="u-display text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.08]"
            style={{ textShadow: "0 2px 30px rgba(20,60,110,0.35)" }}
          >
            Colors have so much
            <br />to tell you.
          </h1>
        </div>
      </div>

      {/* leque */}
      <div className="absolute left-1/2 z-10" style={{ top: fanTop }}>
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
