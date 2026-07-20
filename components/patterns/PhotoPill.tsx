import Image from "next/image";

/**
 * Chip contido: foto circular + label (ref. pills "Oily/Dry/Combination skin").
 * Versão discreta do padrão de chip — para seções de respiro (CLAUDE.md §5, §7).
 */
export default function PhotoPill({
  image,
  label,
  alt = "",
  className = "",
}: {
  image: string;
  label: string;
  alt?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 pl-1.5 pr-4 backdrop-blur-sm ${className}`}
    >
      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
        <Image src={image} alt={alt} fill sizes="28px" className="object-cover" />
      </span>
      <span className="text-[0.72rem] font-medium tracking-[0.02em] text-ink">
        {label}
      </span>
    </span>
  );
}
