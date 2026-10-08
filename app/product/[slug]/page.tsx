import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import SignatureSelector from "@/components/SignatureSelector";
import CartelasLanding from "@/components/backup/CartelasLandingBackup";
import {
  PRODUCTS,
  collectionById,
  formatBRL,
  isSoldOut,
  productBySlug,
  seasonById,
} from "@/lib/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.excerpt };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) notFound();

  // the flagship cartela product renders the rich Cartelas landing as its PDP
  if (product.landing === "cartelas") return <CartelasLanding />;

  const collection = collectionById(product.collection);
  // cartela individual → mostra as 3 cartelas da sua estação (irmãs)
  const season = product.season ? seasonById(product.season) : undefined;
  const related = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.slug !== product.slug
  ).slice(0, 4);

  const detailSummary =
    "flex cursor-pointer list-none items-center justify-between py-4 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-ink [&::-webkit-details-marker]:hidden";

  return (
    <div>
      {/* ===== split — imagem (metade) + info delicada (metade) ===== */}
      <div className="md:grid md:grid-cols-2">
        {/* imagem full-bleed, sticky em tela cheia */}
        <div className="md:sticky md:top-0 md:h-screen">
          <ProductArt
            product={product}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-[62vh] w-full md:h-full"
          />
        </div>

        {/* info */}
        <div className="flex items-center px-6 py-14 md:min-h-screen md:px-14 lg:px-24">
          <div className="w-full max-w-md">
            <nav className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-ink-mute">
              <Link href="/shop" className="u-link hover:text-ink">
                Shop
              </Link>
              <span>/</span>
              <Link
                href={`/shop?c=${collection.id}`}
                className="u-link hover:text-ink"
              >
                {collection.name}
              </Link>
            </nav>

            <h1 className="u-display mt-5 text-2xl md:text-[1.9rem]">
              {product.name}
            </h1>

            {/* preço — pequeno */}
            <div className="mt-3 flex items-center gap-2.5">
              {product.compareAt && (
                <span className="text-sm text-ink-mute line-through tabular-nums">
                  {formatBRL(product.compareAt)}
                </span>
              )}
              <span className="text-base font-medium tabular-nums text-ink">
                {formatBRL(product.price)}
              </span>
              <span className="ml-1 rounded-full border border-line px-2.5 py-0.5 text-[0.5rem] uppercase tracking-[0.16em] text-ink-mute">
                {product.format}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              {product.excerpt}
            </p>

            {product.slug === "signature" ? (
              <SignatureSelector product={product} />
            ) : (
             <>
            {/* cartelas — só quando o produto é sobre cartelas (estação ou combo) */}
            {season ? (
              <div className="mt-6">
                <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ink-mute">
                  The 3 color fans of {season.name}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {season.cartelas.map((c) => {
                    const current = c.slug === product.slug;
                    const sold = isSoldOut(c.slug);
                    return (
                      <Link
                        key={c.slug}
                        href={`/product/${c.slug}`}
                        title={sold ? `${c.name} — sold out` : c.name}
                        aria-current={current ? "page" : undefined}
                        aria-label={sold ? `${c.name} — sold out` : undefined}
                        className={`relative block aspect-square w-16 overflow-hidden rounded-md transition-transform hover:-translate-y-0.5 ${
                          sold
                            ? "border-2 border-dashed border-ink-mute/45"
                            : current
                              ? "ring-2 ring-marsala"
                              : "ring-1 ring-line hover:ring-ink"
                        }`}
                      >
                        <Image
                          src={c.src}
                          alt={c.name}
                          fill
                          sizes="64px"
                          className={`object-cover ${
                            sold ? "opacity-45 saturate-0" : ""
                          }`}
                        />
                        {sold && (
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-paper/45"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* CTA */}
            {product.soldOut ? (
              <div className="mt-8 flex items-center gap-3 rounded-sm border border-line bg-paper-deep/60 px-4 py-4">
                <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[0.5rem] font-medium uppercase tracking-[0.16em] text-paper">
                  Sold out
                </span>
                <p className="text-sm text-ink-soft">
                  This color fan is currently unavailable.
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <AddToCartButton product={product} className="w-full" />
                <p className="mt-3 text-[0.58rem] uppercase tracking-[0.18em] text-ink-mute">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
             </>
            )}

            {/* detalhes — accordions enxutos */}
            <div className="mt-9">
              <details className="group border-t border-line">
                <summary className={detailSummary}>
                  Description
                  <span
                    aria-hidden
                    className="text-sm leading-none text-ink-mute transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="space-y-3 pb-5 text-[0.82rem] leading-relaxed text-ink-soft">
                  {product.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </details>

              <details className="group border-t border-line">
                <summary className={detailSummary}>
                  Details
                  <span
                    aria-hidden
                    className="text-sm leading-none text-ink-mute transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="space-y-2 pb-5">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-[0.82rem] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-marsala" />
                      {f}
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group border-y border-line">
                <summary className={detailSummary}>
                  What's included
                  <span
                    aria-hidden
                    className="text-sm leading-none text-ink-mute transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="space-y-2 pb-5">
                  {product.includes.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-[0.82rem] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-marsala" />
                      {f}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="u-container border-t border-line py-16 md:py-20">
          <Reveal className="mb-10">
            <p className="u-eyebrow">Still in {collection.name}</p>
            <h2 className="u-display mt-3 text-4xl md:text-5xl">
              Complete the <em className="font-light italic u-accent">collection.</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
