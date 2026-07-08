import Link from "next/link";

export default function ChargingBanner() {
  return (
    <section className="py-4 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Link
          href="/ev/network"
          className="group relative block overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 lg:p-10"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/20 to-transparent" />
            <svg className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 text-white/10 lg:h-48 lg:w-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                There are 10 Charging Stations nearby
              </h3>
              <p className="mt-1 text-sm text-white/80 lg:text-base">
                Nearest one is just 1 km away. Find and navigate to the closest
                charging station.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 group-hover:bg-white group-hover:text-primary">
              View Map
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
