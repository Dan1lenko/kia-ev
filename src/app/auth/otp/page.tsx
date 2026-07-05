import type { Metadata } from "next";
import OtpForm from "../_components/OtpForm";

export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Enter the 4-digit verification code sent to your phone and email.",
};

export default function OtpPage() {
  return <OtpForm />;
}
