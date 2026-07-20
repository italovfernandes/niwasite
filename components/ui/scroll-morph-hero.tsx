"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  label: string;
  kind: "color" | "photo";
  w: number;
  h: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard ---
function FlipCard({ src, label, kind, w, h, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: w,
        height: h,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Frente — a cartela */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Verso — nome da estação */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-plum p-2 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#C295D9]">
            {kind === "color" ? "Cartela" : "Niwa"}
          </p>
          <p className="font-display text-[10px] leading-tight text-paper">
            {kind === "color" ? label : "Coloração pessoal"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Cartelas Niwa (12) — cada foto tem tom próximo à cartela vizinha ---
const CARDS = [
  "Deep_Winter",
  "Cool_Winter",
  "Cool_Summer",
  "Light_Summer",
  "Bright_Winter",
  "Soft_Summer",
  "Warm_Autumn",
  "Bright_Spring",
  "Light_Spring",
  "Deep_Autumn",
  "Soft_Autumn",
  "Warm_Spring",
];

type Item = { src: string; label: string; kind: "color" | "photo" };

// intercala cartela → foto (foto casada por tom com a cartela ao lado)
const ITEMS: Item[] = CARDS.flatMap((n, i) => [
  { src: `/cartelas-hero/cards/${n}.png`, label: n.replace("_", " "), kind: "color" as const },
  {
    src: `/cartelas-hero/photos/p${String(i + 1).padStart(2, "0")}.jpg`,
    label: "Niwa",
    kind: "photo" as const,
  },
]);
const TOTAL_IMAGES = ITEMS.length;

// scroll virtual: morph em [0,600], embaralho em [600, MAX]
const MAX_SCROLL = 1600;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // --- tamanho do container ---
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  // --- scroll virtual ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const apply = (delta: number) => {
      const next = clamp(scrollRef.current + delta, 0, MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    // só sequestra o scroll quando o hero já cobre a tela (não no meio da página)
    const inView = (r: DOMRect) =>
      r.top <= 0 && r.bottom >= window.innerHeight * 0.6;
    // fixa o hero preenchendo a tela (corrige o overshoot do scroll)
    const pin = (r: DOMRect) => {
      if (Math.round(r.top) !== 0) window.scrollBy(0, r.top);
    };

    const handleWheel = (e: WheelEvent) => {
      const r = container.getBoundingClientRect();
      if (!inView(r)) return;
      const down = e.deltaY > 0;
      const atStart = scrollRef.current <= 0;
      const atEnd = scrollRef.current >= MAX_SCROLL;
      // libera o scroll da página nas pontas — não prende o usuário
      if ((down && atEnd) || (!down && atStart)) return;
      e.preventDefault();
      pin(r);
      apply(e.deltaY);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const r = container.getBoundingClientRect();
      if (!inView(r)) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const down = deltaY > 0;
      const atStart = scrollRef.current <= 0;
      const atEnd = scrollRef.current >= MAX_SCROLL;
      if ((down && atEnd) || (!down && atStart)) return;
      e.preventDefault();
      pin(r);
      touchStartY = touchY;
      apply(deltaY);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // 1. morph: 0 (círculo) -> 1 (arco inferior), entre 0 e 600
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. embaralho após o morph
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // --- parallax de mouse ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // --- sequência de entrada (dispara quando o hero entra em cena) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let started = false;
    let t1 = 0;
    let t2 = 0;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            t1 = window.setTimeout(() => setIntroPhase("line"), 400);
            t2 = window.setTimeout(() => setIntroPhase("circle"), 2100);
            io.disconnect();
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // --- posições de dispersão inicial ---
  const scatterPositions = useMemo(() => {
    return ITEMS.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- valores derivados (para cálculo manual do morph) ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const a = smoothMorph.on("change", setMorphValue);
    const b = smoothScrollRotate.on("change", setRotateValue);
    const c = smoothMouseX.on("change", setParallaxValue);
    return () => {
      a();
      b();
      c();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  // tamanho dos cards proporcional ao viewport (consistente em qualquer resolução)
  const minDim = Math.min(containerSize.width, containerSize.height) || 900;
  const cardW = clamp(minDim * 0.1, 54, 104);
  const cardH = cardW * 1.5;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-paper"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* texto de intro (some com o morph) */}
        <div className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="u-display px-4 text-ink"
            style={{ fontSize: "clamp(1.6rem, 5vmin, 3.4rem)" }}
          >
            Cores, nós também
            <br />
            <em className="font-light italic u-accent">redefinimos</em> a
            teoria.
          </motion.h1>
        </div>

        {/* conteúdo do arco (aparece com o morph) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center"
        >
          <h2
            className="u-display px-4 text-ink"
            style={{ fontSize: "clamp(1.6rem, 5vmin, 3.4rem)" }}
          >
            Novas formas de encarar
            <br />as cores.
          </h2>
        </motion.div>

        {/* cartas */}
        <div className="relative flex h-full w-full items-center justify-center">
          {ITEMS.map((item, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = cardW + 6;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // círculo — proporcional ao viewport (cards escalam junto)
              const circleRadius = Math.min(minDimension * 0.46, 470);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // arco inferior (arco-íris, convexo pra cima)
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = clamp(rotateValue / 360, 0, 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={item.src}
                label={item.label}
                kind={item.kind}
                w={cardW}
                h={cardH}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
