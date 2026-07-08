import Link from "next/link";

export default function OffersSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-dark">
          Special Offers
        </h2>

        <div className="mt-8">
          <Link
            href="/cars"
            className="group relative block overflow-hidden rounded-2xl bg-dark transition-all duration-200 hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-6 p-8 lg:flex-row lg:p-12">
              {/* Left: text */}
              <div className="flex-1 text-center lg:text-left">
                <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Limited Time Offer
                </span>
                <h3 className="mt-3 text-3xl font-bold leading-tight text-white lg:text-4xl">
                  Drive Your{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Dreams
                  </span>
                </h3>
                <p className="mt-3 text-gray-400 lg:text-lg">
                  Get special financing on select KIA electric vehicles. Limited
                  time offer with exclusive benefits.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 group-hover:bg-primary-dark group-hover:shadow-lg group-hover:shadow-primary/25">
                  Explore Offers
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Right: decorative */}
              <div className="flex-1">
                <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">Offer Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
