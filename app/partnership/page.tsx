import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Você sempre quis uma aliada nos negócios. A Niwa tem um portfólio completo para atender você e todas as suas clientes com excelência, personalização e cuidado.",
};

const VALOR = [
  "Ganhe mais tempo de produtividade",
  "Comunique ainda mais especialidade e profissionalismo",
  "Amplie seus valores de consultoria",
  "Garanta descontos exclusivos pra você e suas clientes",
];

// programa de parceria — desconto progressivo por volume (03 ofertas, doc EN)
const OFERTAS: {
  itens: string;
  desconto: string;
  retorno: string;
  destaque?: boolean;
}[] = [
  {
    itens: "30+",
    desconto: "10%",
    retorno: "Até US$ 150 a mais no seu bolso a cada pedido.",
  },
  {
    itens: "50+",
    desconto: "20%",
    retorno: "Até US$ 500 a mais no seu bolso a cada pedido.",
    destaque: true,
  },
  {
    itens: "100+",
    desconto: "30%",
    retorno: "Até US$ 1.500 a mais no seu bolso a cada pedido.",
  },
];

export default function PartnershipPage() {
  return (
    <div>
      {/* ============ GANCHO — full-bleed (mesmo visual da home) ========= */}
      <section
        data-nav-sky
        className="relative -mt-[62px] flex min-h-screen items-center justify-center overflow-hidden bg-plum px-6 pt-[62px] text-center text-paper"
      >
        <Image
          src="/consultoras/consultora.jpg"
          alt="Consultora com o leque de cores Niwa em um campo de hortênsias"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <Reveal className="relative max-w-2xl text-paper">
          <p className="u-eyebrow !text-paper/70">Partnership · Consultoras</p>
          <h1 className="u-display mt-5 text-5xl leading-[1.05] md:text-6xl">
            Você sempre quis uma{" "}
            <em className="font-light italic u-accent">aliada</em> nos negócios.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper/85">
            E nós chegamos pra você. A Niwa tem as melhores cartelas e dossiês do
            mercado para atender você e todas as suas clientes.
          </p>
          <a
            href="#oferta"
            className="mt-8 inline-block rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Ver o programa
          </a>
        </Reveal>
      </section>

      {/* ===================== PROPOSTA DE VALOR ====================== */}
      <section className="u-section bg-paper-deep">
        <div className="u-container">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow">Por que ser parceira</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Uma aliada em cada
              <br />
              <em className="font-light italic u-accent">estação do ano.</em>
            </h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {VALOR.map((v, i) => (
              <Reveal
                key={v}
                delay={(i % 2) * 90}
                className="flex gap-6 border-t border-line pt-6"
              >
                <span className="font-display text-2xl italic text-marsala">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-snug text-ink">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROGRAMA DE PARCERIA ==================== */}
      <section id="oferta" className="u-section scroll-mt-24 bg-plum text-paper">
        <div className="u-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="u-eyebrow !text-paper/55">Programa de parceria</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Quanto mais leva,
              <br />
              mais <em className="font-light italic u-accent">volta pra você.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/80">
              Cartelas e dossiês no atacado, com desconto progressivo por volume.
              Escolha o seu nível e fale com a gente para começar.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {OFERTAS.map((o, i) => (
              <Reveal key={o.itens} delay={(i % 3) * 90} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-lg border p-8 text-center transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1 hover:scale-[1.04] ${
                    o.destaque
                      ? "border-[#C295D9]/60 bg-paper/[0.06]"
                      : "border-paper/15"
                  }`}
                >
                  {o.destaque && (
                    <span className="mx-auto mb-4 rounded-full border border-[#C295D9]/60 px-3 py-1 text-[0.56rem] uppercase tracking-[0.22em] text-[#C295D9]">
                      Mais escolhido
                    </span>
                  )}
                  <p className="u-display text-2xl text-paper">{o.itens}</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.22em] text-paper/55">
                    itens por pedido
                  </p>
                  <p className="mt-6 font-display text-6xl text-[#C295D9]">
                    {o.desconto}
                  </p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-paper/55">
                    de desconto
                  </p>
                  <p className="mt-6 border-t border-paper/15 pt-6 text-sm leading-relaxed text-paper/80">
                    {o.retorno}
                  </p>
                  <Link
                    href="/atendimento/contato"
                    className={`mt-7 inline-block rounded-xs px-8 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors ${
                      o.destaque
                        ? "bg-paper text-marsala hover:bg-[#C295D9] hover:text-plum"
                        : "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-marsala"
                    }`}
                  >
                    Quero agora
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
