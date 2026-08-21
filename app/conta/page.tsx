import type { Metadata } from "next";
import AccountForm from "@/components/AccountForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Niwa account.",
};

export default function ContaPage() {
  return (
    <div className="flex min-h-[calc(100dvh-62px)] items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <p className="u-eyebrow">Your Niwa account</p>
        <h1 className="u-display mt-4 text-4xl md:text-5xl">
          Welcome
          <br />
          <em className="font-light italic u-accent">back.</em>
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">
          Sign in to track your orders and receive the news from every season.
        </p>
        <AccountForm />
      </div>
    </div>
  );
}
