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
        <h3 className="font-display text-2xl text-ink">Mensagem enviada</h3>
        <p className="max-w-sm leading-relaxed text-ink-soft">
          Recebemos o seu recado e respondemos em até 2 dias úteis. Obrigada por
          escrever para a Niwa.
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
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          className={`mt-3 ${inputBase}`}
        />
      </div>
      <div>
        <label htmlFor="email" className="u-eyebrow block text-ink-mute">
          E-mail
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
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={4}
          placeholder="Conte pra gente como podemos ajudar."
          className={`mt-3 resize-none ${inputBase}`}
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98]"
      >
        Enviar mensagem
        <span aria-hidden className="u-arrow">
          →
        </span>
      </button>
    </form>
  );
}
