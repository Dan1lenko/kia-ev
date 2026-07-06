import type { Metadata } from "next";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your KIA EV account to access your vehicles, orders, and more.",
};

export default function SignInPage() {
  return <SignInForm />;
}
