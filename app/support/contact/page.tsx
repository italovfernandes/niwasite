import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContatoForm from "@/components/ContatoForm";

export const metadata: Metadata = {
  title: "Talk to Niwa",
  description:
    "Questions about your colors, an order, or a partnership? Talk to Niwa support.",
};

const CANAIS: { label: string; valor: string; href?: string }[] = [
  { label: "Email", valor: "hello@niwa.com", href: "mailto:hello@niwa.com" },
  {
    label: "Instagram",
    valor: "@niwa.seasons",
    href: "https://instagram.com/niwa.seasons",
  },
  {
    label: "Facebook",
    valor: "/niwaseasons",
    href: "https://facebook.com/niwaseasons",
  },
  { label: "Support", valor: "Monday to Friday, 9am to 6pm" },
];

export default function ContatoPage() {
  return (
    <div>
      <Reveal className="max-w-2xl">
        <h2 className="u-display text-4xl md:text-5xl">
          Talk to <em className="font-light italic u-accent">Niwa.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Questions about your colors, an order, or a partnership? Write to us —
          we answer with care and in your time.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <ul className="border-t border-line">
            {CANAIS.map((c) => (
              <li key={c.label} className="border-b border-line py-5">
                <p className="u-eyebrow">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-1.5 inline-block font-display text-xl text-ink u-link"
                  >
                    {c.valor}
                  </a>
                ) : (
                  <p className="mt-1.5 font-display text-xl text-ink">
                    {c.valor}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <ContatoForm />
        </Reveal>
      </div>
    </div>
  );
}
