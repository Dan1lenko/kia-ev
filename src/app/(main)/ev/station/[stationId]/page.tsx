import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStationById, mockStations } from "@/lib/mockStations";
import StationDetailClient from "./_components/StationDetailClient";

interface StationDetailPageProps {
  params: Promise<{ stationId: string }>;
}

export async function generateMetadata({
  params,
}: StationDetailPageProps): Promise<Metadata> {
  const { stationId } = await params;
  const station = getStationById(stationId);
  if (!station) return { title: "Station Not Found" };
  return {
    title: station.name,
    description: `Book charging slot at ${station.name}. ${station.address}.`,
  };
}

export function generateStaticParams() {
  return mockStations.map((s) => ({ stationId: s.id }));
}

export default async function StationDetailPage({
  params,
}: StationDetailPageProps) {
  const { stationId } = await params;
  const station = getStationById(stationId);
  if (!station) notFound();

  return <StationDetailClient station={station} />;
}
