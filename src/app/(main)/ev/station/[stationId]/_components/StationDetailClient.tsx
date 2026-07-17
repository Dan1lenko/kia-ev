"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChargingStation } from "@/lib/mockStations";
import { isStationFavoriteAction, toggleFavoriteAction } from "@/app/(main)/ev/_actions/evActions";

interface StationDetailClientProps {
  station: ChargingStation;
}

export default function StationDetailClient({ station }: StationDetailClientProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [arriveTime, setArriveTime] = useState("09:45");
  const [duration, setDuration] = useState("1.5"); // hours

  useEffect(() => {
    isStationFavoriteAction(station.id).then((isFav) => {
      setLiked(isFav);
    });
  }, [station.id]);

  const handleLike = async () => {
    const res = await toggleFavoriteAction(station.id);
    if (res.error) {
      alert(res.error);
    } else if (res.success !== undefined) {
      setLiked(res.isFavorite ?? false);
    }
  };

  const handleBook = () => {
    router.push(`/ev/payment?stationId=${station.id}&arrive=${arriveTime}&duration=${duration}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Go back"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-dark">Зарядна станція</h1>
            <p className="text-xs text-gray-500">ID: BEOS2023091</p>
          </div>
        </div>

        <button
          onClick={handleLike}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all ${
            liked
              ? "border-red-200 bg-red-50 text-red-500 scale-105"
              : "border-gray-200 bg-white text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Like station"
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Main Image */}
      <div className="relative mt-6 overflow-hidden rounded-3xl bg-gray-150 aspect-[16/10] flex items-center justify-center border border-gray-200">
        <span className="text-5xl">🔌</span>
        <span className="absolute bottom-4 right-4 rounded-xl bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Порт зарядної станції
        </span>
      </div>

      {/* Station Title Info */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-wide">
          {station.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {station.address}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl font-semibold text-gray-600">
              📶 Безкоштовний Wi-Fi
            </span>
            <span className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl font-semibold text-gray-600">
              ♿ Зручний доступ
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="font-semibold text-primary">📍 {station.distance}</span>
            <span>•</span>
            <div className="flex gap-0.5 text-secondary">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Detail Grid */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <span className="block text-xs font-bold text-dark">{station.connectionType}</span>
          <span className="mt-1 block text-[10px] uppercase text-gray-400 font-bold">Конектор</span>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <span className="block text-xs font-bold text-dark">${station.pricePerKwh}</span>
          <span className="mt-1 block text-[10px] uppercase text-gray-400 font-bold">за кВт·год</span>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <span className="block text-xs font-bold text-dark">${station.parkingFee.toFixed(2)}</span>
          <span className="mt-1 block text-[10px] uppercase text-gray-400 font-bold">Плата за паркінг</span>
        </div>
      </div>

      {/* Booking Inputs */}
      <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Arrive */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Час прибуття
            </label>
            <input
              type="time"
              value={arriveTime}
              onChange={(e) => setArriveTime(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-dark focus:border-primary focus:bg-white focus:outline-none"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Тривалість
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-dark focus:border-primary focus:bg-white focus:outline-none"
            >
              <option value="0.5">30 хв</option>
              <option value="1">1 година</option>
              <option value="1.5">1 година 30 хв</option>
              <option value="2">2 години</option>
              <option value="3">3 години</option>
            </select>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleBook}
        className="mt-8 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] cursor-pointer"
      >
        ЗАБРОНЮВАТИ ЗАРЯДКУ
      </button>
    </div>
  );
}
