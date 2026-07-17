"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStationById } from "@/lib/mockStations";

import { createBookingAction } from "@/app/(main)/ev/_actions/evActions";

export default function PaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stationId = searchParams.get("stationId") || "rb-road";
  const arrive = searchParams.get("arrive") || "09:45";
  const durationParam = searchParams.get("duration") || "1.5";

  const station = getStationById(stationId) || {
    name: "RB ROAD CHARGING STATION",
    pricePerKwh: 0.5,
    parkingFee: 1.0,
  };

  const durationHours = parseFloat(durationParam);
  // Calculate pricing
  const baseCost = station.pricePerKwh * 15 * durationHours; // assume 15kW rate
  const totalOriginal = baseCost + station.parkingFee;

  const [useCoins, setUseCoins] = useState(true);
  const [activeMethod, setActiveMethod] = useState<"card" | "wallet" | "cash" | "gpay">("card");

  const [cardName, setCardName] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 1234");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("•••");

  const discount = useCoins ? 1.0 : 0.0;
  const finalPrice = totalOriginal - discount;

  const handlePay = async () => {
    const res = await createBookingAction({
      stationId,
      stationName: station.name,
      arriveTime: arrive,
      duration: durationParam,
      totalPrice: finalPrice,
      paymentMethod: activeMethod === "card" ? "Credit Card" : activeMethod,
    });

    if (res.error) {
      alert(res.error);
      if (res.error.includes("авторизуватися")) {
        const currentUrl = window.location.pathname + window.location.search;
        router.push(`/auth/sign-in?redirect=${encodeURIComponent(currentUrl)}`);
      }
      return;
    }

    // Navigate to booked page and pass details plus the bookingId
    router.push(
      `/ev/booked?stationId=${stationId}&arrive=${arrive}&duration=${durationParam}&total=${finalPrice.toFixed(
        2
      )}&method=${activeMethod === "card" ? "Credit Card" : activeMethod}&bookingId=${res.bookingId}`
    );
  };


  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Go back"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-base font-bold text-dark">Деталі замовлення</h1>
      </div>

      {/* Order Summary Card */}
      <div className="mt-6 rounded-3xl border border-gray-150 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              ID замовлення
            </span>
            <span className="text-xs font-bold text-dark">BEOS091234</span>
          </div>
          <button className="text-xs font-bold text-red-500 hover:text-red-600 cursor-pointer">
            Видалити
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-dark uppercase tracking-wide">
              {station.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Прибуття: сьогодні о {arrive} ({durationParam === "1.5" ? "1 год 30 хв" : `${durationParam} год`})
            </p>
          </div>
          <span className="text-lg font-black text-primary">
            ${totalOriginal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Offers & Coins Block */}
      <div className="mt-6 rounded-3xl border border-gray-150 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="use-coins"
              checked={useCoins}
              onChange={() => setUseCoins(!useCoins)}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <label htmlFor="use-coins" className="text-xs font-bold text-dark cursor-pointer">
              Застосовано 400 монет (-$1.00)
            </label>
          </div>
          <span className="text-xs font-bold text-primary hover:underline cursor-pointer">
            Більше пропозицій
          </span>
        </div>
      </div>

      {/* Bill Details */}
      <div className="mt-6 rounded-3xl border border-gray-150 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Деталі рахунку
        </h3>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Сума замовлення</span>
          <span>${totalOriginal.toFixed(2)}</span>
        </div>
        {useCoins && (
          <div className="flex justify-between text-xs text-green-600 font-medium">
            <span>Застосовано знижку</span>
            <span>-$1.00</span>
          </div>
        )}
        <div className="border-t border-gray-50 pt-3 flex justify-between text-sm font-black text-dark">
          <span>Всього до сплати</span>
          <span className="text-primary">${finalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Options Accordion */}
      <div className="mt-8 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Спосіб оплати
        </h3>

        {/* Card Option */}
        <div className="rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveMethod("card")}
            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-xs font-bold text-dark flex items-center gap-2">
              💳 Кредитна / Дебетова картка
            </span>
            <span className="text-xs">{activeMethod === "card" ? "▼" : "▶"}</span>
          </button>
          {activeMethod === "card" && (
            <div className="px-5 pb-5 pt-2 border-t border-gray-50 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Ім'я власника картки
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-dark focus:border-primary focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Номер картки
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-dark focus:border-primary focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Термін дії / CVV
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-2 py-3 text-[11px] text-center text-dark focus:border-primary focus:bg-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-2 py-3 text-[11px] text-center text-dark focus:border-primary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wallet Option */}
        <div className="rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveMethod("wallet")}
            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-xs font-bold text-dark flex items-center gap-2">
              👛 Електронний гаманець
            </span>
            <span className="text-xs">{activeMethod === "wallet" ? "▼" : "▶"}</span>
          </button>
        </div>

        {/* Cash Option */}
        <div className="rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveMethod("cash")}
            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-xs font-bold text-dark flex items-center gap-2">
              💵 Готівка на станції
            </span>
            <span className="text-xs">{activeMethod === "cash" ? "▼" : "▶"}</span>
          </button>
        </div>

        {/* GPay Option */}
        <div className="rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveMethod("gpay")}
            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-xs font-bold text-dark flex items-center gap-2">
              📱 Google Pay
            </span>
            <span className="text-xs">{activeMethod === "gpay" ? "▼" : "▶"}</span>
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handlePay}
        className="mt-8 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] cursor-pointer"
      >
        ОПЛАТИТИ
      </button>
    </div>
  );
}
