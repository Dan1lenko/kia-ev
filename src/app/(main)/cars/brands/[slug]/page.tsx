import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandBySlug, brands } from "@/lib/mockCars";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `${brand.name} Electric Vehicles`,
    description: `Explore ${brand.name} electric vehicles. ${brand.tagline}.`,
  };
}

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <div className="py-6 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Brand Header */}
        <div className="mb-10 text-center">
          {/* Brand logo placeholder */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-dark lg:h-24 lg:w-24">
            {brand.logo}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            <span className="font-semibold text-primary">EXPERIENCE</span>{" "}
            {brand.tagline}
          </p>
        </div>

        {/* Models List */}
        <div className="space-y-6">
          {brand.models.map((model) => (
            <Link
              key={model.id}
              href={`/cars/brands/${brand.slug}/${model.slug}`}
              className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-200 hover:border-primary/20 hover:shadow-card-hover"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Car image placeholder */}
                <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 sm:aspect-auto sm:w-1/2 lg:w-3/5">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-20 w-20 text-gray-300 lg:h-28 lg:w-28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    <p className="mt-1 text-xs text-gray-400">
                      {model.name} Image
                    </p>
                  </div>

                  {/* 360° badge */}
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-bold text-gray-500">
                    360°
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
                  <h2 className="text-xl font-bold uppercase text-dark lg:text-2xl">
                    {model.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                    VARIANT&apos;S →
                  </p>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                    {model.description}
                  </p>
                  <p className="mt-3 text-lg font-bold text-dark">
                    From ${model.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
