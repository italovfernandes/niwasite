import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Seção densa: foto SANGRA por uma borda + chips SOBREPÕEM a foto em ângulo
 * (CLAUDE.md §4). Usar com moderação (§5 — alternar com respiro).
 * Mobile: foto full-bleed no topo, conteúdo abaixo, chips em linha (não sobrepõe).
 */
export default function BleedPhotoChips({
  image,
  imageAlt = "",
  eyebrow,
  title,
  lead,
  chips = [],
  side = "left",
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  chips?: string[];
  side?: "left" | "right";
}) {
  const photoOrder = side === "left" ? "md:order-1" : "md:order-2";
  const contentOrder = side === "left" ? "md:order-2" : "md:order-1";
  const chipEdge = side === "left" ? "md:-right-6" : "md:-left-6";

  return (
    <section className="relative grid gap-8 md:grid-cols-2 md:items-stretch md:gap-0">
      {/* foto */}
      <div className={`relative h-[58vh] w-full md:h-auto md:min-h-[82vh] ${photoOrder}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* chips sobrepostos em ângulo — só desktop */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {chips.map((c, i) => (
            <span
              key={c}
              className={`absolute ${chipEdge} rounded-full border border-white/40 bg-black/30 px-4 py-2 text-[0.72rem] font-medium text-white backdrop-blur-sm`}
              style={{
                top: `${20 + i * 20}%`,
                transform: `rotate(${(i % 2 ? 1 : -1) * (2 + i)}deg)`,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* conteúdo */}
      <div
        className={`px-6 pb-14 md:flex md:flex-col md:justify-center md:px-14 md:py-20 ${contentOrder}`}
      >
        {eyebrow && <p className="u-eyebrow">{eyebrow}</p>}
        <h2 className="u-display mt-4 text-4xl leading-[1.02] md:text-6xl">
          {title}
        </h2>
        {lead && (
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            {lead}
          </p>
        )}
        {/* chips em linha no mobile */}
        {chips.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2.5 md:hidden">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-paper px-4 py-2 text-[0.72rem] font-medium text-ink"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
