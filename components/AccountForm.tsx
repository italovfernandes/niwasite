"use client";

import { useState } from "react";

const inputBase =
  "w-full border-b border-line bg-transparent pb-2.5 text-ink placeholder:text-ink-mute/60 focus:border-marsala focus:outline-none transition-colors";

export default function AccountForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-8"
    >
      <label className="mb-5 block">
        <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.18em] text-ink-mute">
          E-mail
        </span>
        <input
          type="email"
          autoComplete="email"
          required
          className={inputBase}
          placeholder="voce@email.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.18em] text-ink-mute">
          Senha
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          className={inputBase}
          placeholder="••••••••"
        />
      </label>

      <button
        type="button"
        className="mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:text-marsala"
      >
        Esqueci minha senha
      </button>

      <button
        type="submit"
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-xs bg-marsala py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.99]"
      >
        Entrar
        <span aria-hidden className="u-arrow">
          →
        </span>
      </button>

      {sent && (
        <p className="mt-5 rounded-sm bg-sand px-4 py-3 text-sm leading-relaxed text-ink-soft">
          Demonstração — o login ainda não está conectado. É aqui que a conta
          real autenticaria o seu acesso.
        </p>
      )}
    </form>
  );
}
