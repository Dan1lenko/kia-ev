"use client";

import { useState } from "react";
import Link from "next/link";
import type { CarModel } from "@/lib/mockCars";

interface CarDetailViewProps {
  car: CarModel;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

  const specs = [
    { label: "Weight", value: car.specs.weight, icon: WeightIcon },
    { label: "Electric range", value: car.specs.range, icon: RangeIcon },
    { label: "Top Speed", value: car.specs.topSpeed, icon: SpeedIcon },
    { label: "0-100mph", value: car.specs.acceleration, icon: AccelIcon },
    { label: "Power", value: car.specs.power, icon: PowerIcon },
  ];

  return (
    <div className="pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* ── LEFT COLUMN: Image + Gallery ── */}
          <div className="py-6 lg:py-10">
            {/* Main Image */}
            <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 lg:max-w-none">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-28 w-28 text-gray-300 lg:h-40 lg:w-40"
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
                  <span className="mt-2 inline-block rounded-lg bg-gray-200 px-4 py-1 text-sm font-bold text-gray-500">
                    {car.slug.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Brand badge */}
              <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur-sm">
                <span className="block text-sm font-bold text-dark">
                  {car.brand}
                </span>
                <span className="block text-[10px] text-gray-500">
                  EXPERIENCE
                </span>
              </div>
            </div>

            {/* Thumbnail gallery */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-18 w-20 shrink-0 rounded-xl bg-gray-100 lg:h-22 lg:w-24"
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Details ── */}
          <div className="py-6 lg:py-10">
            {/* Name + Rating */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-dark lg:text-3xl">
                  {car.name}
                </h1>
                <p className="mt-1 text-2xl font-bold text-dark lg:text-3xl">
                  ${car.price.toLocaleString()}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  On-Road Price in{" "}
                  <span className="font-semibold text-primary">Delhi</span> 📍
                </p>
              </div>
              <div className="text-right">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${
                        star <= car.rating
                          ? "text-secondary"
                          : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">Over all Rating</p>
              </div>
            </div>

            {/* Color selector */}
            <div className="mt-5 flex items-center gap-3">
              {car.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(idx)}
                  className={`h-7 w-7 cursor-pointer rounded-full border-2 transition-all duration-200 ${
                    selectedColor === idx
                      ? "scale-110 border-primary ring-2 ring-primary/30"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>

            {/* Specs grid */}
            <div className="mt-8 grid grid-cols-5 gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 lg:gap-4 lg:p-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col items-center text-center">
                  <spec.icon className="h-6 w-6 text-gray-600" />
                  <span className="mt-2 text-sm font-bold text-dark lg:text-base">
                    {spec.value}
                  </span>
                  <span className="mt-0.5 text-[10px] text-gray-500 lg:text-xs">
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Variants */}
            <div className="mt-8">
              <h2 className="text-lg font-bold uppercase tracking-wide text-dark">
                Variant
              </h2>
              <div className="mt-4 space-y-3">
                {car.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="overflow-hidden rounded-xl border border-gray-100 transition-all duration-200 hover:border-primary/20"
                  >
                    <button
                      onClick={() =>
                        setExpandedVariant(
                          expandedVariant === variant.id ? null : variant.id
                        )
                      }
                      className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
                    >
                      <div>
                        <p className="text-sm font-bold text-dark">
                          {variant.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {variant.transmission}, {variant.fuelType}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-bold text-dark">
                            ${variant.price.toLocaleString()}*
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {variant.onRoadPrice}
                          </p>
                        </div>
                        <svg
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            expandedVariant === variant.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedVariant === variant.id && (
                      <div className="animate-fade-in border-t border-gray-100 bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">
                          The {variant.name} comes with {variant.transmission}{" "}
                          transmission and {variant.fuelType} powertrain.
                          Starting at ${variant.price.toLocaleString()}.
                        </p>
                        <Link
                          href="#"
                          className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary-dark"
                        >
                          Get On Road Price →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-bold uppercase tracking-wide text-dark">
                In Detail
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {car.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 p-3 backdrop-blur-md lg:static lg:mt-8 lg:border-0 lg:bg-transparent lg:p-0">
        <div className="mx-auto flex max-w-7xl gap-3 px-4 lg:px-8">
          <Link
            href="#"
            className="flex flex-1 items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
          >
            BOOK TEST DRIVE
          </Link>
          <Link
            href="#"
            className="flex flex-1 items-center justify-center rounded-xl bg-dark py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-dark-light active:scale-[0.98]"
          >
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Spec Icons ── */

function WeightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  );
}

function RangeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
    </svg>
  );
}

function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AccelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function PowerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
