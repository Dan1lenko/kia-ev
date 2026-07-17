import type { Metadata } from "next";
import { Suspense } from "react";
import SignUpForm from "../_components/SignUpForm";

export const metadata: Metadata = {
  title: "Реєстрація | KIA EV",
  description: "Створіть свій обліковий запис KIA EV, щоб переглядати електромобілі, бронювати зарядні станції та купувати аксесуари.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-[#9A9A9A] animate-pulse">Завантаження форми реєстрації...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
