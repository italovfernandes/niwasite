import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "You've always wanted a true business ally. Niwa has a complete portfolio to serve you and all of your clients with excellence, personalization, and care.",
};

const VALOR = [
  "Gain more productive time.",
  "Communicate even greater expertise and professionalism.",
  "Increase the value of your consulting services.",
  "Enjoy exclusive discounts for you and your clients.",
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
    retorno: "Up to $150 back in your pocket on every order.",
  },
  {
    itens: "50+",
    desconto: "20%",
    retorno: "Up to $500 back in your pocket on every order.",
    destaque: true,
  },
  {
    itens: "100+",
    desconto: "30%",
    retorno: "Up to $1,500 back in your pocket on every order.",
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
          alt="Consultant with the Niwa color fan in a field of hydrangeas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <Reveal className="relative max-w-2xl text-paper">
          <p className="u-eyebrow !text-paper/70">Partnership · Consultants</p>
          <h1 className="u-display mt-5 text-5xl leading-[1.05] md:text-6xl">
            You've always wanted a true{" "}
            <em className="font-light italic u-accent">ally</em> in business.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper/85">
            And we're here for you. Niwa has the finest color fans and dossiers on
            the market to serve you and all of your clients.
          </p>
          <a
            href="#oferta"
            className="mt-8 inline-block rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            See the program
          </a>
        </Reveal>
      </section>

      {/* ===================== PROPOSTA DE VALOR ====================== */}
      <section className="u-section bg-paper-deep">
        <div className="u-container">
          <Reveal className="mb-12 max-w-2xl">
            <p className="u-eyebrow">Why become a partner</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              An ally in every
              <br />
              <em className="font-light italic u-accent">season of the year.</em>
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
            <p className="u-eyebrow !text-paper/55">Partnership program</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              The more you take,
              <br />
              the more <em className="font-light italic u-accent">comes back to you.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/80">
              Color fans and dossiers at wholesale, with a progressive volume
              discount. Choose your tier and talk to us to get started.
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
                      Most chosen
                    </span>
                  )}
                  <p className="u-display text-2xl text-paper">{o.itens}</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.22em] text-paper/55">
                    items per order
                  </p>
                  <p className="mt-6 font-display text-6xl text-[#C295D9]">
                    {o.desconto}
                  </p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-paper/55">
                    discount
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
                    I want it now
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
