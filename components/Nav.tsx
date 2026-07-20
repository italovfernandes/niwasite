"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/produto/cartela-sazonal-12-subtons", label: "Cartelas" },
  { href: "/guias", label: "Guias" },
  { href: "/loja", label: "Loja" },
  { href: "/partnership", label: "Partnership" },
];

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]">
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-3.6-3.6" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c0-3.9 3.4-6 7.5-6s7.5 2.1 7.5 6" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px]">
      <path d="M6 8h12l-1 12.5H7L6 8Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

export default function Nav() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<"hero" | "sky" | "dark" | "light">("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero =
        pathname === "/" ? document.getElementById("home-hero") : null;
      if (hero && hero.getBoundingClientRect().bottom > 90) {
        // sobre o hero claro (pinado) → transparente
        setTheme("hero");
      } else {
        // uma seção (céu/foto ou escura) cobre o centro do nav (y≈31)?
        const spans = (sel: string) => {
          let hit = false;
          document.querySelectorAll(sel).forEach((el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            if (r.top <= 31 && r.bottom >= 31) hit = true;
          });
          return hit;
        };
        if (spans("[data-nav-sky]")) setTheme("sky"); // transparente + branco
        else if (spans("[data-nav-hero]")) setTheme("hero"); // transparente + escuro (sobre foto clara)
        else if (spans("[data-nav-dark]")) setTheme("dark"); // roxo + branco
        else setTheme("light");
      }
      if (y > lastY.current && y > 120) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // hero claro/céu → transparente; céu/foto ou escura → texto branco; resto → escuro
  const transparent = (theme === "hero" || theme === "sky") && !menuOpen;
  const whiteText = (theme === "sky" || theme === "dark") && !menuOpen;
  const linkColor = whiteText
    ? "text-paper/80 hover:text-paper"
    : "text-ink-soft hover:text-ink";
  const iconColor = whiteText ? "text-paper" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`border-b transition-colors duration-500 ${
          transparent
            ? "border-transparent bg-transparent"
            : theme === "dark" && !menuOpen
              ? "border-white/10 bg-plum/95 backdrop-blur-md"
              : "border-line bg-paper/95 backdrop-blur-md"
        }`}
      >
        <nav className="u-container flex h-[62px] items-center gap-6">
          {/* left: wordmark */}
          <div className="flex flex-1 items-center">
            <Link href="/" aria-label="Niwa — início" className="flex shrink-0 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={whiteText ? "/logo-white.svg" : "/logo-purple.svg"}
                alt="Niwa"
                className="h-[22px] w-auto"
              />
            </Link>
          </div>

          {/* center: nav */}
          <div className="hidden flex-1 items-center justify-center gap-7 md:flex">
            {LINKS.map((l) => {
              const isCurrent =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`group relative whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                    isCurrent ? iconColor : linkColor
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isCurrent ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* right: icons */}
          <div className={`flex flex-1 items-center justify-end gap-5 ${iconColor}`}>
            <span aria-hidden className="cursor-default">
              <IconSearch />
            </span>
            <Link href="/conta" aria-label="Minha conta" className="transition-opacity hover:opacity-70">
              <IconUser />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir sacola, ${count} ${count === 1 ? "item" : "itens"}`}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
            >
              <IconBag />
              <span className="text-[0.72rem] tabular-nums">{count}</span>
            </button>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-6 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-line bg-paper md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      >
        <div className="u-container flex flex-col gap-1 py-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-line/60 py-3 font-display text-xl text-ink last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/conta" className="py-3 font-display text-xl text-ink">
            Minha conta
          </Link>
        </div>
      </div>
    </header>
  );
}
