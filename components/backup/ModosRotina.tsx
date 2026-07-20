"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * "Os 4 pilares da rotina" — texto em cima + faixa horizontal de cartões
 * (landscape) que desliza para o lado conforme se rola verticalmente.
 * Desktop: seção sticky + translateX imperativo (rAF + getBoundingClientRect —
 * o padrão confiável nesta stack). Mobile: carrossel de swipe nativo.
 */
const MODOS = [
  { name: "Day Out", img: "/modos/day-out.jpg" },
  { name: "Work Mode", img: "/modos/work-mode.jpg" },
  { name: "Romantic Touch", img: "/modos/romantic-touch.jpg" },
  { name: "Evening Elegance", img: "/modos/evening-elegance.jpg" },
];

function Card({ m, i }: { m: (typeof MODOS)[number]; i: number }) {
  return (
    <article className="relative h-full w-full overflow-hidden">
      <Image
        src={m.img}
        alt={m.name}
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
          {String(i + 1).padStart(2, "0")} / {String(MODOS.length).padStart(2, "0")}
        </span>
        <h3 className="u-display mt-1.5 text-3xl text-paper md:text-4xl">
          {m.name}
        </h3>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <>
      <p className="u-eyebrow !text-[#C295D9]/70">Os 4 pilares da rotina</p>
      <h2 className="u-display mt-4 text-5xl leading-[1.05] md:text-6xl">
        Não existem mais desculpas,
        <br />
        apenas <em className="font-light italic u-accent">possibilidades.</em>
      </h2>
    </>
  );
}

export default function ModosRotina() {
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
  }, [desktop]);

  // ===== DESKTOP — texto em cima, fita horizontal embaixo (sticky) =====
  if (desktop) {
    return (
      <section
        ref={sectionRef}
        data-nav-dark
        className="relative bg-plum text-paper"
        style={{ height: `${100 + MODOS.length * 58}vh` }}
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
              {MODOS.map((m, i) => (
                <div key={m.name} className="aspect-[3/2] h-full shrink-0">
                  <Card m={m} i={i} />
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
        {MODOS.map((m, i) => (
          <div
            key={m.name}
            className="aspect-[3/2] w-[86vw] shrink-0 snap-center overflow-hidden"
          >
            <Card m={m} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
