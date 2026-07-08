import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/mockCars";
import BookSlotClient from "./_components/BookSlotClient";

interface BookSlotPageProps {
  params: Promise<{ carId: string }>;
  searchParams: Promise<{ dealer?: string }>;
}

export async function generateMetadata({
  params,
}: BookSlotPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) return { title: "Booking Not Found" };
  return {
    title: `Book Slot for ${car.name}`,
    description: `Book a test drive slot or showroom visit for ${car.name}.`,
  };
}

export default async function BookSlotPage({
  params,
  searchParams,
}: BookSlotPageProps) {
  const { carId } = await params;
  const { dealer } = await searchParams;
  const car = getCarById(carId);
  if (!car) notFound();

  return <BookSlotClient car={car} initialDealerId={dealer} />;
}
