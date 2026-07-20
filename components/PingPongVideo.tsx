"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo em loop "ping-pong": toca até o fim, rebobina em reverso até o início
 * e recomeça — infinitamente. O reverso é feito por rAF decrementando o
 * currentTime (o <video> não reproduz para trás nativamente).
 */
export default function PingPongVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let raf = 0;
    let dir: 1 | -1 = 1;
    let last = performance.now();
    const EPS = 0.05;

    const goForward = () => {
      dir = 1;
      v.play().catch(() => {});
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (v.duration) {
        if (dir === 1) {
          // avançando — ao chegar no fim, inverte
          if (v.currentTime >= v.duration - EPS) {
            dir = -1;
            v.pause();
          }
        } else {
          // rebobinando manualmente
          const t = v.currentTime - dt;
          if (t <= 0) {
            v.currentTime = 0;
            goForward();
          } else {
            v.currentTime = t;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (v.readyState >= 2) goForward();
    else v.addEventListener("loadeddata", goForward, { once: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", goForward);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden
      className={className}
    />
  );
}
