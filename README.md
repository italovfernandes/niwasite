# Niwa — Casa de Coloração Pessoal

Site institucional e loja da **Niwa**, marca de coloração pessoal (colorimetria).
Protótipo de alta fidelidade: hero em vídeo, jornada editorial por scroll,
cartelas das 4 estações, guias de estilo, consultoria e carrinho mock.

## Stack

- **Next.js 16** (App Router, React 19, Server Components)
- **TypeScript**
- **Tailwind CSS v4** (tokens em `app/globals.css`)
- Animações de scroll com **rAF + getBoundingClientRect** (imperativo)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build   # build de produção
npm run start   # servir o build de produção
npm run lint    # eslint
```

## Estrutura

```
app/            rotas (App Router): home, produto, guias, loja, sobre,
                partnership, atendimento, conta, busca
components/     componentes de UI e seções (Nav, Footer, heros, sequências…)
lib/            catálogo de produtos, estações e estado do carrinho
public/         imagens, vídeos e ícones da marca
```

## Design system

Tokens de cor, tipografia e ritmo estão em `app/globals.css` (`@theme`).
As diretrizes de composição e a régua de qualidade estão em
[`CLAUDE.md`](./CLAUDE.md). Notas específicas desta versão do Next em
[`AGENTS.md`](./AGENTS.md).

---

Protótipo de demonstração — checkout, login e busca não estão conectados a
back-end.
