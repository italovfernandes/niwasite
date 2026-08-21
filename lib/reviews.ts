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
      "I stopped buying the wrong clothes. I carry my color fan in my bag and the doubt disappears the moment I choose.",
    name: "Marina R.",
    meta: "Summer color fan · São Paulo",
    rating: 5,
    // exemplo de avaliação com mais de uma foto (galeria)
    images: ["/reviews/marina.jpg", "/reviews/juliana.jpg", "/reviews/carla.jpg"],
  },
  {
    quote:
      "I discovered that half my closet wasn't for me. Now I only wear what lights me up.",
    name: "Carla M.",
    meta: "Autumn color fan · Belo Horizonte",
    rating: 5,
    image: "/reviews/carla.jpg",
  },
  {
    quote:
      "The right colors even changed how people look at me. It sounds small, but it isn't.",
    name: "Juliana P.",
    meta: "Winter color fan · Curitiba",
    rating: 5,
    image: "/reviews/juliana.jpg",
  },
  {
    quote:
      "Easy to use and lovely to own. The color fan became my favorite everyday accessory.",
    name: "Beatriz L.",
    meta: "Spring color fan · Recife",
    rating: 5,
    image: "/reviews/beatriz.jpg",
  },
  {
    quote:
      "I gained time in the morning and confidence all day. I'm no longer lost in front of the mirror.",
    name: "Fernanda S.",
    meta: "Summer color fan · Florianópolis",
    rating: 5,
  },
  {
    quote:
      "I gave one to my mother and now we match our colors together. It became a moment that's ours.",
    name: "Ana C.",
    meta: "Autumn color fan · Salvador",
    rating: 5,
  },
  {
    quote:
      "The consultation was a turning point. The color fan is the map I carry with me forever.",
    name: "Renata T.",
    meta: "Winter color fan · Porto Alegre",
    rating: 5,
  },
  {
    quote:
      "I never imagined color could change so much. I feel more like myself in every look.",
    name: "Camila V.",
    meta: "Spring color fan · Brasília",
    rating: 4,
  },
  {
    quote:
      "I bought the set of all 4 and use it every day. Simple, practical and it really works.",
    name: "Patrícia G.",
    meta: "Set of 4 color fans · Fortaleza",
    rating: 5,
  },
];
