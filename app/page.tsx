import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SeasonPanels from "@/components/SeasonPanels";
import CombinacaoSequence from "@/components/CombinacaoSequence";
import TresPassos from "@/components/TresPassos";
import CuideSe from "@/components/CuideSe";
import HeroSeasonStage from "@/components/HeroSeasonStage";
import GuiaEstilo from "@/components/GuiaEstilo";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      {/* ======= HERO + GALERIA DE ESTAÇÕES (palco único, sem emenda) ==== */}
      <HeroSeasonStage />

      {/* ==================== COMBINAÇÃO → RITMO CERTO =================== */}
      <CombinacaoSequence />

      {/* ===== ESTAÇÕES · os cards (sobem sobrepondo a seção do círculo) ===== */}
      <section
        id="estacoes"
        aria-label="As quatro estações"
        className="relative z-20 -mt-[55vh] scroll-mt-24"
      >
        <SeasonPanels />
      </section>

      {/* ===== PRÁTICAS, FÁCEIS E SUA — foto full-bleed (leva pra Cartelas) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-center overflow-hidden bg-plum text-paper"
      >
        <Image
          src="/section/praticas.jpg"
          alt="Mãos com o leque de cores Niwa diante do closet"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10"
        />
        <div className="u-container relative">
          <Reveal className="max-w-2xl">
            <h2 className="u-display text-5xl leading-[1.03] md:text-7xl">
              Práticas, fáceis
              <br />e <em className="font-light italic u-accent">sua.</em>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/80">
              Compactas e resistentes, feitas pra viver com você — o poder de
              nunca mais duvidar de uma cor.
            </p>
            <Link
              href="/produto/cartela-sazonal-12-subtons"
              className="mt-9 inline-block rounded-xs bg-paper px-9 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
            >
              Conheça
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== GUIA DE ESTILO COMPLETO (ponto de virada — cross-sell) ===== */}
      <GuiaEstilo />

      {/* ==================== TRÊS PASSOS (scroll reveal) =============== */}
      <TresPassos />

      {/* ============= CONSULTORAS DE ESTILO E MODA (card) ============= */}
      <section
        id="metodo"
        data-nav-dark
        className="relative flex min-h-screen scroll-mt-24 items-center justify-center overflow-hidden bg-plum px-6"
      >
        <Image
          src="/consultoras/consultora.jpg"
          alt="Consultora com o leque de cores Niwa em um campo de hortênsias"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* scrim para legibilidade do texto centralizado */}
        <div aria-hidden className="absolute inset-0 bg-black/40" />

        <Reveal className="relative max-w-2xl text-center text-paper">
          <p className="u-eyebrow !text-paper/70">
            Consultoras de cor e estilo
          </p>
          <h2 className="u-display mt-5 text-5xl md:text-6xl">
            A oportunidade
            <br />
            definitiva{" "}
            <em className="font-light italic u-accent">chegou.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-sm leading-relaxed text-paper/85">
            Descubra como nossas cartelas e planos especiais podem ampliar seu
            faturamento.
          </p>
          <Link
            href="/partnership"
            className="mt-8 inline-block rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Saiba mais
          </Link>
        </Reveal>
      </section>

      {/* ========================= REVIEWS ============================= */}
      <Reviews />

      {/* ========================= CUIDE-SE (vídeo) ===================== */}
      <CuideSe />
    </>
  );
}
