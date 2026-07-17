import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Вхід | KIA EV",
  description: "Увійдіть у свій обліковий запис KIA EV для доступу до бронювання та обраних станцій.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-[#9A9A9A] animate-pulse">Завантаження форми входу...</div>}>
      <SignInForm />
    </Suspense>
  );
}
