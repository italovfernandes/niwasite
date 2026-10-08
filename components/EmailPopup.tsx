"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Pop-up de captura de e-mail.
 *
 * ONDE APARECE: montado no layout → vale pro site inteiro. Abre logo após o
 * carregamento (~1s), toda vez que o site é aberto/recarregado.
 */
const DELAY_MS = 1000;

export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // trava o scroll + fecha no Esc enquanto aberto
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    window.setTimeout(() => setOpen(false), 2200);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join the Niwa letter"
      className="fixed inset-0 z-[70] flex items-center justify-center px-5"
    >
      {/* scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-espresso/55 backdrop-blur-[2px] anim-rise"
        style={{ animationDuration: "0.4s" }}
      />

      {/* painel */}
      <div className="anim-rise relative grid w-full max-w-md overflow-hidden rounded-sm bg-paper md:max-w-4xl md:grid-cols-2">
        {/* imagem (desktop) — modelo, em cor */}
        <div className="relative hidden min-h-[560px] bg-espresso md:block">
          <Image
            src="/sobre/asas.jpg"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 0px, 480px"
            className="object-cover object-[center_20%]"
          />
        </div>

        {/* conteúdo */}
        <div className="relative flex flex-col justify-center px-8 py-12 text-center md:px-14 md:py-16">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          {done ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center">
              <span className="font-display text-5xl text-marsala">✓</span>
              <h2 className="u-display mt-4 text-3xl text-ink">You're in.</h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                Watch your inbox — your 10% welcome code is on its way.
              </p>
            </div>
          ) : (
            <>
              <p className="u-eyebrow">The letter of the seasons</p>
              <h2 className="u-display mx-auto mt-4 max-w-sm text-[2.4rem] leading-[1.02] text-ink md:text-[2.7rem]">
                Awaken your{" "}
                <em className="font-light italic u-accent">inbox.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
                Color stories, new releases, and{" "}
                <span className="font-medium text-ink">10% off</span> your first
                order — straight to your inbox.
              </p>

              <form onSubmit={onSubmit} className="mx-auto mt-8 w-full max-w-sm">
                <label htmlFor="niwa-popup-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="niwa-popup-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your best email"
                  className="w-full border-b border-line bg-transparent pb-2.5 text-center text-ink placeholder:text-ink-mute/50 focus:border-ink focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 w-full rounded-xs bg-marsala px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-marsala-deep"
                >
                  Get my 10% off
                </button>
              </form>

              <button
                type="button"
                onClick={close}
                className="mx-auto mt-4 text-[0.62rem] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-ink"
              >
                No thanks
              </button>

              <p className="mx-auto mt-6 max-w-xs text-[0.6rem] leading-relaxed text-ink-mute/80">
                By subscribing you agree to our{" "}
                <a href="/privacy" className="u-link">
                  Privacy Policy
                </a>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
