"use client";

import { useState } from "react";
import { SEASONS } from "@/lib/catalog";

/**
 * "Deixe seu review" — formulário em 2 etapas. Protótipo: não envia pra lugar
 * nenhum, mostra estado de agradecimento ao final.
 *  Etapa 1: nome + email → Continuar
 *  Etapa 2: cartela · cidade · avaliação · fotos · nota → Voltar / Enviar
 */
const field =
  "w-full rounded-xs border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-mute focus:border-marsala focus:outline-none";
const label = "u-eyebrow block mb-2";

function Star({
  filled,
  ...props
}: { filled: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...props} className="p-0.5 text-marsala">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3Z" />
      </svg>
    </button>
  );
}

export default function ReviewForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const step1Ok = nome.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  if (sent) {
    return (
      <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-sm border border-line bg-paper p-10 text-center">
        <span className="font-display text-5xl text-marsala">✓</span>
        <h3 className="mt-4 font-display text-2xl text-ink">
          Obrigada pelo seu review!
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
          Este é um envio de demonstração. Na versão real, seu depoimento entraria
          na moderação antes de aparecer aqui.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-sm border border-line bg-paper p-7 md:p-9"
    >
      {/* indicador de etapa */}
      <p className="mb-6 text-[0.6rem] uppercase tracking-[0.24em] text-ink-mute">
        Etapa {step} de 2
      </p>

      {step === 1 ? (
        <>
          {/* nome */}
          <div>
            <label htmlFor="rv-nome" className={label}>
              Nome
            </label>
            <input
              id="rv-nome"
              className={field}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como quer aparecer"
            />
          </div>

          {/* email */}
          <div className="mt-5">
            <label htmlFor="rv-email" className={label}>
              E-mail
            </label>
            <input
              id="rv-email"
              className={field}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
            <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ink-mute">
              Seu e-mail não será divulgado — usamos só para confirmar a avaliação.
            </p>
          </div>

          <button
            type="button"
            onClick={() => step1Ok && setStep(2)}
            disabled={!step1Ok}
            className="group mt-7 inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar
            <span aria-hidden className="u-arrow">
              →
            </span>
          </button>
        </>
      ) : (
        <>
          {/* cartela + cidade */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="rv-cartela" className={label}>
                Cartela
              </label>
              <select id="rv-cartela" className={field} defaultValue="">
                <option value="" disabled>
                  Selecione a sua cartela
                </option>
                {SEASONS.map((s) => (
                  <optgroup key={s.id} label={s.name}>
                    {s.cartelas.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="nao-sei">Ainda não sei</option>
              </select>
            </div>
            <div>
              <label htmlFor="rv-cidade" className={label}>
                Cidade
              </label>
              <input id="rv-cidade" className={field} type="text" placeholder="Sua cidade" />
            </div>
          </div>

          {/* avaliação */}
          <div className="mt-5">
            <label htmlFor="rv-texto" className={label}>
              Avaliação
            </label>
            <textarea
              id="rv-texto"
              className={`${field} min-h-[7rem] resize-y`}
              required
              placeholder="Conte como as suas cores mudaram o seu dia a dia…"
            />
          </div>

          {/* arquivos */}
          <div className="mt-5">
            <label htmlFor="rv-fotos" className={label}>
              Fotos (opcional)
            </label>
            <label
              htmlFor="rv-fotos"
              className="flex cursor-pointer items-center gap-3 rounded-xs border border-dashed border-line px-4 py-3 text-sm text-ink-soft transition-colors hover:border-marsala"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              {files.length > 0
                ? `${files.length} ${files.length === 1 ? "foto selecionada" : "fotos selecionadas"}`
                : "Adicionar fotos das suas cores"}
            </label>
            <input
              id="rv-fotos"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
          </div>

          {/* nota — por último */}
          <div className="mt-6">
            <span className={label}>Sua nota</span>
            <div
              className="flex gap-1"
              onMouseLeave={() => setHover(0)}
              role="radiogroup"
              aria-label="Nota de 1 a 5"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  filled={n <= (hover || rating)}
                  onMouseEnter={() => setHover(n)}
                  onClick={() => setRating(n)}
                  aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
                  aria-pressed={n === rating}
                />
              ))}
            </div>
          </div>

          {/* ações — voltar + enviar */}
          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xs border border-line px-6 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="group inline-flex items-center gap-2.5 rounded-xs bg-marsala px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Enviar review
              <span aria-hidden className="u-arrow">
                →
              </span>
            </button>
          </div>
        </>
      )}
    </form>
  );
}
