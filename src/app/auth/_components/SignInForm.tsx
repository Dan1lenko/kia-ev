"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "./SocialLogin";
import { initiateSignInAction } from "../_actions/auth";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [credential, setCredential] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const res = await initiateSignInAction(credential);
    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else if (res?.success && res.redirect) {
      const redirectParam = redirect ? `&redirect=${encodeURIComponent(redirect)}` : "";
      router.push(res.redirect + redirectParam);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-10 text-center lg:text-left">
        {/* Mobile logo */}
        <div className="mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-dark">
            KIA <span className="text-primary">EV</span>
          </h2>
        </div>

        {/* Greeting illustration — visible on mobile */}
        <div className="mb-6 flex justify-center lg:hidden">
          <div className="flex items-end gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15">
              <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="rounded-xl bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
              Привіт! 👋
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-dark">
          Раді бачити вас знову!
        </h1>
        <p className="mt-2 text-gray-500">
          Увійдіть, щоб продовжити подорож
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}
        {/* Email / Mobile Number */}
        <div className="group relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Email / Номер телефону"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-dark placeholder:text-gray-400 transition-all duration-[var(--transition-base)] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
            id="signin-credential"
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={!credential.trim() || isLoading}
          className="w-full cursor-pointer rounded-xl bg-dark py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-[var(--transition-base)] hover:bg-dark-light hover:shadow-lg hover:shadow-dark/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          id="signin-submit"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Вхід...
            </span>
          ) : (
            "Увійти зараз"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">Або продовжити через</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Switch to Sign Up */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Ще не зареєстровані?{" "}
        <Link
          href={redirect ? `/auth/sign-up?redirect=${encodeURIComponent(redirect)}` : "/auth/sign-up"}
          className="font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Зареєструватися зараз
        </Link>
      </p>
    </div>
  );
}
