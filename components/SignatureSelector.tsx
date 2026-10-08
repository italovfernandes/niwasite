"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SEASONS, isSoldOut, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import AddToCartButton from "./AddToCartButton";

type Cartela = { name: string; slug: string; src: string };

/** todas as 12 cartelas, achatadas numa lista única para o dropdown */
const FANS: Cartela[] = SEASONS.flatMap((s) => s.cartelas);

/**
 * Seletor da Signature: a pessoa escolhe QUAL cartela (color fan) vai junto com
 * o dossiê, por um dropdown (select com miniatura). A escolha vira uma variante
 * no carrinho (slug/nome compostos), então seleções diferentes são itens distintos.
 */
export default function SignatureSelector({ product }: { product: Product }) {
  const { add } = useCart();
  const [selected, setSelected] = useState<Cartela>(FANS[0]);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // fecha ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleAdd() {
    add(
      {
        slug: `${product.slug}--${selected.slug}`,
        name: `The Signature — ${selected.name} + Dossier`,
        price: product.price,
        format: product.format,
      },
      1
    );
  }

  return (
    <div>
      <div className="mt-6">
        <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ink-mute">
          Choose your color fan
        </p>

        <div ref={rootRef} className="relative mt-2.5">
          {/* trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Color fan: ${selected.name}`}
            className="flex w-full items-center gap-3 rounded-sm border border-line bg-paper px-3 py-2.5 text-left transition-colors hover:border-ink focus:border-ink focus:outline-none"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xs ring-1 ring-line">
              <Image
                src={selected.src}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="flex-1 text-sm text-ink">{selected.name}</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 shrink-0 text-ink-mute transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* opções */}
          {open && (
            <ul
              role="listbox"
              aria-label="Color fans"
              className="anim-rise absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-72 overflow-auto rounded-sm border border-line bg-paper py-1"
              style={{ animationDuration: "0.18s" }}
            >
              {FANS.map((c) => {
                const active = c.slug === selected.slug;
                const sold = isSoldOut(c.slug);
                return (
                  <li
                    key={c.slug}
                    role="option"
                    aria-selected={active}
                    aria-disabled={sold || undefined}
                  >
                    <button
                      type="button"
                      disabled={sold}
                      onClick={() => {
                        if (sold) return;
                        setSelected(c);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                        sold
                          ? "cursor-not-allowed"
                          : `hover:bg-paper-deep ${active ? "bg-paper-deep" : ""}`
                      }`}
                    >
                      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-xs ring-1 ring-line">
                        <Image
                          src={c.src}
                          alt=""
                          fill
                          sizes="32px"
                          className={`object-cover ${
                            sold ? "saturate-[0.25] opacity-50" : ""
                          }`}
                        />
                        {sold && (
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-paper/40"
                          />
                        )}
                      </span>
                      <span
                        className={`flex-1 text-sm ${
                          sold ? "text-ink-mute" : "text-ink"
                        }`}
                      >
                        {c.name}
                      </span>
                      {sold ? (
                        <span className="shrink-0 rounded-full bg-paper-deep px-2 py-0.5 text-[0.5rem] font-medium uppercase tracking-[0.14em] text-ink-mute ring-1 ring-line">
                          Sold out
                        </span>
                      ) : active ? (
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 shrink-0 text-marsala"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8">
        <AddToCartButton
          product={product}
          onAdd={handleAdd}
          className="w-full"
          label={`Add ${selected.name} + Dossier`}
        />
        <p className="mt-3 text-[0.58rem] uppercase tracking-[0.18em] text-ink-mute">
          Shipping calculated at checkout
        </p>
      </div>
    </div>
  );
}
