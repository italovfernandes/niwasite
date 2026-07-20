"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/catalog";

const FREE_SHIPPING = 600;

export default function CartDrawer() {
  const { items, isOpen, closeCart, remove, setQty, subtotal, clear, count } =
    useCart();
  const [confirmed, setConfirmed] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  function checkout() {
    setConfirmed(true);
  }
  function handleClose() {
    closeCart();
    window.setTimeout(() => setConfirmed(false), 300);
  }

  return (
    <>
      {/* scrim */}
      <div
        onClick={handleClose}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] bg-espresso/45 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
        className={`fixed right-0 top-0 z-[61] flex h-dvh w-full max-w-[26rem] flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-7 pb-5 pt-7">
          <div>
            <p className="u-eyebrow">Sua sacola</p>
            <p className="u-display mt-1 text-2xl text-ink">
              {count} {count === 1 ? "item" : "itens"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar sacola"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="font-display text-5xl text-marsala">✓</span>
            <h3 className="font-display text-2xl text-ink">Pedido registrado</h3>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Este é um checkout de demonstração — nenhum pagamento foi
              processado. É aqui que entraria a finalização real da compra.
            </p>
            <button
              type="button"
              onClick={() => {
                clear();
                handleClose();
              }}
              className="mt-2 rounded-xs bg-marsala px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-paper hover:bg-marsala-deep"
            >
              Voltar à loja
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-display text-2xl text-ink">Sua sacola está vazia</p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              As cores certas começam pelas ferramentas certas.
            </p>
            <Link
              href="/loja"
              onClick={handleClose}
              className="mt-1 rounded-xs border border-ink px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Explorar a loja
            </Link>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="px-7 pb-5">
              <p className="text-[0.8rem] leading-relaxed text-ink-soft">
                {remaining > 0 ? (
                  <>
                    Faltam{" "}
                    <span className="font-medium text-ink">
                      {formatBRL(remaining)}
                    </span>{" "}
                    para o frete cortesia.
                  </>
                ) : (
                  <span className="font-medium text-ink">
                    Você ganhou frete cortesia ✦
                  </span>
                )}
              </p>
              <div className="mt-2.5 h-px w-full bg-line">
                <div
                  className="h-px bg-marsala transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* items */}
            <ul className="flex-1 divide-y divide-line/70 overflow-y-auto border-t border-line/70 px-7">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-5 py-6">
                  <Link
                    href={`/produto/${item.slug}`}
                    onClick={handleClose}
                    className="relative aspect-[4/5] w-[4.5rem] shrink-0 overflow-hidden rounded-xs bg-paper-deep"
                  >
                    <Image
                      src={`/capas/${item.slug}.jpg`}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/produto/${item.slug}`}
                        onClick={handleClose}
                        className="u-display min-w-0 text-[1.05rem] leading-tight text-ink u-link"
                      >
                        {item.name}
                      </Link>
                      <span className="shrink-0 text-sm tabular-nums text-ink">
                        {formatBRL(item.price * item.qty)}
                      </span>
                    </div>
                    <span className="mt-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-ink-mute">
                      {item.format}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-1 text-ink-soft">
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          aria-label="Diminuir quantidade"
                          className="grid h-7 w-7 place-items-center rounded-full text-base transition-colors hover:bg-paper-deep hover:text-ink"
                        >
                          –
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums text-ink">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          aria-label="Aumentar quantidade"
                          className="grid h-7 w-7 place-items-center rounded-full text-base transition-colors hover:bg-paper-deep hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.slug)}
                        className="text-[0.58rem] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-marsala"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="border-t border-line px-7 pb-7 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-ink-mute">
                  Subtotal
                </span>
                <span className="u-display text-3xl text-ink tabular-nums">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-[0.68rem] text-ink-mute">
                Impostos e frete calculados na finalização.
              </p>
              <button
                type="button"
                onClick={checkout}
                className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-xs bg-marsala py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper transition-[background-color,transform] duration-300 hover:bg-marsala-deep active:scale-[0.99]"
              >
                Finalizar compra
                <span aria-hidden className="u-arrow">
                  →
                </span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
