import Image from "next/image";
import type { Product } from "@/lib/catalog";

/**
 * Product imagery — a real photo per product (naming convention:
 * /public/produtos/{slug}.jpg). Cartelas sazonais use their covers;
 * demais produtos usam fotos do acervo NIWA.
 */
export default function ProductArt({
  product,
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative isolate overflow-hidden bg-paper-deep ${className}`}>
      <Image
        src={`/capas/${product.slug}.jpg`}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-cover"
      />

      {/* scrim discreto p/ legibilidade dos selos (não é sombra) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent"
      />
      <span className="absolute bottom-4 left-5 text-[9px] font-medium uppercase tracking-[0.3em] text-paper/85">
        {product.format}
      </span>
      <span
        className="absolute bottom-3 right-5 text-paper/75"
        style={{ fontFamily: "var(--font-sans)", fontStyle: "italic" }}
      >
        Niwa
      </span>
    </div>
  );
}
