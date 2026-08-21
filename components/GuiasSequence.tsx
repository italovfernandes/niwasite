import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * "Da cabeça aos pés" — intro em plum (texto à esquerda, centralizado na vertical)
 * seguida dos cards FULL-SCREEN que se EMPILHAM no scroll vertical: cada card é
 * `sticky top-0 h-screen`, então o primeiro fixa no topo e o próximo sobe e o
 * sobrepõe, e assim por diante. Puro CSS sticky (sem rAF/scroll-jack).
 */
const TOPICOS = [
  {
    name: "Colors & prints",
    desc: "Learn to use colors and prints to your advantage.",
    img: "/guia/l-cores.jpg",
    pos: "object-top",
  },
  {
    name: "Accessories",
    desc: "Explore the world of accessories.",
    img: "/guia/l-acessorios.jpg",
    pos: "object-center",
  },
  {
    name: "Makeup",
    desc: "Level up your makeup skills.",
    img: "/guia/l-maquiagem-2.jpg",
    pos: "object-center",
  },
  {
    name: "Hair",
    desc: "Learn techniques for hair styling.",
    img: "/guia/l-cabelo-2.jpg",
    pos: "object-center",
  },
];

export default function GuiasSequence() {
  return (
    <section data-nav-dark className="bg-plum text-paper">
      {/* intro — plum, texto à esquerda; também fixa no topo (é o "card 0") */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-paper/15">
        <div className="u-container">
          <Reveal className="max-w-3xl">
            <p className="u-eyebrow !text-[#C295D9]/70">The style dossier</p>
            <h2 className="u-display mt-5 text-6xl leading-[1.02] md:text-8xl">
              From head <em className="font-light italic u-accent">to toe.</em>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
              A dossier that teaches you to wear your colors in every detail — scroll
              to discover each layer.
            </p>
          </Reveal>
        </div>
      </div>

      {/* cards full-screen que se empilham (sticky stack) */}
      {TOPICOS.map((t, i) => (
        <div
          key={t.name}
          className="sticky top-0 h-screen overflow-hidden border-t border-paper/10"
        >
          <Image
            src={t.img}
            alt={t.name}
            fill
            sizes="100vw"
            className={`object-cover ${t.pos}`}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15"
          />
          <div className="u-container absolute inset-x-0 bottom-0 pb-16 md:pb-24">
            <span className="font-display text-base italic text-paper/70">
              {String(i + 1).padStart(2, "0")} / {String(TOPICOS.length).padStart(2, "0")}
            </span>
            <h3 className="u-display mt-2 text-5xl leading-[1.02] md:text-7xl">
              {t.name}
            </h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/85">
              {t.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
