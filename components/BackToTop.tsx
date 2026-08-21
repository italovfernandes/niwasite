"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Botão "voltar ao topo" — aparece só em páginas com mais de 4 seções
 * (conta os <section> após o render) e surge depois de rolar uma tela.
 */
export default function BackToTop() {
  const pathname = usePathname();
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);

  // (re)avalia a elegibilidade a cada troca de rota
  useEffect(() => {
    const check = () =>
      setEligible(document.querySelectorAll("section").length > 4);
    check();
    const t = window.setTimeout(check, 400); // seções client montam depois
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!eligible) {
      setVisible(false);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [eligible]);

  if (!eligible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-marsala text-paper ring-1 ring-paper/15 transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-marsala-deep active:scale-90 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        aria-hidden
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
