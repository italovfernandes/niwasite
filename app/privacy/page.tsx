import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Niwa collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "October 2026";

export default function PrivacyPage() {
  return (
    <div className="u-container py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="u-eyebrow">Legal</p>
        <h1 className="u-display mt-4 text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-ink-mute">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 text-ink-soft">
          <section>
            <p className="leading-relaxed">
              At Niwa, your trust matters as much as your colors. This policy
              explains what information we collect, how we use it, and the
              choices you have. By using our site and services, you agree to the
              practices described here.
            </p>
          </section>

          <Section title="Information we collect">
            <ul className="space-y-2">
              <Bullet>
                <strong className="text-ink">You give us:</strong> name, email,
                shipping and billing address, and order details when you create
                an account, make a purchase, or sign up for our letter.
              </Bullet>
              <Bullet>
                <strong className="text-ink">Automatically:</strong> device,
                browser, and usage data (such as pages viewed) collected through
                cookies and similar technologies.
              </Bullet>
              <Bullet>
                <strong className="text-ink">Payments:</strong> card details are
                processed by our payment provider and are never stored on our
                servers.
              </Bullet>
            </ul>
          </Section>

          <Section title="How we use your information">
            <ul className="space-y-2">
              <Bullet>Process and deliver your orders.</Bullet>
              <Bullet>Provide support and respond to your requests.</Bullet>
              <Bullet>
                Send our letter and offers — only if you opted in, and you can
                unsubscribe at any time.
              </Bullet>
              <Bullet>
                Improve our products, site, and experience, and keep everything
                secure.
              </Bullet>
            </ul>
          </Section>

          <Section title="Cookies">
            <p className="leading-relaxed">
              We use essential cookies to run the site and the cart, and optional
              cookies to understand how the site is used. You can manage cookies
              in your browser settings; disabling some may affect how the site
              works.
            </p>
          </Section>

          <Section title="Sharing">
            <p className="leading-relaxed">
              We share information only with providers who help us operate — such
              as payment, shipping, and email partners — and only as needed to
              serve you. We never sell your personal information.
            </p>
          </Section>

          <Section title="Your rights">
            <p className="leading-relaxed">
              You can request access to, correction of, or deletion of your
              personal data, and object to certain uses. To exercise any of
              these rights, contact us at{" "}
              <a href="mailto:hello@niwa.example" className="u-link text-ink">
                hello@niwa.example
              </a>
              .
            </p>
          </Section>

          <Section title="Retention & security">
            <p className="leading-relaxed">
              We keep your information only as long as needed for the purposes
              above or as required by law, and we apply reasonable measures to
              protect it. No method of transmission is perfectly secure, but we
              work to keep your data safe.
            </p>
          </Section>

          <Section title="Changes">
            <p className="leading-relaxed">
              We may update this policy from time to time. We'll post the new
              version here and update the date above.
            </p>
          </Section>

          <Section title="Contact">
            <p className="leading-relaxed">
              Questions about your privacy? Write to us at{" "}
              <a href="mailto:hello@niwa.example" className="u-link text-ink">
                hello@niwa.example
              </a>{" "}
              or through our{" "}
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
