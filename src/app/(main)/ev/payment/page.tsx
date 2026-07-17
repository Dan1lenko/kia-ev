import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentClient from "./_components/PaymentClient";

export const metadata: Metadata = {
  title: "Charging Payment",
  description: "Complete payment to confirm your EV charging station booking.",
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading payment details...</div>}>
      <PaymentClient />
    </Suspense>
  );
}

