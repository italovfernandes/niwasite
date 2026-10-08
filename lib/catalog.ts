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
  temp: "Warm" | "Cool";
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
  format: "Physical" | "Digital" | "Online" | "In person";
  price: number;
  compareAt?: number;
  badge?: string;
  season?: SeasonId;
  landing?: "cartelas"; // when set, its PDP renders the rich Cartelas landing
  image?: string; // override do art padrão (/capas/{slug}.jpg)
  soldOut?: boolean; // esgotado — desabilita a compra e mostra o selo
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
    name: "Spring",
    temp: "Warm",
    index: "01",
    tagline: "Light, warm and radiant",
    description:
      "Your colors are born in a warm, radiant undertone — the shortcut to wearing only what lights up your skin.",
    swatches: [
      { name: "Coral", hex: "#f4826b" },
      { name: "Peach", hex: "#f6b99b" },
      { name: "Light gold", hex: "#e7b24c" },
      { name: "Leaf green", hex: "#8fbf6b" },
      { name: "Aqua", hex: "#6fc7c0" },
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
    name: "Summer",
    temp: "Cool",
    index: "02",
    tagline: "Soft, cool and delicate",
    description:
      "Your cool undertone calls for softness. The 3 color fans bring the tones that soothe, with no contrast that weighs you down.",
    swatches: [
      { name: "Dusty rose", hex: "#c99aa6" },
      { name: "Mist blue", hex: "#9fb4ce" },
      { name: "Lavender", hex: "#b0a6c9" },
      { name: "Sage", hex: "#a9bba6" },
      { name: "Mauve", hex: "#cbb8c4" },
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
    name: "Autumn",
    temp: "Warm",
    index: "03",
    tagline: "Warm, deep and earthy",
    description:
      "Terracotta, foliage, antique gold — the colors of your warm undertone, ready to wear with confidence.",
    swatches: [
      { name: "Terracotta", hex: "#b5623c" },
      { name: "Olive", hex: "#8a7a3d" },
      { name: "Mustard", hex: "#c8993c" },
      { name: "Rust", hex: "#9c4a2e" },
      { name: "Moss", hex: "#566044" },
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
    name: "Winter",
    temp: "Cool",
    index: "04",
    tagline: "Cool, intense and high-contrast",
    description:
      "High contrast, pure colors — the tones of your cool undertone that give your skin presence.",
    swatches: [
      { name: "Carmine", hex: "#b0243b" },
      { name: "Emerald", hex: "#1e6e56" },
      { name: "Royal blue", hex: "#2e4a8a" },
      { name: "Magenta", hex: "#a02e6e" },
      { name: "Ink", hex: "#2a2733" },
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
    name: "Color Fans",
    kicker: "The colors",
    description:
      "The 12 seasonal color fans — your colors, ready to live with you.",
    image: PHOTO.flatDark,
  },
  {
    id: "guias",
    name: "Dossiers",
    kicker: "The repertoire",
    description:
      "The Niwa style dossier — learn to wear your colors from head to toe.",
    image: PHOTO.flatWarm,
  },
  {
    id: "formacao",
    name: "Collections",
    kicker: "The combinations",
    description:
      "Complete sets of color fans and dossier — plus the in-person consultation. The most complete path, at the best value.",
    image: PHOTO.bw,
  },
];

export const collectionById = (id: CollectionId) =>
  COLLECTIONS.find((c) => c.id === id) as Collection;

// --------------------------------- products --------------------------------

// preço unitário de cada cartela (US$) — ver documento de referência
export const CARTELA_PRICE = 49.99;
// preço unitário de cada dossiê de estação (US$)
export const DOSSIER_PRICE = 119.99;

// texto curto de vitrine por cartela (excerpt do card / topo do PDP)
const CARTELA_EXCERPTS: Record<string, string> = {
  "cartela-light-spring": "The light, warm and radiant tones of Spring — a lightness that lifts the skin.",
  "cartela-warm-spring": "The golden warmth of Spring in its purest state — vibrance without weight.",
  "cartela-bright-spring": "Spring at the height of its brilliance — clear colors, full of life.",
  "cartela-light-summer": "The cool lightness of Summer — soft tones that soothe and brighten.",
  "cartela-soft-summer": "Summer in smoky pastels — quiet, serene elegance.",
  "cartela-cool-summer": "The cool freshness of Summer — blues and pinks that refresh the skin.",
  "cartela-soft-autumn": "Autumn in muted, comforting tones — warmth without contrast.",
  "cartela-warm-autumn": "The earthy gold of Autumn — spices, foliage and amber.",
  "cartela-deep-autumn": "Deep, intense Autumn — warm richness in every tone.",
  "cartela-bright-winter": "Winter in high contrast and pure colors — instant presence.",
  "cartela-cool-winter": "The crystalline cool of Winter — icy, sharp tones.",
  "cartela-deep-winter": "Deep, dramatic Winter — intense, vibrant darks.",
};

// slugs atualmente esgotados (demo do estado "sold out")
const SOLD_OUT = new Set<string>(["cartela-deep-winter"]);

// consulta pública do estado "sold out" por slug (usada pelos seletores de cartela)
export const isSoldOut = (slug: string): boolean => SOLD_OUT.has(slug);

// 12 cartelas individuais — geradas a partir das 3 cartelas de cada estação.
// Cada uma tem slug/PDP próprio e capa em /capas/{slug}.jpg
const CARTELA_PRODUCTS: Product[] = SEASONS.flatMap((season) =>
  season.cartelas.map((c) => ({
    slug: c.slug,
    name: c.name,
    collection: "ferramentas" as const,
    format: "Physical" as const,
    price: CARTELA_PRICE,
    season: season.id,
    soldOut: SOLD_OUT.has(c.slug),
    excerpt: CARTELA_EXCERPTS[c.slug] ?? `A color fan from the ${season.name} season.`,
    description: [
      CARTELA_EXCERPTS[c.slug] ?? "",
      `One of the three color fans in the ${season.name} family, printed with high fidelity to the real colors — light and easy to carry wherever you go.`,
    ].filter(Boolean),
    features: [
      "High-durability materials",
      "Easy to handle, light and portable",
      "Printed with high fidelity to the real colors",
    ],
    includes: [`${c.name} color fan`, "Combination guide"],
  }))
);

// 4 dossiês — um por estação. Slug/PDP próprio; capa = /dossies/{id}.jpg (as
// mesmas capas coloridas da página de dossiês).
const DOSSIER_PRODUCTS: Product[] = SEASONS.map((s) => ({
  slug: `dossier-${s.name.toLowerCase()}`,
  name: `${s.name} Dossier`,
  collection: "guias" as const,
  format: "Physical" as const,
  price: DOSSIER_PRICE,
  season: s.id,
  image: `/dossies/${s.id}.jpg`,
  excerpt: `Your complete ${s.name} dossier — how to wear your colors from head to toe.`,
  description: [
    `The ${s.name} dossier gathers your season's color language and shows you, from head to toe, how to use it — colors and prints, accessories, makeup and hair.`,
    s.description,
  ],
  features: [
    "Hardcover with calibrated color plates",
    "Colors, prints, accessories, makeup and hair",
    "SmartTravel: looks and a packing checklist",
  ],
  includes: [`${s.name} dossier`, "Ribbon bookmark"],
}));

export const PRODUCTS: Product[] = [
  ...CARTELA_PRODUCTS,
  ...DOSSIER_PRODUCTS,
  {
    slug: "cartela-sazonal-12-subtons",
    name: "The Color Atlas — 12 Color Fans",
    collection: "formacao",
    format: "Physical",
    price: 599.88,
    badge: "Best seller",
    excerpt:
      "The 12 color fans of all four seasons together — the entire Niwa color language in a single set.",
    description: [
      "The 12 color fans — the three from Spring, Summer, Autumn and Winter — together, so you have the entire Niwa color language on hand, whatever your undertone.",
      "Printed with high fidelity to the real colors, light and easy to carry wherever you go. Perfect as a gift and for professionals.",
    ],
    features: [
      "The 12 color fans of all 4 seasons",
      "High-durability materials",
      "Printed with high fidelity to the real colors",
    ],
    includes: SEASONS.flatMap((s) => s.cartelas.map((c) => c.name)),
  },
  {
    slug: "seasonal-library",
    name: "The Seasonal Library — 4 Dossiers",
    collection: "formacao",
    format: "Physical",
    price: 479.96,
    excerpt:
      "All four season dossiers together — the complete head-to-toe method for every palette.",
    description: [
      "The four season dossiers — Spring, Summer, Autumn and Winter — gathered in one library, so the full Niwa method lives with you all year round.",
      "Colors and prints, accessories, makeup and hair — with SmartTravel looks and checklists in every volume.",
    ],
    image: "/guia/dossies.jpg",
    features: [
      "The 4 season dossiers",
      "Colors, prints, accessories, makeup and hair",
      "SmartTravel in every volume",
    ],
    includes: SEASONS.map((s) => `${s.name} Dossier`),
  },
  {
    slug: "signature",
    name: "The Signature — Color Fan + Dossier",
    collection: "formacao",
    format: "Physical",
    price: 161.98,
    compareAt: 179.98,
    badge: "Save 10%",
    excerpt:
      "Your season's color fan and dossier together — color and know-how, at 10% off.",
    description: [
      "The perfect start: your season's color fan paired with its dossier, so you can see your colors and learn to wear them from head to toe.",
      "Color and knowledge, together — with 10% off the pair.",
    ],
    image: "/capas/combo-cartelas-guia.jpg",
    features: [
      "1 color fan + 1 dossier for your season",
      "Colors, prints, accessories, makeup and hair",
      "10% off the pair",
    ],
    includes: ["Color fan for your season", "Dossier for your season"],
  },
  {
    slug: "complete-collection",
    name: "The Complete Collection — 12 Fans + 4 Dossiers",
    collection: "formacao",
    format: "Physical",
    price: 971.85,
    compareAt: 1079.84,
    badge: "Best value",
    excerpt:
      "Everything Niwa makes — the 12 color fans and all four dossiers, at 10% off.",
    description: [
      "The whole Niwa universe: the 12 color fans of all four seasons plus the four season dossiers — every color and the complete head-to-toe method.",
      "The most complete path to living in your colors, at 10% off the entire set.",
    ],
    image: "/capas/consultoria-completa.jpg",
    features: [
      "The 12 color fans of all 4 seasons",
      "The 4 season dossiers",
      "10% off the complete set",
    ],
    includes: [
      "The 12 color fans of all 4 seasons",
      "The 4 season dossiers",
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
