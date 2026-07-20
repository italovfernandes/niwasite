/**
 * Assinatura NIWA — arco fino com o nó/pivô, ecoando o leque de cartelas.
 * Elemento recorrente do sistema (CLAUDE.md §4). Decorativo, currentColor.
 */
export default function ArcMotif({
  className = "",
  strokeWidth = 1,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 300 158"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* arco */}
      <path
        d="M8 150 A 146 146 0 0 1 292 150"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* raios finos do leque */}
      {[-42, -21, 0, 21, 42].map((deg) => (
        <line
          key={deg}
          x1="150"
          y1="150"
          x2={150 + 132 * Math.sin((deg * Math.PI) / 180)}
          y2={150 - 132 * Math.cos((deg * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.35}
        />
      ))}
      {/* nó/pivô */}
      <circle cx="150" cy="150" r="4.5" fill="currentColor" />
    </svg>
  );
}
