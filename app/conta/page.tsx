import type { Metadata } from "next";
import AccountForm from "@/components/AccountForm";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta Niwa.",
};

export default function ContaPage() {
  return (
    <div className="flex min-h-[calc(100dvh-62px)] items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <p className="u-eyebrow">Sua conta Niwa</p>
        <h1 className="u-display mt-4 text-4xl md:text-5xl">
          Bem-vinda
          <br />
          de <em className="font-light italic u-accent">volta.</em>
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">
          Entre para acompanhar seus pedidos e receber as novidades de cada
          estação.
        </p>
        <AccountForm />
      </div>
    </div>
  );
}
