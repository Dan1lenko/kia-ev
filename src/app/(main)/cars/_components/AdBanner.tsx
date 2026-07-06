export default function AdBanner() {
  return (
    <section className="mt-10 mb-4">
      <div className="relative overflow-hidden rounded-2xl bg-dark">
        <div className="flex aspect-[21/9] items-center justify-center lg:aspect-[3/1]">
          {/* Placeholder for ad banner */}
          <div className="text-center">
            <span className="block text-[10px] uppercase tracking-widest text-gray-500">
              AD
            </span>
            <div className="mt-3 h-px w-16 bg-gray-700 mx-auto" />
            <p className="mt-3 text-2xl font-bold text-gray-400 lg:text-4xl">
              Advertisement
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Sponsored Content
            </p>
          </div>
        </div>

        {/* AD badge */}
        <span className="absolute right-3 top-3 rounded-md bg-gray-700/80 px-2 py-0.5 text-[10px] font-medium text-gray-400 backdrop-blur-sm">
          AD ›
        </span>
      </div>
    </section>
  );
}
