import Link from "next/link";

const brands = [
  { slug: "mg", label: "MG", logo: "MG" },
  { slug: "kia", label: "KIA", logo: "Kɪᴀ" },
  { slug: "mahindra", label: "Mahindra Electric", logo: "M" },
  { slug: "tata", label: "TATA eV", logo: "TATA" },
  { slug: "hyundai", label: "Hyundai", logo: "H" },
  { slug: "bmw", label: "BMW", logo: "BMW" },
  { slug: "mercedes", label: "Mercedes", logo: "MB" },
  { slug: "audi", label: "Audi", logo: "AUDI" },
];

export default function BrandsSection() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wide text-dark">
          Brand
        </h2>
        <Link
          href="/cars/brands"
          className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          View All →
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 lg:gap-4">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/cars?brand=${brand.slug}`}
            className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs font-bold text-dark transition-all duration-200 group-hover:border-primary group-hover:text-primary lg:h-14 lg:w-14 lg:text-sm">
              {brand.logo}
            </div>
            <span className="text-center text-xs font-medium text-gray-600 line-clamp-1 lg:text-sm">
              {brand.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
