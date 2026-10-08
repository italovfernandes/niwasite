"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-paper/35 border-t-paper"
    />
  );
}

export default function AddToCartButton({
  product,
  className = "",
  label = "Add to cart",
  onAdd,
}: {
  product: Product;
  className?: string;
  label?: string;
  /** quando passado, substitui o add padrão (ex.: variante da Signature) */
  onAdd?: () => void;
}) {
  const { add } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");

  const soldOut = product.soldOut;

  function handleAdd() {
    if (soldOut || status !== "idle") return;
    setStatus("loading");
    // pequeno atraso simulando o processamento → feedback de carregamento
    window.setTimeout(() => {
      if (onAdd) {
        onAdd();
      } else {
        add(
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            format: product.format,
          },
          1
        );
      }
      setStatus("added");
      window.setTimeout(() => setStatus("idle"), 1600);
    }, 550);
  }

  if (soldOut) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`inline-flex cursor-not-allowed items-center justify-center gap-2.5 rounded-xs border border-line bg-paper-deep px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-mute ${className}`}
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={status !== "idle"}
      aria-busy={status === "loading"}
      aria-label={`Add ${product.name} to cart`}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-xs bg-marsala px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep focus-visible:outline-marsala active:scale-[0.98] disabled:cursor-wait ${className}`}
    >
      {status === "loading" ? (
        <>
          <Spinner />
          <span className="sr-only">Adding…</span>
        </>
      ) : status === "added" ? (
        <span className="anim-pop">Added ✓</span>
      ) : (
        <>
          {label}
          <span aria-hidden className="u-arrow">
            →
          </span>
        </>
      )}
    </button>
  );
}
