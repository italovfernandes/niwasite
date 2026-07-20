import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BackToTop from "@/components/BackToTop";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Niwa — Casa de Coloração Pessoal",
    template: "%s · Niwa",
  },
  description:
    "Cartelas Niwa, descubra seu estilo. Cartelas, leques e formação em coloração pessoal — a cor pelo subtom de pele e pelas estações.",
  metadataBase: new URL("https://niwa.example"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <CartProvider>
          <Nav />
          <main className="flex-1 pt-[62px]">{children}</main>
          <Footer />
          <CartDrawer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
