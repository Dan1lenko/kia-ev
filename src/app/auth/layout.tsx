import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account to access KIA EV services.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Left side — Branding / Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
          <div className="absolute top-[50%] left-[40%] w-48 h-48 rounded-full bg-primary/8 blur-2xl" />
        </div>

        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-dark tracking-tight">
              KIA <span className="text-primary">EV</span>
            </h1>
            <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover the future of electric driving. Explore vehicles, find
            charging stations, and shop accessories.
          </p>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">EV Network</p>
                <p className="text-xs text-gray-500">Find charging stations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                <svg className="h-4 w-4 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Compare Cars</p>
                <p className="text-xs text-gray-500">Make smart choices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Accessories</p>
                <p className="text-xs text-gray-500">Shop premium parts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                <svg className="h-4 w-4 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Book Slots</p>
                <p className="text-xs text-gray-500">Schedule test drives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — Form area */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
