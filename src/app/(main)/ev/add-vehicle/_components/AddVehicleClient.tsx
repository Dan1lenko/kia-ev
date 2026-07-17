"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const connectorTypes = [
  { id: "type1", label: "CCS/Type 1", icon: Type1Icon },
  { id: "type2", label: "CCS/Type 2", icon: Type2Icon },
  { id: "gbt", label: "GB/T", icon: GbtIcon },
  { id: "chademo", label: "CHAdeMO", icon: ChademoIcon },
  { id: "tesla", label: "Tesla Supercharger", icon: TeslaIcon },
];

export default function AddVehicleClient() {
  const router = useRouter();
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [battery, setBattery] = useState("");
  const [selectedPlug, setSelectedPlug] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert("Please accept the requirements first.");
      return;
    }
    // Navigate to the next step: EV Network / Stations Search
    router.push("/ev/network");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Go back"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold uppercase tracking-wider text-dark">
          ADD EV VEHICLE
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="car-maker" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Car Maker
            </label>
            <input
              id="car-maker"
              type="text"
              placeholder="e.g. KIA"
              value={maker}
              onChange={(e) => setMaker(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="car-model" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Car Model
            </label>
            <input
              id="car-model"
              type="text"
              placeholder="e.g. EV6"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="vin" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              VIN
            </label>
            <input
              id="vin"
              type="text"
              placeholder="Enter 17-digit VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="reg-number" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Vehicle Registration Number
            </label>
            <input
              id="reg-number"
              type="text"
              placeholder="e.g. DL 1CA 1234"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="battery-capacity" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Battery Capacity (kWh)
            </label>
            <input
              id="battery-capacity"
              type="number"
              placeholder="e.g. 77.4"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Plug in Type Section */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark">
            PLUG IN TYPE
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {connectorTypes.map((plug) => {
              const isSelected = selectedPlug === plug.id;
              return (
                <button
                  key={plug.id}
                  type="button"
                  onClick={() => setSelectedPlug(plug.id)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-gray-150 bg-white text-gray-400 hover:border-primary/20 hover:text-dark"
                  }`}
                >
                  <plug.icon className="h-10 w-10 text-current" />
                  <span className="mt-2 text-center text-[10px] font-bold uppercase leading-tight">
                    {plug.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Your Vehicle section with placeholder */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark">
            YOUR VEHICLE
          </h2>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50 to-white py-10 flex items-center justify-center">
            {/* Visual car container */}
            <div className="text-center">
              <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <p className="mt-2 text-xs font-bold text-dark uppercase tracking-wider">
                {maker || "KIA"} {model || "EV6"}
              </p>
              <p className="text-[10px] text-gray-400">
                {regNumber || "No Reg Number"}
              </p>
            </div>
          </div>
        </div>

        {/* Accept checkboxes + Button */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-gray-500 leading-tight">
              Accept all the requirements that we have provided for electric vehicle registration.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] cursor-pointer"
          >
            ADD & SEARCH STATIONS
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Connector SVG Icons ── */

function Type1Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="8" cy="11" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function Type2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function GbtIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="8" r="1.2" fill="currentColor" />
      <circle cx="9" cy="11" r="1.2" fill="currentColor" />
      <circle cx="15" cy="11" r="1.2" fill="currentColor" />
      <circle cx="9" cy="15" r="1.2" fill="currentColor" />
      <circle cx="15" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ChademoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <rect x="8" y="10" width="8" height="4" rx="1" stroke="currentColor" />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function TeslaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M9 9h6M9 15h6" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
