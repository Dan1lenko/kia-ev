"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CarModel } from "@/lib/mockCars";

interface SelectDistributorClientProps {
  car: CarModel;
}

const showrooms = [
  {
    id: "mark-ev-motors",
    name: "MARK EV MOTORS",
    address: "5th Cross, Colusa Ave Texas, US, TX1 45A",
    distance: "1.2 KM",
    rating: 4,
    coords: { x: 52, y: 55 }, // percentages on map
  },
  {
    id: "central-kia-showroom",
    name: "CENTRAL KIA SHOWROOM",
    address: "102 Broadway St, Texas, US, TX2 98B",
    distance: "3.5 KM",
    rating: 5,
    coords: { x: 20, y: 40 },
  },
  {
    id: "metro-electric-deals",
    name: "METRO ELECTRIC DEALS",
    address: "88 Expressway Blvd, Texas, US, TX1 10C",
    distance: "5.1 KM",
    rating: 3,
    coords: { x: 80, y: 65 },
  },
];

export default function SelectDistributorClient({
  car,
}: SelectDistributorClientProps) {
  const router = useRouter();
  const [selectedShowroom, setSelectedShowroom] = useState(showrooms[0]);

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-dark">{car.name}</h1>
            <p className="text-xs text-gray-500">Select Distributor</p>
          </div>
        </div>

        {/* Selected Car Showcase */}
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 py-6">
          <div className="relative aspect-[16/10] w-64 max-w-full overflow-hidden rounded-xl bg-white shadow-sm flex items-center justify-center">
            <svg
              className="h-20 w-20 text-gray-300"
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
            <span className="absolute bottom-2 rounded-lg bg-gray-100 px-3 py-0.5 text-[10px] font-bold text-gray-600">
              {car.name}
            </span>
          </div>
          <h2 className="mt-4 text-base font-bold uppercase text-dark">
            {car.name} GT line AWD
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            PREFERRED SHOWROOM
          </p>
        </div>

        {/* Interactive Map Area */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 aspect-[4/3] md:aspect-[16/9]">
          {/* Abstract Map Grid Lines & Landmarks */}
          <div className="absolute inset-0 bg-white opacity-80" />
          {/* Colusa Ave */}
          <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gray-100/80 border-x border-gray-200/50 flex items-center justify-center">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 rotate-90">
              Colusa Ave
            </span>
          </div>
          {/* Santa Fe Ave */}
          <div className="absolute left-1/3 top-0 h-full w-6 -translate-x-1/2 bg-gray-100/50 border-x border-gray-200/20 flex items-center justify-center">
            <span className="text-[8px] uppercase tracking-wider text-gray-400 rotate-90">
              Santa Fe Ave
            </span>
          </div>
          {/* Memorial Park */}
          <div className="absolute bottom-8 left-6 rounded-lg bg-green-50 border border-green-100 px-3 py-2 text-center shadow-sm">
            <span className="text-[10px] font-bold text-green-700">
              Memorial Park
            </span>
          </div>
          {/* Thousand Oaks */}
          <div className="absolute right-12 bottom-16 text-center">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Thousand Oaks
            </span>
          </div>

          {/* Map markers */}
          {showrooms.map((showroom) => {
            const isSelected = selectedShowroom.id === showroom.id;
            return (
              <button
                key={showroom.id}
                onClick={() => setSelectedShowroom(showroom)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                style={{ left: `${showroom.coords.x}%`, top: `${showroom.coords.y}%` }}
              >
                {/* Active marker popup */}
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 rounded-lg bg-white p-2 text-center shadow-lg border border-gray-100 animate-fade-in z-20">
                    <p className="text-[9px] font-bold text-dark leading-tight">
                      {showroom.name}
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-2 w-2 ${
                            star <= showroom.rating
                              ? "text-secondary"
                              : "text-gray-200"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[8px] text-gray-500 ml-1">
                        {showroom.distance}
                      </span>
                    </div>
                    {/* Tiny arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </div>
                )}

                {/* Pin Circle */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all duration-200 ${
                    isSelected
                      ? "bg-secondary text-white scale-110"
                      : "bg-primary text-white hover:scale-105"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
              </button>
            );
          })}

          {/* Current location button helper */}
          <button className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 border border-gray-100">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </button>
        </div>

        {/* Selected Showroom Card Info */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-bold text-dark">
                {selectedShowroom.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedShowroom.address}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${
                      star <= selectedShowroom.rating
                        ? "text-secondary"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  ({selectedShowroom.distance})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-dark border border-gray-200 rounded-xl px-4 py-2.5 transition-colors cursor-pointer"
                title="Get directions to the showroom"
              >
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Get Directions
              </button>

              <Link
                href={`/cars/${car.id}/book-slot?dealer=${selectedShowroom.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                SELECT SLOTS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
