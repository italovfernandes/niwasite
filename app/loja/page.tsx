import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import {
  COLLECTIONS,
  PRODUCTS,
  type CollectionId,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Cartelas, leques, guias e formação em coloração pessoal para profissionais.",
};

const FILTERS: { id: "todos" | CollectionId; label: string }[] = [
  { id: "todos", label: "Tudo" },
  ...COLLECTIONS.map((c) => ({ id: c.id, label: c.name })),
];

export default async function LojaPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active = FILTERS.some((f) => f.id === c) ? (c as CollectionId) : "todos";
  const products =
    active === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.collection === active);

  return (
    <div className="u-container py-10 md:py-14">
      {/* header — enxuto, foco nos produtos */}
      <Reveal>
        <p className="u-eyebrow">A loja</p>
        <h1 className="u-display mt-3 text-3xl md:text-4xl">O universo Niwa</h1>
      </Reveal>

      {/* filters — quadrados (padrão dos botões) */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-line pb-5">
        {FILTERS.map((f) => {
          const isActive = f.id === active;
          const href = f.id === "todos" ? "/loja" : `/loja?c=${f.id}`;
          return (
            <Link
              key={f.id}
              href={href}
              scroll={false}
              className={`rounded-xs px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                isActive
                  ? "bg-ink text-paper"
                  : "border border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
        <span className="ml-auto hidden text-[0.66rem] uppercase tracking-[0.16em] text-ink-mute sm:block">
          {products.length} {products.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      {/* grid */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
