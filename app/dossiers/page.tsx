import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import GuiasHero from "@/components/GuiasHero";
import ResponsiveBgVideo from "@/components/ResponsiveBgVideo";
import GuiasSequence from "@/components/GuiasSequence";
import GuiasImersao from "@/components/GuiasImersao";
import GuiasFeatures from "@/components/GuiasFeatures";

export const metadata: Metadata = {
  title: "Style Dossiers — Niwa",
  description:
    "Four dossiers to bring out the best of your beauty — colors, makeup, hair, prints, accessories, and SmartTravel, from head to toe.",
};

// pequenos ícones para os cards do SmartTravel
function TravelIcon({ name }: { name: "check" | "bag" | "looks" }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = {
    check: (
      <>
        <path d="M4 6h9M4 12h9M4 18h6" {...p} />
        <path d="M16.5 6.5 18 8l2.5-2.5" {...p} />
      </>
    ),
    bag: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="2" {...p} />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11v5M15 11v5" {...p} />
      </>
    ),
    looks: (
      <>
        <path d="M12 3 4 7.5V12c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7.5L12 3Z" {...p} />
        <path d="M9 12l2 2 4-4" {...p} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 text-[#C295D9] md:h-9 md:w-9" aria-hidden>
      {paths[name]}
    </svg>
  );
}

const SMART = [
  {
    label: "Checklists",
    desc: "Ready-made lists so you forget nothing — and travel with ease.",
    icon: "check" as const,
  },
  {
    label: "How to pack",
    desc: "Tips for packing light, with only what suits you.",
    icon: "bag" as const,
  },
  {
    label: "Outfit combinations",
    desc: "Pieces that talk to each other — more looks with fewer clothes.",
    icon: "looks" as const,
  },
];

export default function GuiasPage() {
  return (
    <div>
      {/* ===== HERO — vídeo do livro scrubado por scroll ===== */}
      <GuiasHero />

      {/* ===== FLORESÇA — banda de vídeo (o vídeo que estava na entrada) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-center overflow-hidden bg-plum text-paper"
      >
        <ResponsiveBgVideo
          desktop="/guia/se-aprofunde-3.mp4"
          mobile="/guia/se-aprofunde-mobile.mp4"
          poster="/guia/se-aprofunde-3.jpg"
          posterMobile="/guia/se-aprofunde-mobile.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/50" />
        <div className="u-container relative py-24 text-center md:py-0">
          <Reveal className="mx-auto max-w-3xl">
            <p className="u-eyebrow !text-[#C295D9]/80">Four dossiers</p>
            <h2 className="u-display mt-6 text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.03] ">
              Bloom in
              <br />
              <em className="font-light italic u-accent">every season.</em>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-paper/85">
              To bring out the best of your beauty — no matter your subtone.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.66rem] uppercase tracking-[0.24em] text-paper/70">
              <span>Spring</span>
              <span aria-hidden className="text-[#C295D9]">·</span>
              <span>Summer</span>
              <span aria-hidden className="text-[#C295D9]">·</span>
              <span>Autumn</span>
              <span aria-hidden className="text-[#C295D9]">·</span>
              <span>Winter</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== OS QUATRO DOSSIÊS — fita horizontal com as capas ===== */}
      <GuiasImersao />

      {/* ===== APRENDA A CONFIAR — bento de features ===== */}
      <GuiasFeatures />

      {/* ===== DIFERENCIAIS — unidos vocês serão incríveis (foto de fundo) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-end overflow-hidden border-t border-paper/15 bg-espresso text-paper md:items-center"
      >
        <Image
          src="/guia/diferenciais.jpg"
          alt="Confident, radiant woman in vibrant, colorful looks"
          fill
          sizes="100vw"
          className="object-cover object-[35%_center] md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 md:bg-gradient-to-l md:from-black/85 md:via-black/45 md:to-transparent"
        />
        <div className="u-container relative pb-24 md:pb-0">
          <Reveal className="max-w-xl text-center md:ml-auto md:text-right">
            <p className="u-eyebrow !text-[#C295D9]/80">What sets us apart</p>
            <h2 className="u-display mt-5 text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.04] ">
              Together, you'll
              <br />
              be <em className="font-light italic u-accent">unstoppable.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-paper/85 md:ml-auto md:mr-0">
              A dossier that lives alongside you — from self-discovery to everyday
              life, following each new version of you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== SMARTTRAVEL — as cores viajam junto com você ===== */}
      <section className="u-section bg-paper-deep">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow">SmartTravel</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              The colors travel
              <br />
              <em className="font-light italic u-accent">with you.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {SMART.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) * 90} className="h-full">
                <div className="flex h-full flex-col rounded-sm border border-line bg-paper p-8">
                  <TravelIcon name={s.icon} />
                  <h3 className="u-display mt-6 text-2xl text-ink">{s.label}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DA CABEÇA AOS PÉS — empilhamento (cabelos, estampas, maquiagem, acessórios) ===== */}
      <GuiasSequence />

      {/* ===== FECHO — comece agora ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-plum text-center text-paper"
      >
        <Image
          src="/guia/dossies.jpg"
          alt="Physical Niwa Seasons dossiers"
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
            <p className="u-eyebrow !text-[#C295D9]/70">Start now</p>
            <h2 className="u-display mt-5 text-4xl leading-[1.04] md:text-6xl">
              Listen to the colors,
              <br />
              <em className="font-light italic u-accent">listen to your heart.</em>
            </h2>
            <Link
              href="/shop?c=guias"
              className="mt-10 inline-block rounded-xs bg-paper px-10 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-[#C295D9] hover:text-plum"
            >
              Buy my dossier
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
