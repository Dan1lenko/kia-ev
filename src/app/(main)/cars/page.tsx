import type { Metadata } from "next";
import CarTypesSection from "./_components/CarTypesSection";
import BrandsSection from "./_components/BrandsSection";
import SearchBar from "./_components/SearchBar";
import AdBanner from "./_components/AdBanner";

export const metadata: Metadata = {
  title: "Cars",
  description: "Browse electric vehicles by type and brand. Find your perfect EV.",
};

export default function CarsPage() {
  return (
    <div className="py-6 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SearchBar />
        <CarTypesSection />
        <BrandsSection />
        <AdBanner />
      </div>
    </div>
  );
}
