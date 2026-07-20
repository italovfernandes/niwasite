import type { CSSProperties } from "react";

interface ColorFanProps {
  colors: string[];
  /** blade height in px (width scales from it) */
  size?: number;
  className?: string;
}

/**
 * The signature motif — a fan of colour blades (the drapeamento tool)
 * that spreads open on hover. Pure CSS; respects reduced motion.
 */
export default function ColorFan({
  colors,
  size = 150,
  className = "",
}: ColorFanProps) {
  const n = colors.length;
  const bladeW = Math.round(size * 0.19);
  return (
    <div
      className={`fan ${className}`}
      style={{ width: size * 1.35, height: size * 1.12 }}
      aria-hidden="true"
    >
      {colors.map((c, i) => (
        <span
          key={i}
          className="fan-blade"
          style={
            {
              "--i": i,
              "--n": n,
              width: bladeW,
              height: size,
              background: c,
            } as CSSProperties
          }
        />
      ))}
      <span className="fan-pivot" />
    </div>
  );
}
