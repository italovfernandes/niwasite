"use client";

import Link from "next/link";
import { useState } from "react";
import { formatBRL, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import ProductArt from "./ProductArt";

function BagPlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12.5H7L6 8Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <path d="M12 12v4M10 14h4" />
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

export default function ProductCard({ product }: { product: Product }) {
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
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col">
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden focus-visible:outline-marsala"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          <ProductArt product={product} className="h-full w-full" />
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[0.8rem] leading-snug text-ink">
            <Link
              href={`/produto/${product.slug}`}
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

        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Adicionar ${product.name} à sacola`}
          className={`shrink-0 pt-0.5 transition-[color,transform] duration-300 ease-out hover:-translate-y-0.5 active:scale-90 ${
            added ? "text-marsala" : "text-ink-soft hover:text-marsala"
          }`}
        >
          <span className={added ? "anim-pop inline-block" : "inline-block"}>
            {added ? <CheckIcon /> : <BagPlusIcon />}
          </span>
        </button>
      </div>
    </article>
  );
}
