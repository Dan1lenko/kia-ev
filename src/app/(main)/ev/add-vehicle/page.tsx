import type { Metadata } from "next";
import AddVehicleClient from "./_components/AddVehicleClient";

export const metadata: Metadata = {
  title: "Add EV Vehicle",
  description: "Register your electric vehicle to start finding compatible charging stations.",
};

export default function AddVehiclePage() {
  return <AddVehicleClient />;
}
