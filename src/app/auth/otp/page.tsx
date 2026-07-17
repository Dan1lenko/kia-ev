import type { Metadata } from "next";
import { Suspense } from "react";
import OtpForm from "../_components/OtpForm";

export const metadata: Metadata = {
  title: "Підтвердження OTP | KIA EV",
  description: "Введіть 4-значний код підтвердження, надісланий на ваш номер телефону.",
};

export default function OtpPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-[#9A9A9A] animate-pulse">Завантаження...</div>}>
      <OtpForm />
    </Suspense>
  );
}
