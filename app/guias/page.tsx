import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import GuiasConvite from "@/components/GuiasConvite";
import GuiasSequence from "@/components/GuiasSequence";
import GuiasImersao from "@/components/GuiasImersao";
import GuiasFeatures from "@/components/GuiasFeatures";

export const metadata: Metadata = {
  title: "Guias de Estilo — Niwa",
  description:
    "Uma experiência que une imersão, sensações e autoconhecimento — aprenda a usar as suas cores da cabeça aos pés.",
};

export default function GuiasPage() {
  return (
    <div>
      {/* ===== HERO — vídeo escuro + nav transparente (branco) ===== */}
      <section
        data-nav-sky
        className="relative -mt-[62px] flex min-h-screen items-center overflow-hidden bg-plum pt-[62px] text-paper"
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/guia/se-aprofunde-3.mp4"
          poster="/guia/se-aprofunde-3.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* scrim contínuo — preto uniforme sobre todo o vídeo */}
        <div aria-hidden className="absolute inset-0 bg-black/50" />
        <div className="u-container relative py-24 md:py-0">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow !text-[#C295D9]/80">Guias de estilo</p>
            <h1 className="u-display mt-6 text-4xl leading-[1.06] md:text-6xl">
              A melhor coisa que
              <br />
              você já viu pode ser a
              <br />
              sua <em className="font-light italic u-accent">nova versão.</em>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-paper/80">
              Uma experiência que une imersão, sensações e autoconhecimento.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== MANIFESTO — o convite (revelado frase a frase, sem imagem) ===== */}
      <GuiasConvite />

      {/* ===== IMERSÃO — capas dos dossiês em fita horizontal ===== */}
      <GuiasImersao />

      {/* ===== AUGE — sequência scrollytelling "da cabeça aos pés" ===== */}
      <GuiasSequence />

      {/* ===== FEATURES — o que você recebe (seção clara de respiro) ===== */}
      <GuiasFeatures />

      {/* ===== FECHO — escute as cores (imagem do guia no BG) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-plum text-center text-paper"
      >
        <Image
          src="/guia/dossies.jpg"
          alt="Dossiês físicos Niwa Seasons"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/40"
        />
        <div className="u-container relative">
          <Reveal className="mx-auto max-w-2xl">
            <p className="u-eyebrow !text-[#C295D9]/70">Comece agora</p>
            <h2 className="u-display mt-5 text-4xl leading-[1.04] md:text-6xl">
              Escute as cores
              <br />
              <em className="font-light italic u-accent">
                e seu coração.
              </em>
            </h2>
            <Link
              href="/produto/guia-metodo-4-estacoes"
              className="mt-10 inline-block rounded-xs bg-paper px-10 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-[#C295D9] hover:text-plum"
            >
              Comprar meu guia
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
