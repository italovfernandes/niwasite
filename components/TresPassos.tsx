"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useOpacityRef } from "@/lib/use-opacity-ref";

function FloatImg({
  src,
  style,
  sizes = "200px",
}: {
  src: string;
  style: CSSProperties;
  sizes?: string;
}) {
  return (
    <div className="absolute overflow-hidden rounded-2xl" style={style}>
      <Image src={src} alt="" aria-hidden fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function TresPassos() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // scroll-driven reveals (opacity via useOpacityRef; DOM write, reliable here)
  const topRef = useOpacityRef<HTMLDivElement>(
    useTransform(scrollYProgress, [0, 0.08], [0, 1])
  );
  const phraseRef = useOpacityRef<HTMLDivElement>(
    useTransform(scrollYProgress, [0.03, 0.11], [0, 1])
  );
  const cartelasRef = useOpacityRef<HTMLSpanElement>(
    useTransform(scrollYProgress, [0.14, 0.22], [0, 1])
  );
  const guiasRef = useOpacityRef<HTMLSpanElement>(
    useTransform(scrollYProgress, [0.4, 0.48], [0, 1])
  );
  const imersaoRef = useOpacityRef<HTMLSpanElement>(
    useTransform(scrollYProgress, [0.66, 0.74], [0, 1])
  );
  const foto6Ref = useOpacityRef<HTMLDivElement>(
    useTransform(scrollYProgress, [0.18, 0.28], [0, 1])
  );
  const foto2Ref = useOpacityRef<HTMLDivElement>(
    useTransform(scrollYProgress, [0.66, 0.76], [0, 1])
  );
  const btnRef = useOpacityRef<HTMLDivElement>(
    useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  );

  // progress bars between the words (scaleX — transforms are reliable)
  const div1 = useTransform(scrollYProgress, [0.22, 0.4], [0, 1]);
  const div2 = useTransform(scrollYProgress, [0.48, 0.66], [0, 1]);

  const word =
    "u-display text-5xl italic text-[#C295D9] md:text-6xl lg:text-7xl";

  return (
    <section
      ref={ref}
      data-nav-dark
      className="relative bg-plum"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-plum text-paper">
        {/* floating collage (top) — same images/treatment as Combinações */}
        <div ref={topRef} style={{ opacity: 0 }} className="absolute inset-0 hidden md:block">
          <FloatImg src="/combinacao/foto-5.png" style={{ left: "5%", top: "9%", width: 178, height: 126 }} />
          <FloatImg src="/combinacao/foto-7.png" style={{ left: "16%", top: "19%", width: 150, height: 112 }} />
          <FloatImg src="/combinacao/foto-3.png" style={{ left: "78%", top: "9%", width: 186, height: 122 }} />
        </div>

        {/* phrase */}
        <div
          ref={phraseRef}
          style={{ opacity: 0 }}
          className="absolute inset-x-0 top-[20%] flex justify-center px-6 text-center md:top-[22%]"
        >
          <p className="max-w-md text-lg leading-relaxed text-paper/90">
            São apenas três passos até o guarda roupas perfeito.
          </p>
        </div>

        {/* words + progress bars */}
        <div className="u-container absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-6 md:flex-row md:gap-8">
          <span ref={cartelasRef} style={{ opacity: 0 }} className={word}>
            Cartelas
          </span>
          <motion.div
            style={{ scaleX: div1 }}
            className="hidden h-px flex-1 origin-left bg-paper/30 md:block"
          />
          <span ref={guiasRef} style={{ opacity: 0 }} className={word}>
            Guias
          </span>
          <motion.div
            style={{ scaleX: div2 }}
            className="hidden h-px flex-1 origin-left bg-paper/30 md:block"
          />
          <span ref={imersaoRef} style={{ opacity: 0 }} className={word}>
            Imersão
          </span>
        </div>

        {/* images below the outer words */}
        <div ref={foto6Ref} style={{ opacity: 0 }} className="hidden md:block">
          <FloatImg src="/combinacao/foto-6.png" style={{ left: "20%", top: "60%", width: 128, height: 176 }} />
        </div>
        <div ref={foto2Ref} style={{ opacity: 0 }} className="hidden md:block">
          <FloatImg src="/combinacao/foto-2.png" style={{ left: "66%", top: "58%", width: 132, height: 182 }} />
        </div>

        {/* central button */}
        <div
          ref={btnRef}
          style={{ opacity: 0 }}
          className="absolute left-1/2 top-[68%] -translate-x-1/2"
        >
          <Link
            href="/loja"
            className="inline-block rounded-xs bg-paper px-7 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-marsala hover:text-paper"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  );
}
