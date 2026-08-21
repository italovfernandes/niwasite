"use client";

import { useEffect, useState } from "react";

/**
 * Vídeo de fundo (autoplay/loop) que troca a fonte por viewport — vertical no
 * mobile, horizontal no desktop. Carrega só o vídeo do viewport atual: a `src`
 * só é definida depois de decidir (o poster segura o quadro até lá).
 */
export default function ResponsiveBgVideo({
  desktop,
  mobile,
  poster,
  posterMobile,
  className = "",
}: {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  className?: string;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const decided = isMobile !== null;
  const src = isMobile ? mobile : desktop;
  const post = isMobile ? posterMobile : poster;

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      key={isMobile ? "m" : "d"}
      src={decided ? src : undefined}
      poster={decided ? post : poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      className={className}
    />
  );
}
