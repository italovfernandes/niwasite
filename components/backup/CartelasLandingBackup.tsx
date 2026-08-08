import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import CartelasSkyHero from "@/components/backup/CartelasSkyHeroBackup";
import CartelasJourney from "@/components/backup/CartelasJourneyBackup";
import ModosRotina from "@/components/backup/ModosRotina";
import { SEASONS, productBySlug } from "@/lib/catalog";

type CenarioIconName =
  | "palette"
  | "makeup"
  | "lips"
  | "accessories"
  | "travel";

function CenarioIcon({
  name,
  className = "h-[18px] w-[18px] text-marsala",
}: {
  name: CenarioIconName;
  className?: string;
}) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<CenarioIconName, React.ReactNode> = {
    palette: (
      <path d="M12 3s6 5.5 6 10a6 6 0 0 1-12 0c0-4.5 6-10 6-10Z" {...p} />
    ),
    makeup: (
      <>
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" {...p} />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" {...p} />
      </>
    ),
    lips: (
      <>
        <path d="M3 9c2-2 5-2 9 0 4-2 7-2 9 0-2 4-5 6-9 6S5 13 3 9Z" {...p} />
        <path d="M3 9h18" {...p} />
      </>
    ),
    accessories: (
      <>
        <path d="M6 8h12l-1 12.5H7L6 8Z" {...p} />
        <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" {...p} />
      </>
    ),
    travel: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="2" {...p} />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" {...p} />
        <path d="M9 11v5M15 11v5" {...p} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden>
      {paths[name]}
    </svg>
  );
}

const POR_QUE = [
  "Quanto mais você usa, mais aprende a usar",
  "Descubra sempre novas combinações",
  "Cores e combinações com validade técnica",
];

const RECURSOS = [
  {
    title: "Autoconhecimento",
    text: "Um espelho para entender as suas cores — e, com elas, um pouco mais de você.",
  },
  {
    title: "Compartilhe",
    text: "Ajude suas amigas a descobrirem as próprias cores e combinações.",
  },
];

const ECON_RECURSOS = [
  "Menos compras motivadas só por tendência",
  "Maior taxa de uso por peça adquirida",
  "Menos dinheiro parado em roupas esquecidas",
];
const ECON_TEMPO = [
  "Menos tempo experimentando o que não combina",
  "Decisões mais rápidas na hora de se vestir",
  "Compras mais objetivas, menos indecisão",
];

const CENARIOS: { label: string; desc?: string; icon: CenarioIconName }[] = [
  { label: "+ de 80 cores por estação", icon: "palette" },
  { label: "Cabelos & Maquiagem", icon: "makeup" },
  {
    label: "ColorKiss",
    desc: "Teste em acrílico de batom — exclusividade Niwa.",
    icon: "lips",
  },
  { label: "Acessórios & Estampas", icon: "accessories" },
  {
    label: "SmartTravel",
    desc: "Looks e checklist de viagem.",
    icon: "travel",
  },
];

// bento: mobile = coluna única; md = 1 box largo em cima + 3 embaixo (grid de 6)
const CENARIO_SPANS = [
  "col-span-2 md:col-span-4",
  "col-span-2 md:col-span-2",
  "col-span-2 md:col-span-2",
  "col-span-2 md:col-span-2",
  "col-span-2 md:col-span-2",
];

export default function CartelasLandingBackup() {
  return (
    <div>
      {/* ===== HERO — céu + leque das cartelas ===== */}
      <CartelasSkyHero />

      {/* ===== JORNADA — vídeo scrub: filosofia sobre o céu, dê adeus sobre o campo ===== */}
      <CartelasJourney />

      {/* ===== POR QUE USAR — split plum + foto ===== */}
      <section className="grid bg-plum text-paper md:min-h-screen md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-0 lg:px-20">
          <Reveal className="max-w-md">
            <p className="u-eyebrow !text-[#C295D9]/70">Por que usar</p>
            <h2 className="u-display mt-6 text-5xl leading-[1.05] md:text-6xl">
              Com as cartelas Niwa,
              <br />
              se vestir{" "}
              <em className="font-light italic u-accent">vira prazer</em>
            </h2>
            <ul className="mt-12 border-b border-paper/15">
              {POR_QUE.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-5 border-t border-paper/15 py-5"
                >
                  <span className="font-display text-lg italic text-[#C295D9]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-paper/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="relative min-h-[62vh] md:min-h-screen">
          <Image
            src="/cartelas/vira-prazer.jpg"
            alt="Mulher se arrumando ao espelho com o leque de cores Niwa"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ===== MAIS RECURSOS — plum, numerado ===== */}
      <section data-nav-dark className="u-section bg-plum text-paper">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow !text-[#C295D9]/70">Mais recursos</p>
            <h2 className="u-display mt-6 text-5xl md:text-6xl">
              Para expandir sua
              <br />
              experiência de{" "}
              <em className="font-light italic u-accent">viver.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {RECURSOS.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <div className="border-t border-paper/15 pt-6">
                  <span className="font-display text-lg italic text-[#C295D9]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-[#C295D9]">
                    {r.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-paper/65">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUTO — as 12 cartelas, agrupadas por estação ===== */}
      <section id="cartelas-sazonais" className="u-section scroll-mt-24">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow">As 12 cartelas</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Esteja com elas em
              <br />
              <em className="font-light italic u-accent">todas as estações.</em>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-14">
            {SEASONS.map((season) => (
              <div key={season.id}>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <h3 className="u-display text-2xl md:text-3xl">{season.name}</h3>
                  <span className="text-[0.58rem] uppercase tracking-[0.2em] text-ink-mute">
                    {season.temp} · 3 cartelas
                  </span>
                </div>
                <div className="-mx-6 mt-7 flex snap-x gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
                  {season.cartelas.map((c, i) => {
                    const product = productBySlug(c.slug);
                    if (!product) return null;
                    return (
                      <Reveal
                        key={c.slug}
                        delay={(i % 3) * 80}
                        className="w-[64vw] shrink-0 snap-start sm:w-[300px]"
                      >
                        <ProductCard product={product} />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANDA ESCURA — como funciona (mobile: preto sólido; desktop: foto) ===== */}
      <section
        data-nav-dark
        className="u-section relative overflow-hidden bg-black text-paper"
      >
        <Image
          src="/cartelas/como-funciona.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        {/* overlay preto — contraste do texto */}
        <div aria-hidden className="absolute inset-0 bg-black/60" />
        <div className="u-container relative">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow !text-paper/55">Como funciona</p>
            <h2 className="u-display mt-4 text-4xl md:text-5xl">
              Tão simples que
              <br />
              parece <em className="font-light italic u-accent">mágica.</em>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-paper/70">
              Uma imersão que alia autoconhecimento, dinamismo e técnica. Economize
              tempo, potencialize seus looks, ganhe segurança.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            {[
              { title: "Economize recursos", items: ECON_RECURSOS },
              { title: "Economize tempo", items: ECON_TEMPO },
            ].map((col, ci) => (
              <Reveal key={col.title} delay={ci * 100}>
                <h3 className="border-b border-paper/15 pb-4 font-display text-2xl italic">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3 text-paper/80">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#C295D9]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CENÁRIOS — bento grid sobre plum ===== */}
      <section data-nav-dark className="u-section bg-plum text-paper">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow !text-[#C295D9]/70">Recursos</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Cartelas únicas
              <br />e <em className="font-light italic u-accent">práticas.</em>
            </h2>
          </Reveal>

          <ul className="mt-14 grid auto-rows-[minmax(190px,1fr)] grid-cols-2 gap-4 md:grid-cols-6">
            {CENARIOS.map((c, i) => (
              <Reveal
                as="li"
                key={c.label}
                delay={i * 80}
                className={CENARIO_SPANS[i]}
              >
                <div className="group flex h-full flex-col justify-between rounded-sm border border-paper/15 p-7 transition-colors hover:border-[#C295D9]/50 hover:bg-white/[0.04] md:p-8">
                  <CenarioIcon
                    name={c.icon}
                    className="h-8 w-8 text-[#C295D9] md:h-9 md:w-9"
                  />
                  <div>
                    <span className="block text-base font-medium leading-snug text-paper md:text-lg">
                      {c.label}
                    </span>
                    {c.desc && (
                      <span className="mt-1.5 block text-sm leading-relaxed text-paper/55">
                        {c.desc}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== DENSO — 4 pilares (filmstrip horizontal no scroll) ===== */}
      <ModosRotina />

      {/* ===== FECHO — imagem full-bleed + texto sobreposto ===== */}
      <section
        data-nav-dark
        className="relative flex min-h-screen items-center overflow-hidden bg-plum text-paper"
      >
        <Image
          src="/cartelas/guarda-roupa.jpg"
          alt="Closet organizado com roupas dispostas por cor"
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        {/* scrim — legibilidade do texto à esquerda (não é sombra) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"
        />

        <div className="u-container relative py-24 md:py-0">
          <Reveal className="max-w-3xl">
            <p className="u-eyebrow !text-[#C295D9]/80">
              Organização gera possibilidades.
            </p>
            <h2 className="u-display mt-6 text-5xl leading-[1.05] md:text-6xl">
              Seu guarda-roupa mais
              <br />
              <em className="font-light italic u-accent">funcional do que nunca.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">
              O preço de uma t-shirt básica. O potencial de um{" "}
              <em className="italic text-[#C295D9]">guarda-roupa inteiro.</em>
            </p>
            <Link
              href="#cartelas-sazonais"
              className="mt-9 inline-block self-start rounded-xs bg-paper px-9 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-marsala transition-colors hover:bg-[#C295D9] hover:text-plum"
            >
              Escolher minha estação
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
