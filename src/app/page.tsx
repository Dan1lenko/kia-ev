import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore KIA electric vehicles, find charging stations, shop accessories and compare cars.",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark">
          KIA <span className="text-primary">EV</span>
        </h1>
        <p className="mt-3 text-gray-500">
          Electric Vehicles — Coming Soon
        </p>
      </div>
    </main>
  );
}
