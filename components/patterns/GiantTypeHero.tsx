import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ArcMotif from "./ArcMotif";

/**
 * Hero cujo movimento é a TIPOGRAFIA GIGANTE (CLAUDE.md §4/§5). Foto sangra
 * pela borda direita; assinatura de arco. NÃO centraliza texto empilhado.
 * Mobile: tipo primeiro, foto como banda full-bleed abaixo (composição própria).
 */
export default function GiantTypeHero({
  eyebrow,
  title,
  lead,
  ctaLabel,
  ctaHref,
  image,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative grid gap-10 md:min-h-[90vh] md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-0">
      {/* conteúdo */}
      <div className="px-6 pt-8 md:py-24 md:pl-12 md:pr-10 lg:pl-24">
        {eyebrow && <p className="u-eyebrow">{eyebrow}</p>}
        <h1 className="u-display mt-6 text-[3.2rem] leading-[0.96] sm:text-6xl md:text-[5rem] lg:text-[5.8rem]">
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            {lead}
          </p>
        )}
        <div className="mt-9 flex items-center gap-6">
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="inline-block rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-marsala-deep"
            >
              {ctaLabel}
            </Link>
          )}
          <ArcMotif className="h-9 w-[4.5rem] text-marsala/40" />
        </div>
      </div>

      {/* foto sangrando pela borda */}
      <div className="relative h-[56vh] w-full md:h-full md:min-h-[90vh]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 46vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
