"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpAction } from "../_actions/auth";

const OTP_LENGTH = 4;
const TIMER_SECONDS = 90;

export default function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const credential = searchParams.get("credential") || "";
  const [error, setError] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmpty = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty]?.focus();
  }, []);

  const handleResend = () => {
    setTimer(TIMER_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    // TODO: Implement resend OTP logic
  };

  const handleVerify = async () => {
    if (otp.some((digit) => !digit)) return;
    setIsLoading(true);
    setError("");

    const otpCode = otp.join("");
    const res = await verifyOtpAction(credential, otpCode);
    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else if (res?.success) {
      const redirectUrl = searchParams.get("redirect") || "/";
      router.push(redirectUrl);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 text-center">
        {/* Illustration placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10">
            <svg className="h-14 w-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {/* Decorative dots */}
            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-dark">
              ···
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-dark">
          Введіть 4-значний
          <br />
          Код підтвердження
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Код надіслано на <span className="font-semibold text-dark">{credential || "ваш пристрій"}</span>. Термін дії коду закінчиться через{" "}
          <span className="font-semibold text-primary">
            {formatTime(timer)}
          </span>
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3.5 py-1 text-[11px] font-bold text-dark border border-secondary/20 select-none">
          💡 Код для швидкого тестування: <span className="text-primary font-black tracking-wider text-xs">1234</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-600 text-center animate-fade-in">
          {error}
        </div>
      )}

      {/* OTP Inputs */}
      <div className="flex justify-center gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`h-16 w-16 rounded-2xl border-2 text-center text-2xl font-bold transition-all duration-[var(--transition-base)] focus:outline-none ${
              digit
                ? "border-primary bg-primary/5 text-dark"
                : "border-gray-200 bg-gray-50 text-dark"
            } focus:border-primary focus:ring-4 focus:ring-primary/15`}
            id={`otp-input-${index}`}
          />
        ))}
      </div>

      {/* Resend OTP */}
      <div className="mt-6 text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="cursor-pointer text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            id="otp-resend"
          >
            Надіслати код повторно
          </button>
        ) : (
          <p className="text-sm text-gray-400">
            Повторно надіслати код через{" "}
            <span className="font-medium text-primary">
              {formatTime(timer)}
            </span>
          </p>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={!isComplete || isLoading}
        className="mt-8 w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-[var(--transition-base)] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
        id="otp-verify"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Перевірка...
          </span>
        ) : (
          "Підтвердити"
        )}
      </button>

      {/* Back link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        <Link
          href="/auth/sign-in"
          className="font-medium text-gray-500 transition-colors hover:text-primary"
        >
          ← Назад до входу
        </Link>
      </p>
    </div>
  );
}
