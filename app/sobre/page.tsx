import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Niwa",
  description:
    "Woman, we listened to your heart. Niwa is a movement of women who find, in their colors, the path to building their own inner garden.",
};

const CAMINHO = [
  { verbo: "Sow", texto: "You sow self-knowledge." },
  { verbo: "Grow", texto: "You grow into your own colors." },
  { verbo: "Bloom", texto: "You bloom into who you already are." },
  { verbo: "Inspire", texto: "And then, you inspire everyone around you." },
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
          alt="Woman in a flowering field under golden light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <Reveal className="relative max-w-3xl">
          <p className="u-eyebrow !text-[#C295D9]/80">About Niwa</p>
          <h1 className="u-display mt-6 text-5xl leading-[1.03] sm:text-6xl md:text-7xl">
            Woman.
            <br />
            We listened to{" "}
            <em className="font-light italic u-accent">your heart.</em>
          </h1>
        </Reveal>
      </section>

      {/* ===== ORIGEM — split (texto + peônias) ===== */}
      <section className="grid md:min-h-[86vh] md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-paper px-6 py-20 md:order-1 md:px-14 md:py-0 lg:px-20">
          <Reveal className="max-w-md">
            <p className="u-eyebrow">Our origin</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              Born from a
              <br />
              <em className="font-light italic u-accent">rupture.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Yes, we were born from pain — and we're not afraid to say it. In
              nature, the greatest transformations are born from ruptures. Still
              in its cocoon, a butterfly receives the unique colors that will
              color its wings, through a natural prism of light. That is what our
              dossier wishes to be for you.
            </p>
          </Reveal>
        </div>
        <div className="relative order-1 min-h-[62vh] overflow-hidden bg-espresso md:order-2 md:min-h-0">
          <Image
            src="/sobre/flores.jpg"
            alt="Bouquet of peonies and flowers"
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
            A place where colors reign
          </p>
          <p className="u-display mt-8 text-3xl leading-[1.18] sm:text-4xl md:text-[2.9rem]">
            Just as flowers exhale, inspire, and transform, Niwa is born of that
            same force — we are a movement of women who find, in their colors, the
            path to building their own{" "}
            <em className="font-light italic u-accent">inner garden.</em>
          </p>
          <p className="mx-auto mt-8 max-w-lg leading-relaxed text-paper/65">
            A space to know yourself and tell the world who you are.
          </p>
        </Reveal>
      </section>

      {/* ===== O CAMINHO — numerado ===== */}
      <section className="u-section bg-paper-deep">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow">The path</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Sow, grow,
              <br />
              bloom,{" "}
              <em className="font-light italic u-accent">inspire.</em>
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

      {/* ===== A ESPECIALISTA — Karol (retrato + declaração em 1ª pessoa) ===== */}
      <section className="grid md:min-h-[92vh] md:grid-cols-2">
        {/* retrato — sangra a coluna */}
        <div className="relative order-1 min-h-[72vh] overflow-hidden bg-paper-deep md:min-h-0">
          <Image
            src="/sobre/karol.jpg"
            alt="Karol, Niwa's personal color specialist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* declaração */}
        <div className="order-2 flex flex-col justify-center bg-paper px-6 py-20 md:px-14 md:py-0 lg:px-20">
          <Reveal className="max-w-md">
            <p className="u-eyebrow">The specialist</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              In love
              <br />
              with <em className="font-light italic u-accent">color.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              I decided to help people see more of themselves. Colors exist,
              they're right there, yet so often it's as if no one noticed them in
              all their potential.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              I'm a mother, a wife, an entrepreneur, and I've lived through many
              seasons of a woman's life. Now, I pour all of my knowledge —
              practical, theoretical, and above all, what comes from the heart —
              into the color fans and dossiers that reach you.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              So that you don't just see the colors, but discover what they can
              awaken in you.
            </p>
            <p className="mt-8 font-display text-2xl italic leading-snug u-accent">
              Awaken your inner garden. 🌷
            </p>
            <p className="mt-6 border-t border-line pt-5 text-[0.66rem] uppercase tracking-[0.26em] text-ink-mute">
              Karol · Personal color specialist
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FECHAMENTO — full-bleed + scrim (sem sombras) ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-plum px-6 text-center text-paper"
      >
        <Image
          src="/consultoras/campo.jpg"
          alt="Contemplative woman in a field of hydrangeas at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-black/50" />
        <Reveal className="relative max-w-3xl">
          <p className="u-display text-3xl leading-[1.15] sm:text-4xl md:text-5xl">
            A light that will find who you already are, and so{" "}
            <em className="font-light italic u-accent">color your wings.</em>
          </p>
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-paper/75">
            Unique, real, irreplaceable
          </p>
        </Reveal>
      </section>
    </div>
  );
}
