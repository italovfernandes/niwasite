"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/support/shipping", label: "Shipping and timelines" },
  { href: "/support/returns", label: "Returns and refunds" },
  { href: "/support/accountct", label: "Talk to Niwa" },
];

export default function AtendimentoNav() {
  const pathname = usePathname();
  return (
    <nav className="mt-7 flex flex-wrap gap-2 border-b border-line pb-6">
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-xs px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.18em] transition-colors ${
              active
                ? "bg-ink text-paper"
                : "border border-line text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
