import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

function Ic({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px] shrink-0"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const PILLS = [
  {
    label: "Maquiagem",
    icon: (
      <Ic>
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
      </Ic>
    ),
  },
  {
    label: "Cabelo",
    icon: (
      <Ic>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
      </Ic>
    ),
  },
  {
    label: "Estilo de vida",
    icon: (
      <Ic>
        <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2Z" />
      </Ic>
    ),
  },
];

/**
 * "Guia de estilo completo" — PONTO DE VIRADA da página.
 * A página inteira é sobre cor/paletas; aqui entra um produto diferente (o guia
 * de moda). Tratada como PAUSA no tema de cor: editorial escura, o dossiê FÍSICO
 * como imagem principal (nada de swatches/paleta). CTA único de cross-sell.
 */
export default function GuiaEstilo() {
  return (
    <section
      data-nav-sky
      aria-label="Guia de estilo completo"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#161d2b]"
    >
      {/* dossiês físicos — imagem principal, full-bleed */}
      <Image
        src="/guia/dossies.jpg"
        alt="Dossiês de moda Niwa Seasons — volumes físicos"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* scrim p/ leitura do texto à esquerda */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0f1420]/95 via-[#0f1420]/60 to-transparent md:via-[#0f1420]/40"
      />

      <div className="u-container relative">
        <Reveal className="max-w-xl text-paper">
          <h2 className="u-display text-5xl leading-[1.02] md:text-7xl">
            Muito além
            <br />
            <em className="font-light italic u-accent">dos looks.</em>
          </h2>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/80">
            Um guia completo de moda — maquiagem, cabelo e estilo de vida, feito
            pra combinar com a sua cartela.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {PILLS.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.06] px-4 py-2 text-paper/90 backdrop-blur-sm"
              >
                {p.icon}
                <span className="text-[0.72rem] font-medium tracking-[0.02em]">
                  {p.label}
                </span>
              </span>
            ))}
          </div>

          <Link
            href="/loja?c=guias"
            className="mt-11 inline-block rounded-xs bg-paper px-7 py-4 text-sm font-medium text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Conheça nossos combos: cartelas + dossiês de moda
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
