import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { REVIEWS } from "@/lib/reviews";

export default function Reviews() {
  return (
    <section className="u-section bg-paper-deep">
      <div className="u-container">
        <Reveal className="max-w-2xl">
          <p className="u-eyebrow">Reviews</p>
          <h2 className="u-display mt-4 text-5xl md:text-6xl">
            They already live
            <br />
            <em className="font-light italic u-accent">in their colors.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Real stories from women who discovered their own season and never
            doubted a color again.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-2 md:grid-cols-3">
          {[...REVIEWS]
            .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
            .slice(0, 3)
            .map((r, i) => (
              <Reveal key={r.name} delay={i * 90} className="h-full">
                <ReviewCard review={r} />
              </Reveal>
            ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/reviews"
            className="group inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98]"
          >
            See more testimonials
            <span aria-hidden className="u-arrow">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
