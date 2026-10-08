import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import AtendimentoNav from "@/components/AtendimentoNav";

export default function AtendimentoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="u-container py-16 md:py-24">
      <Reveal>
        <p className="u-eyebrow">Atendimento</p>
        <h1 className="u-display mt-3 text-3xl md:text-4xl">
          Estamos por perto.
        </h1>
      </Reveal>
      <AtendimentoNav />
      <div className="mt-12">{children}</div>
    </div>
  );
}
