"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/loja", label: "Loja" },
  { href: "/produto/cartela-sazonal-12-subtons", label: "Cartelas" },
  { href: "/guias", label: "Dossiês" },
  { href: "/partnership", label: "Partnership" },
  { href: "/reviews", label: "Reviews" },
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
      <path d="M2.5 3.5H5l2.1 10.5a1.7 1.7 0 0 0 1.7 1.4h8a1.7 1.7 0 0 0 1.7-1.3L21.5 7H6" />
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
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
        className={`transition-colors duration-500 ${
          transparent
            ? "bg-transparent"
            : theme === "dark" && !menuOpen
              ? "bg-plum/95 backdrop-blur-md"
              : "bg-paper/95 backdrop-blur-md"
        }`}
      >
        <nav className="u-container flex h-[62px] items-center gap-6">
          {/* left: wordmark */}
          <div className="flex flex-1 items-center">
            <Link href="/" aria-label="Niwa — início" className="flex shrink-0 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  whiteText
                    ? "/logo-seasons-white.svg"
                    : "/logo-seasons-purple.svg"
                }
                alt="Niwa Seasons"
                className="h-20 w-auto md:h-24"
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
            {/* perfil só no desktop — no mobile a conta fica no menu hambúrguer */}
            <Link href="/conta" aria-label="Minha conta" className="hidden transition-opacity hover:opacity-70 md:block">
              <IconUser />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
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

      {/* mobile menu — painel de altura cheia (não corta os itens) */}
      <div
        className={`overflow-y-auto bg-paper md:hidden ${
          menuOpen ? "h-[calc(100dvh-62px)]" : "h-0"
        } transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      >
        <div className="u-container flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line/60 py-4 font-display text-xl text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/conta"
            onClick={() => setMenuOpen(false)}
            className="py-4 font-display text-xl text-ink"
          >
            Minha conta
          </Link>
        </div>
      </div>
    </header>
  );
}
