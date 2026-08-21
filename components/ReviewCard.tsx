"use client";

import Image from "next/image";
import { useState } from "react";
import type { Review } from "@/lib/reviews";

function Stars({
  rating,
  className = "text-marsala",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${rating} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden
        >
          <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3Z" />
        </svg>
      ))}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const imgs = review.images?.length
    ? review.images
    : review.image
      ? [review.image]
      : [];
  const [idx, setIdx] = useState(0);
  const hasGallery = imgs.length > 1;
  const go = (d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length);

  // Padrão 1 — com foto: estrelas + frase SOBRE a imagem (scrim roxo);
  // box branco embaixo só com nome · cartela · cidade
  if (imgs.length > 0) {
    return (
      <figure className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-paper">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            key={imgs[idx]}
            src={imgs[idx]}
            alt={`Client ${review.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center"
          />
          {/* scrim roxo — mais baixo, só firma o texto sem cobrir tanto a foto */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-plum via-plum/60 to-transparent"
          />

          {/* galeria — setas + indicador */}
          {hasGallery && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute left-3 top-[42%] grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-plum transition-colors hover:bg-paper"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute right-3 top-[42%] grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-plum transition-colors hover:bg-paper"
              >
                <Chevron dir="right" />
              </button>
              <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
                {imgs.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? "w-4 bg-paper" : "w-1.5 bg-paper/55"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* estrelas + frase sobrepostas no rodapé da imagem */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <Stars rating={review.rating} className="text-[#C295D9]" />
            <p className="mt-3 font-display text-base italic leading-snug text-paper">
              “{review.quote}”
            </p>
          </div>
        </div>

        {/* box branco — identificação */}
        <figcaption className="p-5">
          <p className="text-sm font-medium text-ink">{review.name}</p>
          <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute">
            {review.meta}
          </p>
        </figcaption>
      </figure>
    );
  }

  // Padrão 2 — só texto
  return (
    <figure className="flex h-full flex-col rounded-sm border border-line bg-paper p-8">
      <Stars rating={review.rating} />
      <p className="mt-5 font-display text-xl italic leading-snug text-ink">
        “{review.quote}”
      </p>
      <div className="mt-auto pt-5">
        <p className="text-sm font-medium text-ink">{review.name}</p>
        <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute">
          {review.meta}
        </p>
      </div>
    </figure>
  );
}
