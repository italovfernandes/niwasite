"use client";

import { useState } from "react";

const inputBase =
  "w-full border-b border-line bg-transparent pb-2 pt-1 text-ink placeholder:text-ink-mute focus:border-marsala focus:outline-none transition-colors";

export default function ContatoForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-sm bg-paper-deep p-10">
        <span className="font-display text-4xl text-marsala anim-pop">✓</span>
        <h3 className="font-display text-2xl text-ink">Message sent</h3>
        <p className="max-w-sm leading-relaxed text-ink-soft">
          We received your note and will reply within 2 business days. Thank you
          for writing to Niwa.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-7"
    >
      <div>
        <label
          htmlFor="nome"
          className="u-eyebrow block text-ink-mute"
        >
          Name
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder="What can we call you?"
          className={`mt-3 ${inputBase}`}
        />
      </div>
      <div>
        <label htmlFor="email" className="u-eyebrow block text-ink-mute">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="seu@email.com"
          className={`mt-3 ${inputBase}`}
        />
      </div>
      <div>
        <label htmlFor="mensagem" className="u-eyebrow block text-ink-mute">
          Message
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={4}
          placeholder="Tell us how we can help."
          className={`mt-3 resize-none ${inputBase}`}
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98]"
      >
        Send message
        <span aria-hidden className="u-arrow">
          →
        </span>
      </button>
    </form>
  );
}
