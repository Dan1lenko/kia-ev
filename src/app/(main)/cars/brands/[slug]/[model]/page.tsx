import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarByBrandAndSlug, brands } from "@/lib/mockCars";
import VariantsCarousel from "./_components/VariantsCarousel";

interface ModelVariantsPageProps {
  params: Promise<{ slug: string; model: string }>;
}

export async function generateMetadata({
  params,
}: ModelVariantsPageProps): Promise<Metadata> {
  const { slug, model } = await params;
  const car = getCarByBrandAndSlug(slug, model);
  if (!car) return { title: "Model Not Found" };
  return {
    title: `${car.name} Variants`,
    description: `Explore ${car.name} variants and color options. Starting from $${car.price.toLocaleString()}.`,
  };
}

export function generateStaticParams() {
  return brands.flatMap((brand) =>
    brand.models.map((model) => ({
      slug: brand.slug,
      model: model.slug,
    }))
  );
}

export default async function ModelVariantsPage({
  params,
}: ModelVariantsPageProps) {
  const { slug, model } = await params;
  const car = getCarByBrandAndSlug(slug, model);
  if (!car) notFound();

  return <VariantsCarousel car={car} />;
}
