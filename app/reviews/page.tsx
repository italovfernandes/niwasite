import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import ReviewVideos from "@/components/ReviewVideos";
import ReviewForm from "@/components/ReviewForm";
import { REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Testimonials, reviews, and videos from women who use the Niwa Seasons color fans and discovered their own season.",
};

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-marsala" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill={i < Math.round(value) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const total = REVIEWS.length;
  const media = REVIEWS.reduce((s, r) => s + r.rating, 0) / total;
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = REVIEWS.filter((r) => r.rating === star).length;
    return { star, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="u-container pt-16 md:pt-24">
        <Reveal className="max-w-3xl">
          <p className="u-eyebrow">Reviews</p>
          <h1 className="u-display mt-4 text-5xl md:text-6xl">
            Women already living
            <br />
            <em className="font-light italic u-accent">in their colors.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Real stories from women who discovered their own season and never
            doubted a color again.
          </p>
        </Reveal>
      </section>

      {/* ===== AVALIAÇÕES — resumo + distribuição ===== */}
      <section className="u-container mt-14">
        <div className="grid items-center gap-10 rounded-lg border border-line bg-paper-deep p-8 md:grid-cols-[auto_1fr] md:gap-16 md:p-12">
          <Reveal className="text-center md:text-left">
            <p className="font-display text-7xl leading-none text-ink">
              {media.toFixed(1)}
            </p>
            <div className="mt-3 flex justify-center md:justify-start">
              <Stars value={media} />
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              {total} verified reviews
            </p>
          </Reveal>

          <Reveal delay={90} className="w-full">
            <ul className="space-y-2.5">
              {dist.map((d) => (
                <li key={d.star} className="flex items-center gap-3">
                  <span className="w-10 shrink-0 text-[0.7rem] uppercase tracking-[0.12em] text-ink-mute tabular-nums">
                    {d.star} ★
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-marsala"
                      style={{ width: `${d.pct}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-[0.7rem] text-ink-mute tabular-nums">
                    {d.count}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="u-container mt-20 md:mt-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="u-eyebrow">Testimonials</p>
          <h2 className="u-display mt-4 text-4xl md:text-5xl">
            Words from those who{" "}
            <em className="font-light italic u-accent">wore the change.</em>
          </h2>
        </Reveal>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 80}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== VÍDEOS ===== */}
      <section className="u-container mt-20 md:mt-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="u-eyebrow">On video</p>
          <h2 className="u-display mt-4 text-4xl md:text-5xl">
            Watch and hear{" "}
            <em className="font-light italic u-accent">the stories.</em>
          </h2>
        </Reveal>
        <ReviewVideos />
      </section>

      {/* ===== DEIXE SEU REVIEW ===== */}
      <section className="u-section mt-20 bg-paper-deep md:mt-28">
        <div className="u-container grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal>
            <p className="u-eyebrow">Your turn</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              Leave your{" "}
              <em className="font-light italic u-accent">review.</em>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
              Already living in your colors? Share your story — it could be the
              nudge another woman needs.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ReviewForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
