"use client";

import Link from "next/link";
import { useState } from "react";
import { formatBRL, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import ProductArt from "./ProductArt";

function BagPlusIcon() {
  // ícone "adicionar ao carrinho" — replica exata do `icon_cart_a2c`
  // do Mercado Livre (carrinho + "+" sólido), herdando a cor via currentColor.
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.4707 15.5525C7.08884 15.6153 7.58057 16.1072 7.64355 16.7253L7.65039 16.8601C7.6502 17.5401 7.13305 18.0996 6.4707 18.1667L6.33691 18.1736C5.65671 18.1736 5.09657 17.6563 5.0293 16.9939L5.02246 16.8601C5.02246 16.1346 5.61144 15.5457 6.33691 15.5457L6.4707 15.5525Z" />
      <path d="M15.1973 15.5457C15.8772 15.5457 16.4373 16.0631 16.5049 16.7253L16.5117 16.8601C16.5115 17.5854 15.9226 18.1736 15.1973 18.1736C14.5172 18.1734 13.9578 17.6563 13.8906 16.9939L13.8838 16.8601C13.8838 16.1347 14.472 15.5458 15.1973 15.5457Z" />
      <path d="M3.5752 2.82007L4.24707 5.50854L4.24805 5.50952L6.08594 12.3269L6.0957 12.364H15.3623L15.3721 12.3259L17.0615 5.54663H18.4355L16.4014 13.6277H5.06055L2.52539 4.12085L2.51562 4.08374H1.0498V2.82007H3.5752Z" />
      <path d="M11.29 2.82007V5.31909H13.791V6.58276H11.29V9.08374H10.0264V6.58276H7.52734V5.31909H10.0264V2.82007H11.29Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MiniSpinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-ink-mute/30 border-t-marsala"
    />
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");
  const soldOut = product.soldOut;

  function handleAdd() {
    if (soldOut || status !== "idle") return;
    setStatus("loading");
    window.setTimeout(() => {
      add(
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          format: product.format,
        },
        1
      );
      setStatus("added");
      window.setTimeout(() => setStatus("idle"), 1400);
    }, 500);
  }

  return (
    <article className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden focus-visible:outline-marsala"
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
            soldOut ? "opacity-70 grayscale-[0.25]" : ""
          }`}
        >
          <ProductArt product={product} className="h-full w-full" />
        </div>
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-[0.52rem] font-medium uppercase tracking-[0.2em] text-ink">
            Sold out
          </span>
        )}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[0.8rem] leading-snug text-ink">
            <Link
              href={`/product/${product.slug}`}
              className="u-link decoration-transparent"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[0.8rem] tabular-nums text-ink-soft">
            {product.compareAt && (
              <span className="mr-2 text-ink-mute line-through">
                {formatBRL(product.compareAt)}
              </span>
            )}
            {formatBRL(product.price)}
          </p>
        </div>

        {soldOut ? (
          <span
            className="shrink-0 pt-0.5 text-[0.52rem] font-medium uppercase tracking-[0.16em] text-ink-mute"
            aria-label={`${product.name} is sold out`}
          >
            Sold out
          </span>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            disabled={status !== "idle"}
            aria-busy={status === "loading"}
            aria-label={`Add ${product.name} to cart`}
            className={`shrink-0 pt-0.5 transition-[color,transform] duration-300 ease-out hover:-translate-y-0.5 active:scale-90 disabled:cursor-wait ${
              status === "added" ? "text-marsala" : "text-ink-soft hover:text-marsala"
            }`}
          >
            <span className={status === "added" ? "anim-pop inline-block" : "inline-block"}>
              {status === "loading" ? (
                <MiniSpinner />
              ) : status === "added" ? (
                <CheckIcon />
              ) : (
                <BagPlusIcon />
              )}
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
