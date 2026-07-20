import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre a Niwa",
  description:
    "Mulher, nós ouvimos seu coração. A Niwa é um movimento de mulheres que encontram, nas suas cores, o caminho para construir o próprio jardim interior.",
};

const CAMINHO = [
  { verbo: "Semear", texto: "Você semeia o autoconhecimento." },
  { verbo: "Crescer", texto: "Cresce nas suas próprias cores." },
  { verbo: "Florescer", texto: "Floresce em quem você já é." },
  { verbo: "Inspirar", texto: "E então, inspira todos ao seu redor." },
];

export default function SobrePage() {
  return (
    <div>
      {/* ===== HERO — full-bleed + nav transparente ===== */}
      <section
        data-nav-sky
        className="relative -mt-[62px] flex min-h-screen items-center justify-center overflow-hidden bg-plum px-6 pt-[62px] text-center text-paper"
      >
        <Image
          src="/sobre/asas.jpg"
          alt="Mulher em um campo florido sob luz dourada"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <Reveal className="relative max-w-3xl">
          <p className="u-eyebrow !text-[#C295D9]/80">Sobre a Niwa</p>
          <h1 className="u-display mt-6 text-5xl leading-[1.03] sm:text-6xl md:text-7xl">
            Mulher.
            <br />
            Nós ouvimos{" "}
            <em className="font-light italic u-accent">seu coração.</em>
          </h1>
        </Reveal>
      </section>

      {/* ===== ORIGEM — split (texto + peônias) ===== */}
      <section className="grid md:min-h-[86vh] md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-paper px-6 py-20 md:order-1 md:px-14 md:py-0 lg:px-20">
          <Reveal className="max-w-md">
            <p className="u-eyebrow">Nossa origem</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              Nascemos de uma
              <br />
              <em className="font-light italic u-accent">ruptura.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Sim, nós nascemos de uma dor — e não temos receio em dizer isso. Na
              natureza, as maiores transformações nascem de rupturas. Uma
              borboleta recebe, ainda no casulo, as cores únicas que vão colorir
              suas asas, através de um prisma natural de luz. É isso que o nosso
              guia deseja ser para você.
            </p>
          </Reveal>
        </div>
        <div className="relative order-1 min-h-[62vh] overflow-hidden bg-espresso md:order-2 md:min-h-0">
          <Image
            src="/sobre/flores.jpg"
            alt="Buquê de peônias e flores"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ===== MANIFESTO — declaração de marca (plum) ===== */}
      <section data-nav-dark className="u-section bg-plum text-paper">
        <Reveal className="u-container mx-auto max-w-4xl text-center">
          <p className="u-eyebrow !text-[#C295D9]/70">
            Um lugar onde as cores reinam
          </p>
          <p className="u-display mt-8 text-3xl leading-[1.18] sm:text-4xl md:text-[2.9rem]">
            Assim como as flores exalam, inspiram e transformam, a Niwa nasce
            dessa mesma força — somos um movimento de mulheres que encontram, nas
            suas cores, o caminho para construir o próprio{" "}
            <em className="font-light italic u-accent">jardim interior.</em>
          </p>
          <p className="mx-auto mt-8 max-w-lg leading-relaxed text-paper/65">
            Um espaço para se autoconhecer e dizer ao mundo quem você é.
          </p>
        </Reveal>
      </section>

      {/* ===== O CAMINHO — numerado ===== */}
      <section className="u-section bg-paper-deep">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow">O caminho</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Semear, crescer,
              <br />
              florescer,{" "}
              <em className="font-light italic u-accent">inspirar.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-4">
            {CAMINHO.map((c, i) => (
              <Reveal
                key={c.verbo}
                delay={i * 90}
                className="border-t border-line pt-6"
              >
                <span className="font-display text-lg italic text-marsala">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="u-display mt-4 text-4xl text-ink">{c.verbo}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{c.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FECHAMENTO — full-bleed + scrim (sem sombras) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-plum px-6 text-center text-paper"
      >
        <Image
          src="/consultoras/campo.jpg"
          alt="Mulher contemplativa em um campo de hortênsias ao entardecer"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/50" />
        <Reveal className="relative max-w-3xl">
          <p className="u-display text-3xl leading-[1.15] sm:text-4xl md:text-5xl">
            Uma luz que vai encontrar quem você já é, e assim{" "}
            <em className="font-light italic u-accent">colorir suas asas.</em>
          </p>
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-paper/75">
            Únicas, reais e irrepetíveis
          </p>
        </Reveal>
      </section>
    </div>
  );
}
