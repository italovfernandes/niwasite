"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Depoimentos em vídeo — card retrato com foto da cliente como pôster + botão
 * de play; ao clicar, toca o vídeo inline (com controles). Assets de vídeo são
 * placeholders do acervo enquanto os depoimentos reais não entram.
 */
const VIDEOS = [
  {
    name: "Marina R.",
    meta: "Light Summer · São Paulo",
    poster: "/reviews/marina.jpg",
    src: "/estacoes/verao.mp4",
  },
  {
    name: "Carla M.",
    meta: "Warm Autumn · Belo Horizonte",
    poster: "/reviews/carla.jpg",
    src: "/estacoes/outono.mp4",
  },
  {
    name: "Juliana P.",
    meta: "Deep Winter · Curitiba",
    poster: "/reviews/juliana.jpg",
    src: "/estacoes/inverno.mp4",
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function VideoCard({ v }: { v: (typeof VIDEOS)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-paper">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
        {playing ? (
          <video
            src={v.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Assistir ao depoimento de ${v.name}`}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={v.poster}
              alt={`Cliente ${v.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"
            />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-marsala transition-transform duration-300 group-hover:scale-110">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="text-sm font-medium text-ink">{v.name}</p>
        <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute">
          {v.meta}
        </p>
      </figcaption>
    </figure>
  );
}

export default function ReviewVideos() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {VIDEOS.map((v) => (
        <VideoCard key={v.name} v={v} />
      ))}
    </div>
  );
}
