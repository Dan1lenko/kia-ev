import type { Metadata } from "next";
import HeroSection from "./_components/HeroSection";
import ExploreSection from "./_components/ExploreSection";
import ChargingBanner from "./_components/ChargingBanner";
import EvClubSection from "./_components/EvClubSection";
import OffersSection from "./_components/OffersSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore KIA electric vehicles, find charging stations, shop accessories and compare cars.",
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
