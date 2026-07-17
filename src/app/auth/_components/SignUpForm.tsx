"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "./SocialLogin";
import { initiateSignUpAction } from "../_actions/auth";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await initiateSignUpAction(name, email, phone);
    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else if (res?.success && res.redirect) {
      const redirectParam = redirect ? `&redirect=${encodeURIComponent(redirect)}` : "";
      router.push(res.redirect + redirectParam);
    }
  };

  const isFormValid = name.trim() && phone.trim() && email.trim() && agreed;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        {/* Mobile logo */}
        <div className="mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-dark">
            KIA <span className="text-primary">EV</span>
          </h2>
        </div>
        <h1 className="text-3xl font-bold text-dark">Ласкаво просимо до WROOM</h1>
        <p className="mt-2 text-gray-500">Створіть свій обліковий запис, щоб розпочати</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}
        {/* Name */}
        <div className="group relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-dark placeholder:text-gray-400 transition-all duration-[var(--transition-base)] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
            id="signup-name"
          />
        </div>

        {/* Mobile Number */}
        <div className="group relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="Номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-dark placeholder:text-gray-400 transition-all duration-[var(--transition-base)] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
            id="signup-phone"
          />
        </div>

        {/* Email */}
        <div className="group relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-dark placeholder:text-gray-400 transition-all duration-[var(--transition-base)] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
            id="signup-email"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-[var(--transition-base)] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          id="signup-submit"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Створення облікового запису...
            </span>
          ) : (
            "Зареєструватися зараз"
          )}
        </button>

        {/* Skip */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Пропустити зараз →
          </Link>
        </div>
      </form>

      {/* Terms Checkbox */}
      <div className="mt-6">
        <label
          htmlFor="signup-terms"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            type="checkbox"
            id="signup-terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary"
          />
          <span className="text-sm text-gray-500">
            Я приймаю всі правила та умови сервісу.
          </span>
        </label>
      </div>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">Або продовжити через</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Switch to Sign In */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Вже зареєстровані?{" "}
        <Link
          href={redirect ? `/auth/sign-in?redirect=${encodeURIComponent(redirect)}` : "/auth/sign-in"}
          className="font-semibold text-dark transition-colors hover:text-primary"
        >
          Увійти
        </Link>
      </p>
    </div>
  );
}
