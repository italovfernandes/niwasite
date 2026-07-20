# CROMÀ — Atelier de Coloração Pessoal

E-commerce editorial (protótipo de demonstração) para uma marca de coloração
pessoal: cartelas, leques, guias e formação para profissionais que trabalham a
cor pelo subtom de pele e pelas estações.

Feito com **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**.

## Como rodar

```bash
cd croma
npm install      # (já instalado)
npm run dev      # abre em http://localhost:3000
```

Para gerar a versão de produção: `npm run build && npm run start`.

## Estrutura

```
app/
  layout.tsx              # fontes, providers, nav, footer, drawer
  page.tsx                # HOME (hero, estações, coleções, método, CTA…)
  loja/page.tsx           # LOJA com filtro por coleção (?c=)
  produto/[slug]/page.tsx # página de produto
  sobre/page.tsx          # o atelier
  globals.css             # tokens de cor, tipografia e o "leque"
components/                # Nav, Footer, CartDrawer, ProductCard, ColorFan…
lib/
  catalog.ts              # ⬅ TODO o conteúdo: produtos, estações, coleções
  cart.tsx                # carrinho (estado + localStorage)
```

## Onde trocar as coisas

- **Marca / nome / textos** — a maior parte do texto vive em `lib/catalog.ts`
  (produtos, estações, coleções) e nas páginas em `app/`. O nome "CROMÀ" aparece
  em `components/Nav.tsx` e `components/Footer.tsx`.
- **Produtos** — edite o array `PRODUCTS` em `lib/catalog.ts` (nome, preço,
  descrição, coleção, itens inclusos). As páginas se geram sozinhas a partir dele.
- **Estações e paletas** — array `SEASONS` em `lib/catalog.ts`. Os hexadecimais
  também estão espelhados em `app/globals.css` (bloco `@theme`).
- **Cores da marca** — `app/globals.css`, bloco `@theme` (`--color-paper`,
  `--color-ink`, `--color-marsala`, etc.).
- **Imagens** — hoje usam fotos do Unsplash (definidas por ID em `lib/catalog.ts`,
  objeto `PHOTO` e campo `image` de cada estação/coleção). Quando você subir as
  suas fotos: coloque-as em `public/` e troque as URLs pelas locais
  (ex.: `/fotos/hero.jpg`). Se mantiver imagens externas de outro domínio,
  adicione o host em `next.config.ts` → `images.remotePatterns`.
- **Arte dos produtos** — as composições de cor de cada produto são geradas por
  código em `components/ProductArt.tsx` (é de propósito: os produtos *são* cor).
  Se preferir fotos reais dos produtos, dá para trocar esse componente por
  `next/image`.

## Observações

- O carrinho é **mock**: adiciona/remove/soma e persiste no navegador, mas o
  "Finalizar compra" apenas mostra uma confirmação de demonstração — não há
  gateway de pagamento. É o ponto onde entraria Stripe/Mercado Pago.
- Acessibilidade: foco visível, `prefers-reduced-motion` respeitado, contraste
  AA nos textos, navegação por teclado.
