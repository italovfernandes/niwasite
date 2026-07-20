"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * "Da cabeça aos pés" — mesmo formato dos 4 pilares: texto em cima + faixa
 * horizontal de cartões (landscape) que desliza para o lado conforme se rola.
 * Desktop: sticky + translateX imperativo (rAF + getBoundingClientRect — o
 * padrão confiável nesta stack). Mobile: carrossel de swipe nativo.
 */
const TOPICOS = [
  {
    name: "Cores & estampas",
    desc: "Aprenda a usar cores e estampas a seu favor.",
    img: "/guia/l-cores.jpg",
  },
  {
    name: "Acessórios",
    desc: "Desbrave o mundo dos acessórios.",
    img: "/guia/l-acessorios.jpg",
  },
  {
    name: "Maquiagem",
    desc: "Evolua suas capacidades de maquiagem.",
    img: "/guia/l-maquiagem.jpg",
  },
  {
    name: "Cabelo",
    desc: "Aprenda técnicas sobre estilo de cabelos.",
    img: "/guia/l-cabelo.jpg",
  },
];

function Card({ t, i }: { t: (typeof TOPICOS)[number]; i: number }) {
  return (
    <article className="relative h-full w-full overflow-hidden">
      <Image
        src={t.img}
        alt={t.name}
        fill
        sizes="(max-width: 768px) 86vw, 62vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
        <span className="font-display text-sm italic text-paper/70">
          {String(i + 1).padStart(2, "0")} /{" "}
          {String(TOPICOS.length).padStart(2, "0")}
        </span>
        <h3 className="u-display mt-1.5 text-3xl text-paper md:text-4xl">
          {t.name}
        </h3>
        <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-paper/80">
          {t.desc}
        </p>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <>
      <p className="u-eyebrow !text-[#C295D9]/70">O guia de estilo</p>
      <h2 className="u-display mt-4 text-5xl leading-[1.05] md:text-6xl">
        Da cabeça <em className="font-light italic u-accent">aos pés.</em>
      </h2>
    </>
  );
}

export default function GuiasSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  // detecta viewport (evita scroll-jack no touch — ver CLAUDE.md §7)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // scroll vertical → translateX da fita (só no desktop)
  useEffect(() => {
    if (!desktop) return;
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
      row.style.transform = `translate3d(${-(p * Math.max(0, maxX)).toFixed(
        2
      )}px,0,0)`;
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
  }, [desktop]);

  // ===== DESKTOP — texto em cima, fita horizontal embaixo (sticky) =====
  if (desktop) {
    return (
      <section
        ref={sectionRef}
        data-nav-dark
        className="relative bg-plum text-paper"
        style={{ height: `${100 + TOPICOS.length * 58}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-t border-paper/15">
          {/* TEXTO — em cima */}
          <div className="u-container shrink-0 pb-8 pt-14 md:pt-16">
            <div className="max-w-4xl">
              <Intro />
            </div>
          </div>

          {/* FITA — landscape, desliza no scroll */}
          <div ref={trackRef} className="min-h-0 flex-1 overflow-hidden pb-10">
            <div
              ref={rowRef}
              className="flex h-full gap-4 pl-6 pr-6 will-change-transform md:pl-10"
            >
              {TOPICOS.map((t, i) => (
                <div key={t.name} className="aspect-[3/2] h-full shrink-0">
                  <Card t={t} i={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===== MOBILE / baseline — texto + carrossel de swipe nativo =====
  return (
    <section data-nav-dark className="border-t border-paper/15 bg-plum text-paper">
      <div className="u-container py-16">
        <Reveal className="max-w-md">
          <Intro />
        </Reveal>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TOPICOS.map((t, i) => (
          <div
            key={t.name}
            className="aspect-[3/2] w-[86vw] shrink-0 snap-center overflow-hidden"
          >
            <Card t={t} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
