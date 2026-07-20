import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import CartelasSkyHero from "@/components/backup/CartelasSkyHeroBackup";
import CartelasJourney from "@/components/backup/CartelasJourneyBackup";
import ModosRotina from "@/components/backup/ModosRotina";
import { SEASONS, productBySlug } from "@/lib/catalog";

type CenarioIconName = "utensils" | "basket" | "package" | "shirt" | "tag";

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
    utensils: (
      <>
        <path d="M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2" {...p} />
        <path d="M7 2v20" {...p} />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" {...p} />
      </>
    ),
    basket: (
      <>
        <path d="m5 11 4-7M19 11l-4-7M2 11h20" {...p} />
        <path
          d="m4 11 1.6 7.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L20 11"
          {...p}
        />
        <path d="M9 15v2M15 15v2" {...p} />
      </>
    ),
    package: (
      <>
        <path d="m7.5 4.3 9 5.2" {...p} />
        <path
          d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
          {...p}
        />
        <path d="M3.3 7 12 12l8.7-5M12 22V12" {...p} />
      </>
    ),
    shirt: (
      <path
        d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2Z"
        {...p}
      />
    ),
    tag: (
      <>
        <path
          d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4Z"
          {...p}
        />
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
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
  {
    title: "Ajude quem você ama",
    text: "Filhos, marido e família também aprendem com você.",
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

const CENARIOS: { label: string; icon: CenarioIconName }[] = [
  { label: "Jantar de última hora", icon: "utensils" },
  { label: "Looks preferidos no cesto", icon: "basket" },
  { label: "A compra online não chegou", icon: "package" },
  { label: "Closet cheio, nada pra usar", icon: "shirt" },
  { label: "Vale a pena a promoção?", icon: "tag" },
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

      {/* ===== LEVEZA — foto full-bleed + wordmark gigante ===== */}
      <section className="relative overflow-hidden bg-[#efeae4]">
        <Image
          src="/cartelas/leveza.jpg"
          alt="Mulher em vestido esvoaçante de tons pastel entre flores"
          width={3632}
          height={2000}
          sizes="100vw"
          className="h-auto w-full"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[5%] text-center font-display font-light italic u-accent"
          style={{
            fontSize: "40vw",
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
          }}
        >
          Leveza
        </span>
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
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
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

      {/* ===== PRODUTO — as 4 cartelas ===== */}
      <section id="cartelas-sazonais" className="u-section scroll-mt-24">
        <div className="u-container">
          <Reveal className="max-w-2xl">
            <p className="u-eyebrow">As 4 cartelas</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Esteja com elas em
              <br />
              <em className="font-light italic u-accent">todas as estações.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {SEASONS.map((season, i) => {
              const product = productBySlug(`cartela-${season.id}`);
              if (!product) return null;
              return (
                <Reveal key={season.id} delay={(i % 4) * 80}>
                  <ProductCard product={product} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BANDA ESCURA — como funciona (foto + marca tom sobre tom) ===== */}
      <section
        data-nav-dark
        className="u-section relative overflow-hidden bg-plum text-paper"
      >
        <Image
          src="/cartelas/como-funciona.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
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
            <p className="u-eyebrow !text-[#C295D9]/70">Cenários do dia a dia</p>
            <h2 className="u-display mt-4 text-5xl md:text-6xl">
              Em qualquer ocasião,
              <br />a{" "}
              <em className="font-light italic u-accent">
                liberdade te chama.
              </em>
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
                  <span className="text-base font-medium leading-snug text-paper md:text-lg">
                    {c.label}
                  </span>
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
              Seu guarda-roupa mágico,
              <br />
              como em <em className="font-light italic u-accent">Nárnia.</em>
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
