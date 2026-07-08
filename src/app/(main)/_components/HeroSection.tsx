import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center py-12 lg:flex-row lg:gap-12 lg:py-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              New Launch
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-dark md:text-5xl lg:text-6xl">
              KIA <span className="text-primary">EV6</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-gray-500 lg:text-xl">
              Experience the next generation of electric driving. Stunning
              design, impressive range, and cutting-edge technology.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                Explore Now
              </Link>
              <Link
                href="/cars/brands"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 px-8 py-3.5 text-sm font-semibold text-dark transition-all duration-200 hover:border-primary hover:text-primary"
              >
                Compare Cars
              </Link>
            </div>
          </div>

          {/* Car image placeholder */}
          <div className="mt-10 flex-1 lg:mt-0">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
              {/* Placeholder for car image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">KIA EV6 Image</p>
                </div>
              </div>
              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
