@AGENTS.md

# NIWA — Sistema de Design (regra permanente, não sugestão)

> **Antes de criar QUALQUER seção nova, releia este documento.** Se o resultado
> que você está prestes a gerar puder ser confundido com um template genérico de
> SaaS/produto, **pare e reconsidere a composição.**

Fontes de verdade: tokens em `app/globals.css` (`@theme`); componentes de padrão
em `components/patterns/`. **Não desenhar cada seção do zero — compor os padrões.**

---

## 1. Cor — DOIS sistemas que NÃO se misturam

**A) UI/chrome do site (restrito a 3–5 cores, consistente em todo o site):**
- Fundo: `paper #f3eee6`, `paper-deep #ece4d7` (alt), bandas escuras `plum #2e113d` / `espresso #1c1712`
- Texto: `ink #26201b`, `ink-soft #5a5049`, `ink-mute #6e6256`; sobre escuro → `paper`
- Acento/CTA: `marsala #52156e` (hover `marsala-deep #3b0f52`); `#C295D9` (lilás) SÓ como realce sobre plum
- Linha/hairline: `line #d8cdbb`

**B) Paleta das 12 subestações** (spring/summer/autumn/winter × 3 subtons): é
**CONTEÚDO DE PRODUTO** (as cores das cartelas), não decoração. Aparece **apenas**
quando o produto é mostrado (grid/leque de cartelas, indicadores de estação, cards
de estação). **NUNCA** vira cor de botão, fundo de seção aleatório, ou qualquer
elemento de UI que não seja literalmente sobre as cores do produto.

## 2. Tipografia

- **Display: Operetta 18** — via `--font-display` / `.u-display`. Serifada, títulos.
- **Corpo / micro-labels: Funnel Sans** — via `--font-sans`.
- _(Implementação atual usa Fraunces + Hanken Grotesk como stand-ins até os
  arquivos reais entrarem — trocar é pendência, mas SEMPRE referenciar via as
  variáveis `--font-display`/`--font-sans`, nunca fonte de sistema.)_
- Hierarquia por **escala + peso**. Regra: texto ≤ 18px usa a sans.

## 3. Espaçamento, raio, botões, sombras

- Container: `.u-container` (max 84rem; padding 1.5rem / md 2.5rem).
- Raio: `xs 2px`, `sm 4px`.
- Botão primário: `bg-marsala text-paper` uppercase `tracking-[0.22em]` `rounded-xs`
  ~0.72rem, hover `marsala-deep` (só cor, sem lift/glow). Terciário: link com underline.
- **SEM SOMBRAS** (`box-shadow`/`text-shadow`/`drop-shadow`) em nada. Para
  legibilidade sobre foto usar **scrim/gradiente**, nunca text-shadow.

## 4. Regras estruturais do sistema aprovado

- **Fotografia SANGRA a composição / quebra a grade** — nunca emoldurada num
  retângulo limpo ao lado do texto por padrão.
- **Elementos (chips, badges, dados) SOBREPÕEM a foto em ângulo** — não ficam
  organizados ao lado dela.
- **Tipografia gigante como textura/wordmark**: usar com moderação — **2 a 3
  seções no máximo por página**, não em todas.
- **Assinatura recorrente**: arco / linha fina com nó, ecoando o leque de cartelas
  do hero.
- **Grão + grading de cor quente** sobre as fotos; atmosfera consistente
  (onírico, técnico, editorial).

## 5. Ritmo — RESTRIÇÃO, não densidade constante

Nem toda seção deve ser densa. O padrão é **ALTERNÂNCIA de ritmo**:

- Uma seção com **UM** movimento visual forte e específico (tipografia gigante
  ocupando o hero como wordmark; ou foto full-bleed com um único headline)
- **seguida de** uma seção de **respiro** (bastante espaço em branco, um elemento
  pequeno, sem sobreposição).

**Regra prática: cada seção tem UM movimento de destaque — não uma coleção de
todos os recursos do sistema aplicados de uma vez.** Empilhar tudo (foto sangrando
+ chips + textura ao mesmo tempo) é tão errado quanto o genérico — barulho em vez
de vazio.

## 6. Proibições (é exatamente isto que está vazando)

- ❌ Olho de texto (eyebrow com travessão + CAIXA ALTA) como header **default de
  toda seção**.
- ❌ Cards numerados idênticos quando a informação **não** é uma lista neutra.
- ❌ Grid quadrado plano de imagens quando o motivo de marca é o leque/arco.
- ❌ Fundo creme chapado + conteúdo centralizado + ícone pequeno + texto e botão
  empilhados (o padrão genérico de SaaS).
- ❌ Animação "AOS fade-up" genérica — usar a coreografia definida (timing
  específico por elemento, curvas de easing diferenciadas).

## 7. Componentes de padrão (compor, não reinventar) — `components/patterns/`

- `BleedPhotoChips` — foto sangrando + chips sobrepostos em ângulo _(moderação)_.
- `GiantTypeHero` / `TypeTextureSection` — tipografia gigante/textura.
- `ArcMotifSection` — motivo arco/leque de assinatura.
- `PhotoPill` — pill pequeno: foto circular + label (ref. "Oily/Dry/Combination
  skin") — versão contida do chip, para seções de respiro.
- `TestimonialCarousel` — paginação "01/05" + setas finas.

Toda seção nova = composição desses padrões com conteúdo/imagem diferentes.

## 8. Barra de qualidade — "The $10K Checklist" (toda página passa nisto)

1. **Ponto de vista, não template** — compromete com a direção NIWA (onírico,
   técnico, editorial) sem ficar em cima do muro.
2. **Tipografia que trabalha** — Operetta 18 + Funnel Sans carregando a
   hierarquia por escala/peso, nunca fonte de sistema.
3. **Cor restrita** — ver §1 (UI 3–5 cores; paleta das 12 é conteúdo de produto).
4. **Hierarquia que respira** — ver §5; nunca uma parede plana de conteúdo.
5. **Imagens com intenção** — acervo real da marca (`Branding/`), nunca cara de
   banco de imagem genérico.
6. **Movimento sutil, não fade-up** — coreografia definida, não a lib genérica.
7. **Mobile DESENHADO, não encolhido** — cada seção principal tem uma decisão de
   composição própria para mobile (apresentar por seção antes de implementar;
   atenção redobrada em parallax/scroll-scrubbing).
8. **A parte invisível cara** — load rápido, contraste WCAG AA, HTML semântico,
   meta tags reais.
