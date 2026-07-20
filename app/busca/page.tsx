"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, COLLECTIONS } from "@/lib/catalog";

const SUGESTOES = ["Cartelas", "Combo", "Guia", "Consultoria", "Inverno"];

export default function BuscaPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    return PRODUCTS.filter((p) => {
      const col = COLLECTIONS.find((c) => c.id === p.collection)?.name ?? "";
      return `${p.name} ${p.excerpt} ${col} ${p.format}`
        .toLowerCase()
        .includes(query);
    });
  }, [query]);

  const hasQuery = query.length >= 2;

  return (
    <div className="u-container py-16 md:py-20">
      <p className="u-eyebrow">Buscar</p>

      {/* campo de busca */}
      <div className="mt-4 flex items-center gap-4 border-b-2 border-ink pb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="h-6 w-6 shrink-0 text-ink-mute"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20.5 20.5-3.6-3.6" />
        </svg>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="O que você procura?"
          aria-label="Buscar produtos"
          className="u-display w-full min-w-0 bg-transparent text-2xl text-ink placeholder:text-ink-mute/45 focus:outline-none md:text-5xl"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="shrink-0 text-[0.62rem] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-marsala"
          >
            Limpar
          </button>
        )}
      </div>

      {/* sugestões quando vazio */}
      {!hasQuery && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink-mute">
            Sugestões
          </span>
          {SUGESTOES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="rounded-xs border border-line px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* contagem */}
      {hasQuery && (
        <p className="mt-8 text-[0.7rem] uppercase tracking-[0.16em] text-ink-mute">
          {results.length}{" "}
          {results.length === 1 ? "resultado" : "resultados"} para “{q.trim()}”
        </p>
      )}

      {/* resultados */}
      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {/* vazio */}
      {hasQuery && results.length === 0 && (
        <div className="mt-16 max-w-md">
          <p className="u-display text-2xl text-ink">
            Nada encontrado por aqui.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Não achamos nada para “{q.trim()}”. Tente outro termo ou explore a
            loja inteira.
          </p>
          <Link
            href="/loja"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98]"
          >
            Ver a loja
            <span aria-hidden className="u-arrow">
              →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
