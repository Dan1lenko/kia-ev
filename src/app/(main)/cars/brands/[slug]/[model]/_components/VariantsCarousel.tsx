"use client";

import { useState } from "react";
import Link from "next/link";
import type { CarModel } from "@/lib/mockCars";

interface VariantsCarouselProps {
  car: CarModel;
}

export default function VariantsCarousel({ car }: VariantsCarouselProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Brand Header */}
      <div className="py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold text-dark">
          {car.brand}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          <span className="font-semibold text-primary">EXPERIENCE</span>{" "}
          Movement that Inspires
        </p>
      </div>

      {/* Car Showcase */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-4"
        style={{ backgroundColor: car.colors[selectedColor]?.hex || "#C41E3A" }}
      >
        <div className="relative mx-auto w-full max-w-4xl py-12">
          {/* Main car placeholder */}
          <div className="relative mx-auto aspect-[16/10] max-w-2xl">
            <div className="flex h-full items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
              <div className="text-center">
                <svg
                  className="mx-auto h-32 w-32 text-white/40 lg:h-48 lg:w-48"
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
                <span className="mt-2 inline-block rounded-lg bg-white/20 px-4 py-1 text-sm font-bold text-white backdrop-blur-sm">
                  {car.slug.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Side car hints (decorative) */}
            <div className="absolute left-0 top-1/2 hidden h-3/5 w-24 -translate-x-16 -translate-y-1/2 rounded-xl bg-white/5 lg:block" />
            <div className="absolute right-0 top-1/2 hidden h-3/5 w-24 -translate-y-1/2 translate-x-16 rounded-xl bg-white/5 lg:block" />
          </div>
        </div>
      </div>

      {/* Bottom section: Name + Colors + CTA */}
      <div className="bg-white px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-dark">{car.name}</h1>

        {/* Color selector */}
        <div className="mt-5 flex justify-center gap-3">
          {car.colors.map((color, idx) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(idx)}
              className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-all duration-200 ${
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

        {/* CTA */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href={`/cars/${car.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
          >
            View Details
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
