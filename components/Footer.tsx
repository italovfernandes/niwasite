"use client";

import Link from "next/link";
import { COLLECTIONS } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="bg-plum text-paper">
      <div className="u-container py-16 md:py-20">
        {/* newsletter */}
        <div className="grid gap-10 border-b border-paper/15 pb-14 md:grid-cols-2 md:items-end">
          <div>
            <p className="u-eyebrow !text-paper/55">The letter of the seasons</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              Get the latest
              <br />
              from <em className="font-light italic u-accent">Niwa Seasons.</em>
            </h2>
          </div>
          <form
            className="flex w-full items-center gap-3 border-b border-paper/40 pb-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your best email"
              aria-label="Your email"
              className="w-full bg-transparent text-paper placeholder:text-paper/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-paper u-link"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="u-eyebrow !text-paper/50">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?c=${c.id}`} className="u-link hover:text-paper">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="u-link hover:text-paper">
                  View all
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="u-eyebrow !text-paper/50">Niwa</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>
                <Link href="/about" className="u-link hover:text-paper">
                  About Niwa
                </Link>
              </li>
              <li>
                <Link href="/#estacoes" className="u-link hover:text-paper">
                  The Seasons
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="u-eyebrow !text-paper/50">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>
                <Link
                  href="/support/shipping"
                  className="u-link hover:text-paper"
                >
                  Shipping & delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/support/returns"
                  className="u-link hover:text-paper"
                >
                  Exchanges & returns
                </Link>
              </li>
              <li>
                <Link
                  href="/support/accountct"
                  className="u-link hover:text-paper"
                >
                  Talk to Niwa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="u-eyebrow !text-paper/50">Social</p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-paper/70 transition-colors hover:text-paper"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-paper/70 transition-colors hover:text-paper"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
                  <path d="M15 3a4.5 4.5 0 0 0 4.5 4.5" />
                </svg>
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-paper/70 transition-colors hover:text-paper"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="h-6 w-6">
                  <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
                  <path d="M10.5 9.3 15 12l-4.5 2.7z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/15 pt-6 text-[0.7rem] uppercase tracking-[0.18em] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Niwa · Personal Color House</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="u-link hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="u-link hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
