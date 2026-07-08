import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/mockCars";
import SelectDistributorClient from "./_components/SelectDistributorClient";

interface SelectDistributorPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: SelectDistributorPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) return { title: "Distributor Not Found" };
  return {
    title: `Select Distributor for ${car.name}`,
    description: `Choose your preferred showroom and distributor for ${car.name}.`,
  };
}

export default async function SelectDistributorPage({
  params,
}: SelectDistributorPageProps) {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) notFound();

  return <SelectDistributorClient car={car} />;
}
