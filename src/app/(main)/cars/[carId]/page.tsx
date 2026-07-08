import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarById, getAllCars } from "@/lib/mockCars";
import CarDetailView from "./_components/CarDetailView";

interface CarDetailPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) return { title: "Car Not Found" };
  return {
    title: car.name,
    description: `${car.name} starting from $${car.price.toLocaleString()}. ${car.description}`,
  };
}

export function generateStaticParams() {
  return getAllCars().map((car) => ({ carId: car.id }));
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) notFound();

  return <CarDetailView car={car} />;
}
