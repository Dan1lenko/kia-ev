"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockStations } from "@/lib/mockStations";

export default function NetworkClient() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"nearby" | "recommended" | "recent" | "favorite">("nearby");
  const [stationType, setStationType] = useState<"public" | "private">("public");

  const filteredStations = mockStations.filter((station) => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = station.type === stationType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Search and Profile Row */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="I am looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Link
          href="/profile"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors"
          aria-label="Profile"
        >
          👤
        </Link>
      </div>

      {/* Main Tabs Filters */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(["nearby", "recommended", "recent", "favorite"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-secondary text-dark shadow-sm"
                : "bg-gray-150 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Control Sub-Filters (Public/Private + Layout Toggles) */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2 bg-gray-100 rounded-full p-1 border border-gray-200">
          <button
            onClick={() => setStationType("public")}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase cursor-pointer transition-all duration-200 ${
              stationType === "public"
                ? "bg-secondary text-dark shadow-sm"
                : "text-gray-500 hover:text-dark"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setStationType("private")}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase cursor-pointer transition-all duration-200 ${
              stationType === "private"
                ? "bg-secondary text-dark shadow-sm"
                : "text-gray-500 hover:text-dark"
            }`}
          >
            Private
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Compass target icon */}
          <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            🧭
          </button>
          {/* Settings filters icon */}
          <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            ⚙️
          </button>
          {/* View toggle (Map/List) */}
          <button
            onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm font-semibold"
            aria-label={viewMode === "map" ? "Switch to list view" : "Switch to map view"}
          >
            {viewMode === "map" ? "📋" : "🗺️"}
          </button>
        </div>
      </div>

      {/* ── MAP VIEW ── */}
      {viewMode === "map" && (
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 aspect-[4/5] md:aspect-[16/9]">
          {/* Mock Map graphics */}
          <div className="absolute inset-0 bg-white opacity-90" />
          {/* Mock Road Grids */}
          <div className="absolute left-1/3 top-0 h-full w-8 bg-gray-100 border-x border-gray-200/50" />
          <div className="absolute left-2/3 top-0 h-full w-10 bg-gray-100 border-x border-gray-200/50" />
          <div className="absolute top-1/3 left-0 w-full h-8 bg-gray-100 border-y border-gray-200/50" />
          <div className="absolute top-2/3 left-0 w-full h-12 bg-gray-100 border-y border-gray-200/50" />

          {/* Interactive Station Markers */}
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${station.longitude}%`, top: `${station.latitude}%` }}
            >
              {/* Highlight popups */}
              <Link
                href={`/ev/station/${station.id}`}
                className="block bg-white border border-gray-100 rounded-xl p-2.5 shadow-lg w-40 text-center hover:scale-105 transition-transform animate-fade-in"
              >
                <p className="text-[10px] font-bold text-dark leading-tight line-clamp-1">
                  {station.name}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-gray-500">
                  <span>📍 {station.distance}</span>
                  <span>•</span>
                  <span>{station.timeText}</span>
                </div>
              </Link>
              {/* Pulse Pin */}
              <div className="mx-auto mt-2 h-7 w-7 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse">
                <span className="text-[10px] text-white">⚡</span>
              </div>
            </div>
          ))}

          {/* Car Position Marker */}
          <div className="absolute bottom-12 right-12 flex flex-col items-center">
            <div className="rounded-full bg-yellow-400/30 p-4 border border-yellow-400/60 animate-ping absolute" />
            <div className="relative rounded-2xl bg-dark text-white p-3 shadow-md flex items-center justify-center text-xs font-bold border border-yellow-400">
              🚗 My EV
            </div>
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && (
        <div className="mt-6 space-y-4">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-gray-150 bg-white transition-all hover:shadow-card-hover"
            >
              {/* Charger Image Mock container */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center sm:w-48">
                <span className="text-3xl">🔌</span>
              </div>

              {/* Station Details */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-wide">
                    {station.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {station.address}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-gray-400">
                    📍 {station.distance}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex gap-2">
                    {/* Feature icons */}
                    <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
                      📶 Free Wi-Fi
                    </span>
                    <span className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
                      ♿ Accessible
                    </span>
                  </div>

                  <Link
                    href={`/ev/station/${station.id}`}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary-dark cursor-pointer active:scale-95"
                  >
                    Slots Available
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredStations.length > 0 && (
            <div className="pt-4 text-center">
              <button className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-dark cursor-pointer">
                LOAD MORE &gt;&gt;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
