"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * "Uma imersão completa" — texto em cima + faixa horizontal com as CAPAS dos
 * dossiês que desliza para o lado conforme se rola verticalmente (scroll-linked,
 * em TODOS os tamanhos). Sticky + translateX imperativo (rAF).
 */
const DOSSIES = [
  { name: "Verão", img: "/dossies/verao.jpg" },
  { name: "Outono", img: "/dossies/outono.jpg" },
  { name: "Inverno", img: "/dossies/inverno.jpg" },
  { name: "Primavera", img: "/dossies/primavera.jpg" },
];

function Card({ d, i }: { d: (typeof DOSSIES)[number]; i: number }) {
  return (
    <article className="relative h-full w-full overflow-hidden">
      <Image
        src={d.img}
        alt={`Dossiê ${d.name}`}
        fill
        sizes="(max-width: 768px) 80vw, 52vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <span className="font-display text-sm italic text-paper/70">
          {String(i + 1).padStart(2, "0")} / {String(DOSSIES.length).padStart(2, "0")}
        </span>
        <h3 className="u-display mt-1.5 text-3xl text-paper md:text-4xl">
          Dossiê {d.name}
        </h3>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <>
      <p className="u-eyebrow !text-[#C295D9]/70">Os dossiês</p>
      <h2 className="u-display mt-4 text-5xl leading-[1.05] md:text-6xl">
        Uma imersão completa,
        <br />
        <em className="font-light italic u-accent">estação por estação.</em>
      </h2>
    </>
  );
}

export default function GuiasImersao() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // scroll vertical → translateX da fita (rAF + getBoundingClientRect)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const row = rowRef.current;
    if (!section || !track || !row) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      const p = dist > 0 ? Math.min(1, Math.max(0, -rect.top / dist)) : 0;
      const maxX = row.scrollWidth - track.clientWidth;
      row.style.transform = `translate3d(${-(p * Math.max(0, maxX)).toFixed(2)}px,0,0)`;
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
    <section
      ref={sectionRef}
      data-nav-dark
      className="relative bg-plum text-paper"
      style={{ height: `${100 + DOSSIES.length * 58}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-t border-paper/15">
        {/* TEXTO — em cima */}
        <div className="u-container shrink-0 pb-8 pt-14 md:pt-16">
          <div className="max-w-4xl">
            <Intro />
          </div>
        </div>

        {/* FITA — capas, desliza no scroll */}
        <div ref={trackRef} className="min-h-0 flex-1 overflow-hidden pb-10">
          <div
            ref={rowRef}
            className="flex h-full gap-4 pl-6 pr-6 will-change-transform md:pl-10"
          >
            {DOSSIES.map((d, i) => (
              <div key={d.name} className="aspect-[6/5] h-full shrink-0">
                <Card d={d} i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
