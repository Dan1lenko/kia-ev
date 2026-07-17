import type { Metadata } from "next";
import HeroSection from "./_components/HeroSection";
import ExploreSection from "./_components/ExploreSection";
import ChargingBanner from "./_components/ChargingBanner";
import EvClubSection from "./_components/EvClubSection";
import OffersSection from "./_components/OffersSection";

export const metadata: Metadata = {
  title: "Головна",
  description:
    "Досліджуйте електромобілі KIA, знаходьте зарядні станції, купуйте аксесуари та порівнюйте автомобілі.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExploreSection />
      <ChargingBanner />
      <EvClubSection />
      <OffersSection />
    </>
  );
}
