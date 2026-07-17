"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CarModel } from "@/lib/mockCars";

interface BookSlotClientProps {
  car: CarModel;
  initialDealerId?: string;
}

const dealersInfo: Record<
  string,
  { name: string; address: string; rating: number }
> = {
  "mark-ev-motors": {
    name: "MARK EV MOTORS",
    address: "5th Cross, Colusa Ave, Texas, US, TX1 45A",
    rating: 4,
  },
  "central-kia-showroom": {
    name: "CENTRAL KIA SHOWROOM",
    address: "102 Broadway St, Texas, US, TX2 98B",
    rating: 5,
  },
  "metro-electric-deals": {
    name: "METRO ELECTRIC DEALS",
    address: "88 Expressway Blvd, Texas, US, TX1 10C",
    rating: 3,
  },
};

export default function BookSlotClient({
  car,
  initialDealerId = "mark-ev-motors",
}: BookSlotClientProps) {
  const router = useRouter();
  const dealer = dealersInfo[initialDealerId] || dealersInfo["mark-ev-motors"];

  const [bookingLocation, setBookingLocation] = useState<"showroom" | "home">(
    "showroom"
  );
  const [selectedDate, setSelectedDate] = useState("2026-07-15");
  const [selectedTime, setSelectedTime] = useState("10:30");
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-dark">Бронювання підтверджено!</h1>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          Ваш візит до <span className="font-semibold">{dealer.name}</span> для{" "}
          {bookingLocation === "showroom" ? "відвідування автосалону" : "тест-драйву біля дому"}{" "}
          на <span className="font-semibold">{selectedDate}</span> о{" "}
          <span className="font-semibold">{selectedTime}</span> підтверджено.
          Ми зв'яжемося з вами найближчим часом!
        </p>
        <button
          onClick={() => router.push("/cars")}
          className="mt-8 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark cursor-pointer"
        >
          Назад до автомобілів
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16 lg:pb-10">
      {/* Dynamic Header Pattern / Splash */}
      <div className="relative h-24 bg-gradient-to-r from-primary via-secondary to-primary/80 lg:h-32">
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md text-gray-600 transition-colors hover:bg-white border border-gray-100 z-10"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white tracking-wider">
            БРОНЮВАННЯ ДИЛЕРА
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 mt-6">
        {/* Showroom Image Showcase */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-100 border border-gray-200 aspect-[16/10] md:aspect-[21/9]">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800/20 to-gray-900/40">
            <svg
              className="h-16 w-16 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z"
              />
            </svg>
          </div>
          <span className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Інтер'єр автосалону
          </span>
        </div>

        {/* Dealer Header Details */}
        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-start border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-xl font-bold text-dark">{dealer.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{dealer.address}</p>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${
                    star <= dealer.rating ? "text-secondary" : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Showroom Location"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </button>
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
              title="Call Showroom"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.112-3.758-6.58-6.58l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Promo + CTAs section */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          {/* Car Showcase with Offer Badge */}
          <div className="flex-1 relative flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-6">
            <svg
              className="h-28 w-28 text-gray-300"
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
            <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm shadow-sm" title="Special offer percentage badge">
              %
            </span>
          </div>

          {/* Quick options sidebar */}
          <div className="flex-1 flex flex-col gap-3">
            {[
              "Замовити зворотний дзвінок",
              "Кредитування / Фінанси",
              "Онлайн-консультація",
              "Візит до автосалону",
              "Забронювати зараз",
            ].map((option) => (
              <button
                key={option}
                className="w-full text-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark cursor-pointer active:scale-[0.98]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Slot booking module */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-lg font-bold text-dark uppercase tracking-wider">
            ВИБІР ЧАСУ ВІЗИТУ
          </h2>

          <div className="mt-4 flex flex-col gap-4">
            {/* Showroom vs Home */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-dark cursor-pointer">
                <input
                  type="radio"
                  name="bookingLocation"
                  checked={bookingLocation === "showroom"}
                  onChange={() => setBookingLocation("showroom")}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                Автосалон
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-dark cursor-pointer">
                <input
                  type="radio"
                  name="bookingLocation"
                  checked={bookingLocation === "home"}
                  onChange={() => setBookingLocation("home")}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                Тест-драйв вдома
              </label>
            </div>

            {/* Date Input */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white transition-all">
              <span className="text-gray-400">📅</span>
              <div className="flex-1">
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                  Дата
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-sm font-bold text-dark bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Time Input */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white transition-all">
              <span className="text-gray-400">⏰</span>
              <div className="flex-1">
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                  Час
                </span>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-sm font-bold text-dark bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors cursor-pointer active:scale-[0.98]"
              >
                ПІДТВЕРДИТИ ЧАС
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-bold text-white hover:bg-secondary-dark transition-colors cursor-pointer active:scale-[0.98]"
                title="Зв'язатися з підтримкою"
              >
                ПОТРІБНА ДОПОМОГА ?
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-secondary font-bold text-xs">
                  ?
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
