"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";

export default function AddToCartButton({
  product,
  className = "",
  label = "Adicionar ao carrinho",
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        format: product.format,
      },
      1
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Adicionar ${product.name} ao carrinho`}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-xs bg-marsala px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep focus-visible:outline-marsala active:scale-[0.98] ${className}`}
    >
      {added ? (
        <span className="anim-pop">Adicionado ✓</span>
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
