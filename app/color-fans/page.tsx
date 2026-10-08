import type { Metadata } from "next";
import CartelasLanding from "@/components/backup/CartelasLandingBackup";

export const metadata: Metadata = {
  title: "Color Fans",
  description:
    "The Niwa color fans — practical, easy to use, and truly yours. Discover your colors and wear only what lights you up.",
};

export default function ColorFansPage() {
  return <CartelasLanding />;
}
