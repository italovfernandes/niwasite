import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Envios e prazos",
  description:
    "Produção, envio, frete e rastreamento dos pedidos Niwa — tudo sobre os prazos de entrega.",
};

const BLOCOS = [
  {
    t: "Prazo de produção",
    d: "As cartelas e os guias são impressos sob demanda e conferidos peça a peça. A produção leva de 2 a 4 dias úteis antes da postagem.",
  },
  {
    t: "Prazo de entrega",
    d: "Após a postagem, o prazo varia com a sua região: de 2 a 5 dias úteis para o Sudeste e de 5 a 10 dias úteis para as demais regiões do Brasil.",
  },
  {
    t: "Frete cortesia",
    d: "Pedidos acima de R$ 600 têm frete cortesia para todo o Brasil. Abaixo desse valor, o frete é calculado na finalização, pelo seu CEP.",
  },
  {
    t: "Rastreamento",
    d: "Assim que o pedido é postado, você recebe o código de rastreio por e-mail para acompanhar cada etapa até a sua porta.",
  },
];

export default function EnviosPage() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <h2 className="u-display text-4xl md:text-5xl">
          Envios e <em className="font-light italic u-accent">prazos.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Cada pedido é preparado com cuidado. Aqui está tudo sobre a produção, o
          envio e quando as suas cores chegam até você.
        </p>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {BLOCOS.map((b, i) => (
          <Reveal key={b.t} delay={i * 70} className="border-b border-line py-7">
            <h3 className="font-display text-xl text-ink">{b.t}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{b.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
