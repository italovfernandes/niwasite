import Link from "next/link";
import Reveal from "@/components/Reveal";
import PingPongVideo from "@/components/PingPongVideo";

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
    label: "Cores",
    icon: (
      <Ic>
        <path d="M12 3s6 5.5 6 10a6 6 0 0 1-12 0c0-4.5 6-10 6-10Z" />
      </Ic>
    ),
  },
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
      {/* vídeo full-bleed em loop ping-pong (vai e volta) */}
      <PingPongVideo
        src="/guia/se-aprofunde-3.mp4"
        poster="/guia/se-aprofunde-3.jpg"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* scrim uniforme — preto suave sobre todo o vídeo (contraste do texto) */}
      <div aria-hidden className="absolute inset-0 bg-black/45" />

      <div className="u-container relative">
        <Reveal className="max-w-xl text-paper">
          <h2 className="u-display text-5xl leading-[1.02] md:text-7xl">
            Se aprofunde na
            <br />
            <em className="font-light italic u-accent">sua estação.</em>
          </h2>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/80">
            Um dossiê completo — cores, maquiagem e estilo de vida, feito pra
            combinar com a sua cartela.
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
            href="/guias"
            className="group mt-11 inline-flex items-center gap-2.5 rounded-xs bg-paper px-7 py-4 text-sm font-medium text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Conheça nossos dossiês
            <span aria-hidden className="u-arrow">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
