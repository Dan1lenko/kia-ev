import type { Metadata } from "next";
import { Suspense } from "react";
import BookedClient from "./_components/BookedClient";

export const metadata: Metadata = {
  title: "Booking Successful",
  description: "Your EV charging slot has been booked successfully.",
};

export default function BookedPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading booking confirmation...</div>}>
      <BookedClient />
    </Suspense>
  );
}

