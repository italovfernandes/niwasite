export interface Review {
  quote: string;
  name: string;
  meta: string; // estação / cidade
  rating: number; // 1..5
  image?: string; // foto da cliente (opcional)
  images?: string[]; // várias fotos → galeria com setas (tem prioridade sobre image)
}

export const REVIEWS: Review[] = [
  {
    quote:
      "Parei de comprar roupa errada. Levo a cartela na bolsa e a dúvida some na hora de escolher.",
    name: "Marina R.",
    meta: "Cartela Verão · São Paulo",
    rating: 5,
    // exemplo de avaliação com mais de uma foto (galeria)
    images: ["/reviews/marina.jpg", "/reviews/juliana.jpg", "/reviews/carla.jpg"],
  },
  {
    quote:
      "Descobri que metade do meu armário não era pra mim. Hoje visto só o que me ilumina.",
    name: "Carla M.",
    meta: "Cartela Outono · Belo Horizonte",
    rating: 5,
    image: "/reviews/carla.jpg",
  },
  {
    quote:
      "As cores certas mudaram até como as pessoas me olham. Parece pequeno, mas não é.",
    name: "Juliana P.",
    meta: "Cartela Inverno · Curitiba",
    rating: 5,
    image: "/reviews/juliana.jpg",
  },
  {
    quote:
      "Fácil de usar e linda de ter. A cartela virou meu acessório preferido do dia a dia.",
    name: "Beatriz L.",
    meta: "Cartela Primavera · Recife",
    rating: 5,
    image: "/reviews/beatriz.jpg",
  },
  {
    quote:
      "Ganhei tempo de manhã e confiança o dia todo. Não fico mais perdida na frente do espelho.",
    name: "Fernanda S.",
    meta: "Cartela Verão · Florianópolis",
    rating: 5,
  },
  {
    quote:
      "Presenteei minha mãe e agora combinamos as nossas cores juntas. Virou um momento nosso.",
    name: "Ana C.",
    meta: "Cartela Outono · Salvador",
    rating: 5,
  },
  {
    quote:
      "A consultoria foi um divisor de águas. A cartela é o mapa que eu levo pra sempre comigo.",
    name: "Renata T.",
    meta: "Cartela Inverno · Porto Alegre",
    rating: 5,
  },
  {
    quote:
      "Nunca imaginei que cor pudesse mudar tanto. Me sinto mais eu em cada look.",
    name: "Camila V.",
    meta: "Cartela Primavera · Brasília",
    rating: 4,
  },
  {
    quote:
      "Comprei o combo das 4 e uso todo dia. Simples, prático e realmente funciona.",
    name: "Patrícia G.",
    meta: "Combo 4 Cartelas · Fortaleza",
    rating: 5,
  },
];
