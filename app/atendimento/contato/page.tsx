import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContatoForm from "@/components/ContatoForm";

export const metadata: Metadata = {
  title: "Fale com a Niwa",
  description:
    "Dúvidas sobre as suas cores, um pedido ou uma parceria? Fale com o atendimento Niwa.",
};

const CANAIS: { label: string; valor: string; href?: string }[] = [
  { label: "E-mail", valor: "oi@niwa.com", href: "mailto:oi@niwa.com" },
  {
    label: "WhatsApp",
    valor: "+55 11 90000-0000",
    href: "https://wa.me/5511900000000",
  },
  { label: "Atendimento", valor: "Segunda a sexta, das 9h às 18h" },
];

export default function ContatoPage() {
  return (
    <div>
      <Reveal className="max-w-2xl">
        <h2 className="u-display text-4xl md:text-5xl">
          Fale com <em className="font-light italic u-accent">a Niwa.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Dúvidas sobre as suas cores, um pedido ou uma parceria? Escreva pra
          gente — respondemos com atenção e no seu tempo.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <ul className="border-t border-line">
            {CANAIS.map((c) => (
              <li key={c.label} className="border-b border-line py-5">
                <p className="u-eyebrow">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-1.5 inline-block font-display text-xl text-ink u-link"
                  >
                    {c.valor}
                  </a>
                ) : (
                  <p className="mt-1.5 font-display text-xl text-ink">
                    {c.valor}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <ContatoForm />
        </Reveal>
      </div>
    </div>
  );
}
