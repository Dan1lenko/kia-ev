import type { Metadata } from "next";
import NetworkClient from "./_components/NetworkClient";

export const metadata: Metadata = {
  title: "EV Charging Network",
  description: "Find and navigate to the nearest electric vehicle charging stations.",
};

export default function NetworkPage() {
  return <NetworkClient />;
}
