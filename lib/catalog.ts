// ---------------------------------------------------------------------------
// Niwa — catálogo, estações e conteúdo editorial (dados de mockup)
// ---------------------------------------------------------------------------

export type SeasonId = "primavera" | "verao" | "outono" | "inverno";
export type CollectionId = "ferramentas" | "guias" | "formacao";

export interface Swatch {
  name: string;
  hex: string;
}

export interface Season {
  id: SeasonId;
  name: string;
  temp: "Quente" | "Fria";
  index: string;
  tagline: string;
  description: string;
  swatches: Swatch[];
  image: string; // unsplash id
  icon: string; // /icones/*.svg
  accent: string; // solid panel colour
  // cada estação tem 3 cartelas — produtos individuais (slug = URL/PDP próprio).
  // name em inglês para casar com a capa impressa do produto (sistema 12 estações);
  // src = leque 1:1 usado em thumbnails; a capa do produto vem de /capas/{slug}.jpg
  cartelas: { name: string; slug: string; src: string }[];
}

export interface Collection {
  id: CollectionId;
  name: string;
  kicker: string;
  description: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  collection: CollectionId;
  format: "Físico" | "Digital" | "Online" | "Presencial";
  price: number;
  compareAt?: number;
  badge?: string;
  season?: SeasonId;
  landing?: "cartelas"; // when set, its PDP renders the rich Cartelas landing
  excerpt: string;
  description: string[];
  features: string[];
  includes: string[];
}

// ------------------------------- image helper ------------------------------

export function unsplash(id: string, w: number, h: number, q = 80): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;
}

// Editorial photography (verified IDs)
export const PHOTO = {
  hero: "photo-1571513800374-df1bbe650e56", // cream blazer, warm gold
  method: "photo-1531123897727-8f129e1688ce", // elegant portrait, subtom de pele
  editorial: "photo-1550928431-ee0ec6db30d3", // dramatic red gown
  bw: "photo-1506863530036-1efeddceb993", // b&w portrait
  flatWarm: "photo-1512496015851-a90fb38ba796", // warm eyeshadow palette
  flatDark: "photo-1522338242992-e1a54906a8da", // brushes, dark
} as const;

// ---------------------------------- seasons --------------------------------

export const SEASONS: Season[] = [
  {
    id: "primavera",
    name: "Primavera",
    temp: "Quente",
    index: "01",
    tagline: "Clara, quente e luminosa",
    description:
      "Suas cores nascem no subtom quente e luminoso — o atalho pra vestir só o que ilumina sua pele.",
    swatches: [
      { name: "Coral", hex: "#f4826b" },
      { name: "Pêssego", hex: "#f6b99b" },
      { name: "Ouro claro", hex: "#e7b24c" },
      { name: "Verde folha", hex: "#8fbf6b" },
      { name: "Água", hex: "#6fc7c0" },
    ],
    image: "photo-1515372039744-b8f02a3ae446",
    icon: "/icones/primavera.svg",
    accent: "#f5d9a0",
    cartelas: [
      { name: "Light Spring", slug: "cartela-light-spring", src: "/cartelas/Light_Spring_1x1.png" },
      { name: "Warm Spring", slug: "cartela-warm-spring", src: "/cartelas/Warm_Spring_1x1.png" },
      { name: "Bright Spring", slug: "cartela-bright-spring", src: "/cartelas/Bright_Spring_1x1.png" },
    ],
  },
  {
    id: "verao",
    name: "Verão",
    temp: "Fria",
    index: "02",
    tagline: "Suave, fria e delicada",
    description:
      "Seu subtom frio pede leveza. As 3 cartelas trazem os tons que suavizam, sem contraste que pesa.",
    swatches: [
      { name: "Rosa poeira", hex: "#c99aa6" },
      { name: "Azul névoa", hex: "#9fb4ce" },
      { name: "Lavanda", hex: "#b0a6c9" },
      { name: "Sálvia", hex: "#a9bba6" },
      { name: "Malva", hex: "#cbb8c4" },
    ],
    image: "photo-1487412720507-e7ab37603c6f",
    icon: "/icones/verao.svg",
    accent: "#6ec6ac",
    cartelas: [
      { name: "Light Summer", slug: "cartela-light-summer", src: "/cartelas/Light_Summer_1x1.png" },
      { name: "Soft Summer", slug: "cartela-soft-summer", src: "/cartelas/Soft_Summer_1x1.png" },
      { name: "Cool Summer", slug: "cartela-cool-summer", src: "/cartelas/Cool_Summer_1x1.png" },
    ],
  },
  {
    id: "outono",
    name: "Outono",
    temp: "Quente",
    index: "03",
    tagline: "Quente, profunda e terrosa",
    description:
      "Terracota, folhagem, ouro velho — as cores do seu subtom quente, prontas pra usar com segurança.",
    swatches: [
      { name: "Terracota", hex: "#b5623c" },
      { name: "Oliva", hex: "#8a7a3d" },
      { name: "Mostarda", hex: "#c8993c" },
      { name: "Ferrugem", hex: "#9c4a2e" },
      { name: "Musgo", hex: "#566044" },
    ],
    image: "photo-1531123897727-8f129e1688ce",
    icon: "/icones/outono.svg",
    accent: "#e3a882",
    cartelas: [
      { name: "Soft Autumn", slug: "cartela-soft-autumn", src: "/cartelas/Soft_Autumn_1x1.png" },
      { name: "Warm Autumn", slug: "cartela-warm-autumn", src: "/cartelas/Warm_Autumn_1x1.png" },
      { name: "Deep Autumn", slug: "cartela-deep-autumn", src: "/cartelas/Deep_Autumn_1x1.png" },
    ],
  },
  {
    id: "inverno",
    name: "Inverno",
    temp: "Fria",
    index: "04",
    tagline: "Fria, intensa e contrastante",
    description:
      "Alto contraste, cores puras — os tons do seu subtom frio que dão presença à sua pele.",
    swatches: [
      { name: "Carmim", hex: "#b0243b" },
      { name: "Esmeralda", hex: "#1e6e56" },
      { name: "Azul real", hex: "#2e4a8a" },
      { name: "Magenta", hex: "#a02e6e" },
      { name: "Tinta", hex: "#2a2733" },
    ],
    image: "photo-1494790108377-be9c29b29330",
    icon: "/icones/inverno.svg",
    accent: "#a9dcea",
    cartelas: [
      { name: "Bright Winter", slug: "cartela-bright-winter", src: "/cartelas/Bright_Winter_1x1.png" },
      { name: "Cool Winter", slug: "cartela-cool-winter", src: "/cartelas/Cool_Winter_1x1.png" },
      { name: "Deep Winter", slug: "cartela-deep-winter", src: "/cartelas/Deep_Winter_1x1.png" },
    ],
  },
];

export const seasonById = (id: SeasonId) =>
  SEASONS.find((s) => s.id === id) as Season;

// -------------------------------- collections ------------------------------

export const COLLECTIONS: Collection[] = [
  {
    id: "ferramentas",
    name: "Cartelas",
    kicker: "As cores",
    description:
      "As cartelas sazonais e os combos — as suas cores, prontas pra viver com você.",
    image: PHOTO.flatDark,
  },
  {
    id: "guias",
    name: "Guias",
    kicker: "O repertório",
    description:
      "O guia de estilo Niwa — aprenda a usar as suas cores da cabeça aos pés.",
    image: PHOTO.flatWarm,
  },
  {
    id: "formacao",
    name: "Consultoria",
    kicker: "O acompanhamento",
    description:
      "A análise completa da sua coloração pessoal, conduzida por uma consultora Niwa.",
    image: PHOTO.bw,
  },
];

export const collectionById = (id: CollectionId) =>
  COLLECTIONS.find((c) => c.id === id) as Collection;

// --------------------------------- products --------------------------------

// preço unitário de cada cartela (US$) — ver documento de referência
export const CARTELA_PRICE = 49.99;

// texto curto de vitrine por cartela (excerpt do card / topo do PDP)
const CARTELA_EXCERPTS: Record<string, string> = {
  "cartela-light-spring": "Os claros quentes e luminosos da Primavera — leveza que acende a pele.",
  "cartela-warm-spring": "O calor dourado da Primavera em estado puro — vibração sem peso.",
  "cartela-bright-spring": "A Primavera no auge do brilho — cores nítidas e cheias de vida.",
  "cartela-light-summer": "A leveza fria do Verão — tons suaves que acalmam e iluminam.",
  "cartela-soft-summer": "O Verão em pastel esfumado — elegância discreta e serena.",
  "cartela-cool-summer": "O frescor frio do Verão — azuis e rosas que refrescam a pele.",
  "cartela-soft-autumn": "O Outono em tons quebrados e aconchegantes — calor sem contraste.",
  "cartela-warm-autumn": "O ouro terroso do Outono — especiarias, folhagem e âmbar.",
  "cartela-deep-autumn": "O Outono profundo e intenso — riqueza quente em cada tom.",
  "cartela-bright-winter": "O Inverno em alto contraste e cores puras — presença imediata.",
  "cartela-cool-winter": "O frio cristalino do Inverno — tons gelados e nítidos.",
  "cartela-deep-winter": "O Inverno profundo e dramático — escuros intensos e vibrantes.",
};

// 12 cartelas individuais — geradas a partir das 3 cartelas de cada estação.
// Cada uma tem slug/PDP próprio e capa em /capas/{slug}.jpg
const CARTELA_PRODUCTS: Product[] = SEASONS.flatMap((season) =>
  season.cartelas.map((c) => ({
    slug: c.slug,
    name: c.name,
    collection: "ferramentas" as const,
    format: "Físico" as const,
    price: CARTELA_PRICE,
    season: season.id,
    excerpt: CARTELA_EXCERPTS[c.slug] ?? `Uma das cartelas da estação ${season.name}.`,
    description: [
      CARTELA_EXCERPTS[c.slug] ?? "",
      `Uma das três cartelas da família ${season.name}, impressa em alta fidelidade às cores reais — leve e fácil de levar para onde você for.`,
    ].filter(Boolean),
    features: [
      "Materiais de alta resistência",
      "Fácil de manusear, leve e portátil",
      "Impressão em alta fidelidade às cores reais",
    ],
    includes: [`Cartela ${c.name}`, "Guia de combinações"],
  }))
);

export const PRODUCTS: Product[] = [
  ...CARTELA_PRODUCTS,
  {
    slug: "cartela-sazonal-12-subtons",
    name: "Coleção Completa — 12 Cartelas",
    collection: "ferramentas",
    format: "Físico",
    price: 599.88,
    badge: "Mais vendido",
    landing: "cartelas",
    excerpt:
      "As 12 cartelas das quatro estações reunidas — toda a linguagem de cor Niwa em um só conjunto.",
    description: [
      "As 12 cartelas — as três de Primavera, Verão, Outono e Inverno — juntas, para ter em mãos toda a linguagem de cor Niwa, não importa o subtom.",
      "Impressas em alta fidelidade às cores reais, leves e fáceis de levar para onde você for. Ideal para presente e para profissionais.",
    ],
    features: [
      "As 12 cartelas das 4 estações",
      "Materiais de alta resistência",
      "Impressão em alta fidelidade às cores reais",
    ],
    includes: SEASONS.flatMap((s) => s.cartelas.map((c) => c.name)),
  },
  {
    slug: "combo-cartelas-guia",
    name: "Coleção Completa + Guia",
    collection: "ferramentas",
    format: "Físico",
    price: 669.87,
    badge: "Melhor valor",
    excerpt:
      "As 12 cartelas mais o guia de estilo — cor e conhecimento, na mesma caixa.",
    description: [
      "Tudo o que você precisa: as 12 cartelas das quatro estações e o guia de estilo Niwa, que ensina a usar as suas cores da cabeça aos pés.",
      "O caminho completo do autoconhecimento das suas cores — pronto para viver com você.",
    ],
    features: [
      "As 12 cartelas das 4 estações",
      "Guia de estilo Niwa completo",
      "Tudo em um só conjunto",
    ],
    includes: ["As 12 cartelas das 4 estações", "Guia Niwa — Método das 4 Estações"],
  },
  {
    slug: "guia-metodo-4-estacoes",
    name: "Guia de Estilo Niwa",
    collection: "guias",
    format: "Físico",
    price: 69.99,
    excerpt:
      "O guia que ensina a usar as suas cores, estampas, acessórios, maquiagem e cabelo.",
    description: [
      "Um livro de mesa e de consulta. Reúne o método Niwa e ensina, da cabeça aos pés, como usar as suas cores a seu favor — cores e estampas, acessórios, maquiagem e cabelo.",
      "Feito para ser lido, consultado e admirado sobre a mesa.",
    ],
    features: [
      "196 páginas, capa dura",
      "Pranchas de cor calibradas",
      "Da cabeça aos pés: estilo, maquiagem e cabelo",
    ],
    includes: ["Guia impresso", "Marcador em fita"],
  },
  {
    slug: "consultoria-completa",
    name: "Consultoria Completa",
    collection: "formacao",
    format: "Presencial",
    price: 249,
    badge: "Experiência",
    excerpt:
      "A análise completa da sua coloração pessoal, conduzida por uma consultora Niwa.",
    description: [
      "Uma experiência de autoconhecimento conduzida por uma consultora Niwa: drapeamento ao vivo, definição da sua estação e da sua cartela, e a orientação de como usar tudo isso no dia a dia.",
      "Ao final, você sai com as suas cores diagnosticadas e um plano de como vestir só o que ilumina você.",
    ],
    features: [
      "Sessão individual de drapeamento",
      "Diagnóstico da estação e cartela",
      "Orientação de uso da cabeça aos pés",
    ],
    includes: [
      "Consultoria presencial completa",
      "Cartela da sua estação",
      "Guia de combinações personalizado",
    ],
  },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsByCollection = (id: CollectionId) =>
  PRODUCTS.filter((p) => p.collection === id);

// palette used by the generated product artwork
export function paletteFor(product: Product): string[] {
  if (product.season) return seasonById(product.season).swatches.map((s) => s.hex);
  const map: Record<CollectionId, string[]> = {
    ferramentas: ["#b5623c", "#c8993c", "#566044", "#2e4a8a", "#52156e"],
    guias: ["#f4826b", "#e7b24c", "#8fbf6b", "#6fc7c0", "#c99aa6"],
    formacao: ["#52156e", "#3b0f52", "#b0243b", "#a02e6e", "#2a2733"],
  };
  return map[product.collection];
}

// preços em dólar, no formato "US$ 49.99"
export function formatPrice(value: number): string {
  const n = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `US$ ${n}`;
}

// alias legado — mantém as importações existentes funcionando
export const formatBRL = formatPrice;
