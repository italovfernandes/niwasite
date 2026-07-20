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
            E nós chegamos pra você. A Niwa tem um portfólio completo para
            atender você e todas as suas clientes com excelência, personalização
            e cuidado.
          </p>
          <a
            href="#oferta"
            className="mt-8 inline-block rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Ver a oferta
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

      {/* ============================ OFERTA ========================== */}
      <section id="oferta" className="u-section scroll-mt-24 bg-plum text-paper">
        <div className="u-container">
          <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-paper/15">
            <div
              aria-hidden
              className="h-2 w-full"
              style={{
                background:
                  "linear-gradient(90deg, #f5d9a0, #6ec6ac, #e3a882, #a9dcea)",
              }}
            />
            <div className="p-8 text-center md:p-14">
              <p className="u-eyebrow !text-paper/55">A oferta</p>
              <h2 className="u-display mt-4 text-5xl md:text-6xl">
                Combo de Janeiro
                <br />a <em className="font-light italic u-accent">Janeiro.</em>
              </h2>
              <p className="mt-5 text-lg text-paper/80">
                Esteja com elas em todas as estações.
              </p>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-paper/60">
                04 Dossiês + 12 Cartelas
              </p>

              <div className="mt-9 flex items-end justify-center gap-4">
                <span className="text-lg text-paper/50 line-through">
                  R$ 100,00
                </span>
                <span className="font-display text-5xl md:text-6xl">R$ 80,00</span>
              </div>
              <p className="mt-2 text-sm text-paper/60">
                Preço consultora · parcele em até 12x
              </p>

              <Link
                href="/loja?c=ferramentas"
                className="mt-9 inline-block rounded-xs bg-paper px-10 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
              >
                Quero agora
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
