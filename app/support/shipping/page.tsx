import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shipping and timelines",
  description:
    "Production, shipping, delivery cost, and tracking for Niwa orders — everything about delivery timelines.",
};

const BLOCOS = [
  {
    t: "Production time",
    d: "The color fans and dossiers are printed on demand and checked piece by piece. Production takes 2 to 4 business days before shipping.",
  },
  {
    t: "Delivery time",
    d: "After shipping, delivery takes 5 to 10 business days across the entire United States. Shipping is calculated at checkout, based on your address.",
  },
  {
    t: "Tracking",
    d: "As soon as your order ships, you receive the tracking code by email to follow every step to your door.",
  },
];

export default function EnviosPage() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <h2 className="u-display text-4xl md:text-5xl">
          Shipping and <em className="font-light italic u-accent">timelines.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Every order is prepared with care. Here is everything about production,
          shipping, and when your colors reach you.
        </p>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {BLOCOS.map((b, i) => (
          <Reveal key={b.t} delay={i * 70} className="border-b border-line py-7">
            <h3 className="font-display text-xl text-ink">{b.t}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{b.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
