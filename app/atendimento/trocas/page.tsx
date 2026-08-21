import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Returns and refunds",
  description:
    "Niwa returns and refunds policy — timelines, conditions, and how to request one.",
};

const BLOCOS = [
  {
    t: "Return window",
    d: "You have up to 30 calendar days after receiving your order to request a return or refund — no need to explain why.",
  },
  {
    t: "Returns for defects",
    d: "If any item arrives with a printing defect or shipping damage, we take care of everything: we resend a new piece at no cost, within 30 days of receipt.",
  },
  {
    t: "Conditions",
    d: "For returns and refunds, the product must be in perfect condition, with no signs of use and in its original packaging. Consultation services already provided are non-refundable.",
  },
  {
    t: "How to request",
    d: "Write to us at hello@niwa.com with your order number and a photo of the item. We reply within 2 business days with the steps and the return label.",
  },
];

export default function TrocasPage() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <h2 className="u-display text-4xl md:text-5xl">
          Returns and{" "}
          <em className="font-light italic u-accent">refunds.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          We want you to feel whole with your purchase. If something doesn&apos;t
          go as expected, we&apos;ll make it right with care.
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
