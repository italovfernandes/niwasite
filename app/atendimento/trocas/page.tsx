import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Trocas e devoluções",
  description:
    "Política de trocas e devoluções Niwa — prazos, condições e como solicitar.",
};

const BLOCOS = [
  {
    t: "Direito de arrependimento",
    d: "Você tem até 7 dias corridos após o recebimento para desistir da compra, conforme o Código de Defesa do Consumidor — sem precisar justificar.",
  },
  {
    t: "Trocas por defeito",
    d: "Se algum item chegar com defeito de impressão ou avaria no transporte, cuidamos de tudo: reenviamos uma nova peça sem custo, em até 30 dias do recebimento.",
  },
  {
    t: "Condições",
    d: "Para trocas e devoluções, o produto deve estar em perfeito estado, sem sinais de uso e com a embalagem original. Serviços de consultoria já realizados não são reembolsáveis.",
  },
  {
    t: "Como solicitar",
    d: "Escreva para nós em oi@niwa.com com o número do pedido e uma foto do item. Respondemos em até 2 dias úteis com o passo a passo e a etiqueta de devolução.",
  },
];

export default function TrocasPage() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <h2 className="u-display text-4xl md:text-5xl">
          Trocas e{" "}
          <em className="font-light italic u-accent">devoluções.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Queremos que você fique inteira com a sua compra. Se algo não sair como
          esperado, a gente resolve com carinho.
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
