import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import CartelasLanding from "@/components/backup/CartelasLandingBackup";
import {
  PRODUCTS,
  SEASONS,
  collectionById,
  formatBRL,
  productBySlug,
  seasonById,
} from "@/lib/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/produto/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return { title: product.name, description: product.excerpt };
}

export default async function ProductPage(props: PageProps<"/produto/[slug]">) {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) notFound();

  // the flagship cartela product renders the rich Cartelas landing as its PDP
  if (product.landing === "cartelas") return <CartelasLanding />;

  const collection = collectionById(product.collection);
  // cartela individual → mostra as 3 cartelas da sua estação (irmãs)
  const season = product.season ? seasonById(product.season) : undefined;
  // combo com todas as cartelas → mostra todas as cartelas das 4 estações
  const isComboCartelas =
    product.slug === "combo-cartelas-guia" ||
    product.slug === "cartela-sazonal-12-subtons";
  const allCartelas = SEASONS.flatMap((s) => s.cartelas);
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
              <Link href="/loja" className="u-link hover:text-ink">
                Loja
              </Link>
              <span>/</span>
              <Link
                href={`/loja?c=${collection.id}`}
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

            {/* cartelas — só quando o produto é sobre cartelas (estação ou combo) */}
            {season ? (
              <div className="mt-6">
                <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ink-mute">
                  As 3 cartelas de {season.name}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {season.cartelas.map((c) => {
                    const current = c.slug === product.slug;
                    return (
                      <Link
                        key={c.slug}
                        href={`/produto/${c.slug}`}
                        title={c.name}
                        aria-current={current ? "page" : undefined}
                        className={`relative aspect-square w-16 overflow-hidden rounded-md ring-1 transition-[transform,box-shadow] hover:-translate-y-0.5 ${
                          current ? "ring-2 ring-marsala" : "ring-line hover:ring-ink"
                        }`}
                      >
                        <Image
                          src={c.src}
                          alt={c.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : isComboCartelas ? (
              <div className="mt-6">
                <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ink-mute">
                  As cartelas incluídas
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {allCartelas.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/produto/${c.slug}`}
                      title={c.name}
                      className="relative aspect-square w-14 overflow-hidden rounded-md ring-1 ring-line transition-[transform,box-shadow] hover:-translate-y-0.5 hover:ring-ink"
                    >
                      <Image
                        src={c.src}
                        alt={c.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* CTA */}
            <div className="mt-8">
              <AddToCartButton product={product} className="w-full" />
              <p className="mt-3 text-[0.58rem] uppercase tracking-[0.18em] text-ink-mute">
                Frete calculado na finalização
              </p>
            </div>

            {/* detalhes — accordions enxutos */}
            <div className="mt-9">
              <details className="group border-t border-line">
                <summary className={detailSummary}>
                  Descrição
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
                  Detalhes
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
                  O que acompanha
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
            <p className="u-eyebrow">Ainda em {collection.name}</p>
            <h2 className="u-display mt-3 text-4xl md:text-5xl">
              Complete a <em className="font-light italic u-accent">coleção.</em>
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
