import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of Niwa and its products.",
};

const LAST_UPDATED = "October 2026";

export default function TermsPage() {
  return (
    <div className="u-container py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="u-eyebrow">Legal</p>
        <h1 className="u-display mt-4 text-4xl md:text-5xl">Terms of Use</h1>
        <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-ink-mute">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 text-ink-soft">
          <section>
            <p className="leading-relaxed">
              Welcome to Niwa. These terms govern your use of our website and the
              purchase of our products. By browsing or buying, you agree to them.
              Please read them carefully.
            </p>
          </section>

          <Section title="Our products">
            <p className="leading-relaxed">
              Niwa color fans and dossiers are physical products created to help
              you discover and wear your colors. Colors on screen may vary
              slightly from the printed fans due to display and lighting. Our
              content and products are for personal styling and self-knowledge,
              not professional or medical advice.
            </p>
          </Section>

          <Section title="Orders & payment">
            <ul className="space-y-2">
              <Bullet>
                Prices are shown in US dollars and may change at any time. Taxes
                and shipping are calculated at checkout.
              </Bullet>
              <Bullet>
                Placing an order is an offer to buy; we may accept or decline it
                — for example, if an item is out of stock or a pricing error
                occurs.
              </Bullet>
              <Bullet>
                Payment is handled securely by our payment provider.
              </Bullet>
            </ul>
          </Section>

          <Section title="Shipping, returns & exchanges">
            <p className="leading-relaxed">
              Delivery times, returns, and exchanges are described on our{" "}
              <Link href="/support/shipping" className="u-link text-ink">
                shipping
              </Link>{" "}
              and{" "}
              <Link href="/support/returns" className="u-link text-ink">
                returns
              </Link>{" "}
              pages, which form part of these terms.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p className="leading-relaxed">
              The Niwa name, logo, color system, texts, images, and designs
              belong to Niwa and are protected by law. You may not copy,
              reproduce, or use them without our written permission.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p className="leading-relaxed">
              Please use the site lawfully and respectfully. Don't attempt to
              disrupt it, access it without authorization, or use it to infringe
              anyone's rights.
            </p>
          </Section>

          <Section title="Disclaimers & liability">
            <p className="leading-relaxed">
              The site and products are provided "as is." To the extent permitted
              by law, Niwa is not liable for indirect or incidental damages
              arising from your use of the site or products. Nothing here limits
              rights you have under applicable consumer law.
            </p>
          </Section>

          <Section title="Changes">
            <p className="leading-relaxed">
              We may update these terms from time to time. The current version
              will always be posted here with the date above.
            </p>
          </Section>

          <Section title="Contact">
            <p className="leading-relaxed">
              Questions about these terms? Reach us at{" "}
              <a href="mailto:hello@niwa.example" className="u-link text-ink">
                hello@niwa.example
              </a>{" "}
              or via our{" "}
              <Link href="/support/accountct" className="u-link text-ink">
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="u-display text-2xl text-ink">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-marsala" />
      <span>{children}</span>
    </li>
  );
}
