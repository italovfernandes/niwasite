import type { Metadata } from "next";
import CartelasLandingBackup from "@/components/backup/CartelasLandingBackup";

// Backup congelado da página Cartelas sazonal (snapshot 18/07/2026).
// Rota NÃO linkada em lugar nenhum e marcada noindex — só acessível pela URL.
export const metadata: Metadata = {
  title: "Cartelas — Backup",
  robots: { index: false, follow: false },
};

export default function CartelasBackupPage() {
  return <CartelasLandingBackup />;
}
