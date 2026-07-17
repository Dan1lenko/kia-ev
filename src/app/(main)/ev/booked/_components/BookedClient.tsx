"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getStationById } from "@/lib/mockStations";

export default function BookedClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stationId = searchParams.get("stationId") || "rb-road";
  const arrive = searchParams.get("arrive") || "10:45";
  const durationParam = searchParams.get("duration") || "1.5";
  const total = searchParams.get("total") || "7.50";
  const method = searchParams.get("method") || "Credit Card";
  const bookingId = searchParams.get("bookingId");

  const station = getStationById(stationId) || {
    name: "ЗАРЯДНА СТАНЦІЯ RB ROAD",
  };

  const translatedMethod =
    method === "Credit Card"
      ? "Кредитна картка"
      : method === "wallet"
      ? "Гаманець"
      : method === "cash"
      ? "Готівка"
      : method === "gpay"
      ? "Google Pay"
      : method;

  return (
    <div className="mx-auto max-w-md px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Celebration Check Circle */}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10 border-4 border-secondary text-5xl animate-bounce">
        ✓
      </div>

      {/* Success Messages */}
      <h1 className="mt-8 text-center text-xl font-black text-dark tracking-tight">
        Вітаємо!
      </h1>
      <p className="mt-2 text-center text-sm font-semibold text-gray-500">
        Замовлення успішно оформлено
      </p>

      {/* Invoice Receipt Layout */}
      <div className="mt-8 w-full rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 relative overflow-hidden">
        {/* Decorative corner cutouts */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-r border-gray-250" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-l border-gray-250" />

        <div className="space-y-4 text-xs">
          {bookingId && (
            <div className="flex justify-between border-b border-gray-200/50 pb-3 mb-2">
              <span className="font-bold text-gray-400 uppercase">ID Бронювання</span>
              <span className="font-black text-dark truncate max-w-[180px]">{bookingId}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="font-bold text-gray-400 uppercase">Станція</span>
            <span className="font-black text-dark text-right uppercase tracking-wide max-w-[200px] truncate">
              {station.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold text-gray-400 uppercase">Час початку</span>
            <span className="font-black text-dark">Сьогодні, {arrive}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold text-gray-400 uppercase">Тривалість</span>
            <span className="font-black text-dark">
              {durationParam === "1.5" ? "1 год 30 хв" : `${durationParam} год`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold text-gray-400 uppercase">Всього сплачено</span>
            <span className="font-black text-primary text-sm">${total}</span>
          </div>

          <div className="flex justify-between border-t border-gray-200/50 pt-4">
            <span className="font-bold text-gray-400 uppercase">Оплата через</span>
            <span className="font-black text-dark">{translatedMethod}</span>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-8 w-full space-y-3">
        <button
          onClick={() => router.push("/ev/network")}
          className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-dark cursor-pointer active:scale-95 shadow-md shadow-primary/20"
        >
          ОТРИМАТИ МАРШРУТ
        </button>

        <button
          onClick={() => alert("Код доступу надіслано на вашу електронну пошту та номер телефону.")}
          className="w-full rounded-2xl bg-secondary py-4 text-sm font-bold text-dark transition-all hover:bg-secondary-dark cursor-pointer active:scale-95"
        >
          ДОСТУП ДО ЗАРЯДКИ
        </button>
      </div>

      {/* Close cross button */}
      <button
        onClick={() => router.push("/")}
        className="mt-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-dark text-white hover:bg-black transition-colors active:scale-90"
        aria-label="Close and return home"
      >
        ✕
      </button>
    </div>
  );
}
