"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CuideSe() {
  const [useVideo, setUseVideo] = useState(true);

  // reduced motion / data saver → static poster
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (reduce || conn?.saveData) setUseVideo(false);
  }, []);

  return (
    <section
      data-nav-dark
      className="relative h-screen min-h-[560px] overflow-hidden bg-espresso"
    >
      {useVideo ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src="/cuide-se/cuide-2.mp4"
          poster="/cuide-se/cuide-2.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src="/cuide-se/cuide-2.jpg"
          alt="Mulher em um campo florido diante de um espelho"
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* scrim preto uniforme — contraste do texto (sem sombras) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <p className="u-eyebrow !text-white/75">Cuide-se</p>
        <h2 className="u-display mt-4 text-[2.6rem] leading-[1.04] sm:text-6xl md:text-[4rem]">
          Todo mundo merece uma pausa,
          <br />
          <em className="font-light italic u-accent">principalmente</em> você.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
          Nossos guias e cartelas são também um convite para você descansar e se
          autoconhecer.
        </p>
        <Link
          href="/loja?c=guias"
          className="mt-7 inline-block rounded-xs bg-paper px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-white"
        >
          Saiba mais
        </Link>
      </div>
    </section>
  );
}
