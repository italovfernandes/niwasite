import Reveal from "@/components/Reveal";

/**
 * "O que você recebe" — features do dossiê em bento grid sobre plum, no mesmo
 * padrão visual de "Cartelas únicas e práticas" (ícone + label + desc opcional).
 * Entra depois de "Da cabeça aos pés".
 */
type IconName =
  | "pages"
  | "practical"
  | "language"
  | "immersion"
  | "makeup"
  | "accessories"
  | "travel";

function FeatureIcon({
  name,
  className = "h-8 w-8 text-[#C295D9] md:h-9 md:w-9",
}: {
  name: IconName;
  className?: string;
}) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<IconName, React.ReactNode> = {
    pages: (
      <>
        <path
          d="M12 6.5C10.4 5.4 7.8 4.9 4.8 5.2V18c3-.3 5.6.2 7.2 1.3 1.6-1.1 4.2-1.6 7.2-1.3V5.2c-3-.3-5.6.2-7.2 1.3Z"
          {...p}
        />
        <path d="M12 6.5v12.8" {...p} />
      </>
    ),
    practical: (
      <>
        <circle cx="12" cy="12" r="9" {...p} />
        <path d="M8.3 12.4 11 15l4.7-5.2" {...p} />
      </>
    ),
    language: (
      <>
        <path
          d="M20 5H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v3l4-3h9a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"
          {...p}
        />
        <path d="M7.5 9.5h9M7.5 12.5h5.5" {...p} />
      </>
    ),
    immersion: (
      <path
        d="M12 20s-7-4.6-7-9.6A3.4 3.4 0 0 1 12 7a3.4 3.4 0 0 1 7 3.4C19 15.4 12 20 12 20Z"
        {...p}
      />
    ),
    makeup: (
      <>
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" {...p} />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" {...p} />
      </>
    ),
    accessories: (
      <>
        <path d="M6 8h12l-1 12.5H7L6 8Z" {...p} />
        <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" {...p} />
      </>
    ),
    travel: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="2" {...p} />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" {...p} />
        <path d="M9 11v5M15 11v5" {...p} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden>
      {paths[name]}
    </svg>
  );
}

const FEATURES: {
  label: string;
  desc?: string;
  icon: IconName;
  span: string;
  highlight?: boolean;
}[] = [
  {
    label: "Self-discovery & self-care",
    desc: "A guide to understanding, caring for, and recognizing yourself.",
    icon: "immersion",
    span: "col-span-2 md:col-span-3",
    highlight: true,
  },
  {
    label: "Colors, the associative way",
    desc: "Learn to use your colors by connecting them to who you are.",
    icon: "practical",
    span: "col-span-2 md:col-span-3",
  },
  {
    label: "Practical, accessible language",
    desc: "No jargon — easy to understand and to put into practice.",
    icon: "language",
    span: "col-span-2 md:col-span-2",
  },
  {
    label: "Every season, all year long",
    desc: "Wear your colors any time of year, no matter the calendar.",
    icon: "pages",
    span: "col-span-2 md:col-span-2",
  },
  {
    label: "SmartTravel",
    desc: "Looks, combinations, and tips for traveling light.",
    icon: "travel",
    span: "col-span-2 md:col-span-2",
  },
];

export default function GuiasFeatures() {
  return (
    <section
      data-nav-dark
      className="u-section border-t border-paper/15 bg-plum text-paper"
    >
      <div className="u-container">
        <Reveal className="max-w-2xl">
          <p className="u-eyebrow !text-[#C295D9]/70">Inside the dossier</p>
          <h2 className="u-display mt-4 text-5xl md:text-6xl">
            Learn to trust
            <br />
            <em className="font-light italic u-accent">yourself.</em>
          </h2>
        </Reveal>

        <ul className="mt-14 grid auto-rows-[minmax(190px,1fr)] grid-cols-2 gap-4 md:grid-cols-6">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.label} delay={(i % 3) * 80} className={f.span}>
              <div
                className={`group flex h-full flex-col justify-between rounded-sm border p-7 transition-colors hover:bg-white/[0.04] md:p-8 ${
                  f.highlight
                    ? "border-[#C295D9]/45 bg-white/[0.03]"
                    : "border-paper/15 hover:border-[#C295D9]/50"
                }`}
              >
                <FeatureIcon name={f.icon} />
                <div>
                  <span
                    className={`block text-base font-medium leading-snug md:text-lg ${
                      f.highlight ? "u-accent" : "text-paper"
                    }`}
                  >
                    {f.label}
                  </span>
                  {f.desc && (
                    <span className="mt-1.5 block text-sm leading-relaxed text-paper/55">
                      {f.desc}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
