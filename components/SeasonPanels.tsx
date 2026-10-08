"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SEASONS } from "@/lib/catalog";

/**
 * Full-bleed expanding panels — one per season, foto da estação como fundo.
 * Hover to open on desktop (pure CSS flex transition); stacked on mobile.
 * Entrada: cada coluna sobe + aparece em sequência (stagger) ao entrar em cena.
 */
const STAGGER_MS = 220; // atraso entre cada card

// mesma sequência dos vídeos do hero: Verão → Outono → Inverno → Primavera
const ORDERED_SEASONS = ["verao", "outono", "inverno", "primavera"].map(
  (id) => SEASONS.find((s) => s.id === id)!
);

// BG dos cards = tom mais escuro da cor do ícone de cada estação
// (mesma matiz do ícone, escurecida — o ícone claro fica por cima)
const SEASON_BG: Record<string, string> = {
  primavera: "#c19a34", // ícone #F9DFAF — dourado claro de primavera (antes #937025, puxava p/ outono)
  verao: "#32856c", // ícone #6DC6AB
  outono: "#935a2e", // ícone #EAB48F
  inverno: "#327a90", // ícone #A9DCEA
};

export default function SeasonPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // revela cada card em tempos diferentes (stagger de verdade)
            ORDERED_SEASONS.forEach((_, i) => {
              timers.push(
                window.setTimeout(
                  () => setShownCount((c) => Math.max(c, i + 1)),
                  i * STAGGER_MS
                )
              );
            });
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col md:h-[90vh] md:min-h-[620px] md:flex-row">
      {ORDERED_SEASONS.map((season, i) => {
        const shown = i < shownCount;
        return (
          <article
            key={season.id}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(72px)",
              backgroundColor: SEASON_BG[season.id],
              transition:
                "flex-grow 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
            className="group relative min-h-[75vh] flex-1 overflow-hidden text-paper md:min-h-0 md:min-w-[74px] md:flex-[1] md:hover:flex-[2.5]"
          >
            {/* ícone gigante tom-sobre-tom sangrando pela esquerda (só ~50% visível) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={season.icon}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-[70%] w-auto -translate-x-1/2 -translate-y-[20%] opacity-[0.14]"
            />

            {/* scrim sutil embaixo — só p/ firmar o texto sobre a cor */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/45 via-black/10 to-transparent"
            />

            {/* top meta: icon (cor default) + temperature */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={season.icon}
                alt=""
                aria-hidden
                width={34}
                height={34}
                className="h-8 w-8"
              />
              <span className="rounded-full border border-white/55 px-3 py-1 text-[0.56rem] uppercase tracking-[0.22em] text-white/90">
                {season.temp}
              </span>
            </div>

            {/* bottom content — botões sempre no rodapé, resto expande acima */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 md:p-7">
              <h3 className="u-display text-4xl text-white md:text-5xl">
                {season.name}
              </h3>

              <div className="grid transition-all duration-700 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100">
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
                    {season.description}
                  </p>

                  {/* cartelas (1:1) */}
                  <div className="mt-5">
                    <p className="text-[0.56rem] uppercase tracking-[0.24em] text-white/60">
                      Season color fans
                    </p>
                    <div className="mt-2.5 flex gap-2.5">
                      {season.cartelas.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/product/${c.slug}`}
                          title={c.name}
                          className="relative aspect-square w-20 overflow-hidden rounded-md ring-1 ring-white/25 transition-transform hover:-translate-y-0.5 hover:ring-white/70 sm:w-24"
                        >
                          <Image
                            src={c.src}
                            alt={c.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ação — botão primário, permanece no rodapé mesmo com o hover expandido */}
              <div className="mt-6">
                <Link
                  href="/shop?c=ferramentas"
                  className="inline-block rounded-xs bg-paper px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
                >
                  View the fans
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
