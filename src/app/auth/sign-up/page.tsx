import type { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your KIA EV account to explore electric vehicles, find charging stations, and shop accessories.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
