"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

// Custom icons setup
const chargingIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle cx="20" cy="20" r="16" fill="#0A0F1D" stroke="#00D1FF" stroke-width="2" />
      <circle cx="20" cy="20" r="12" fill="#00D1FF" opacity="0.2" />
      <path d="M21 11L14 20.5H19L18 29L25 19.5H20L21 11Z" fill="#00D1FF" />
    </svg>
  `)}`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
}) : null;

const carIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle cx="20" cy="20" r="16" fill="#0A0F1D" stroke="#FACC15" stroke-width="2" />
      <circle cx="20" cy="20" r="12" fill="#FACC15" opacity="0.2" />
      <text x="20" y="26" font-size="16" text-anchor="middle">🚗</text>
    </svg>
  `)}`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
}) : null;

interface StationMapProps {
  stations: Array<{
    id: string;
    name: string;
    distance: string;
    timeText: string;
    latitude: number;
    longitude: number;
  }>;
}

export default function StationMap({ stations }: StationMapProps) {
  const center: [number, number] = [50.4501, 30.5234];

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {carIcon && (
          <Marker position={[50.4501, 30.5234]} icon={carIcon}>
            <Popup>
              <div className="text-center font-bold text-xs text-dark">Моє EV</div>
            </Popup>
          </Marker>
        )}

        {chargingIcon && stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={chargingIcon}
          >
            <Popup>
              <div className="p-1 text-center">
                <p className="text-xs font-bold text-dark leading-tight">{station.name}</p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-gray-500">
                  <span>📍 {station.distance}</span>
                  <span>•</span>
                  <span>{station.timeText}</span>
                </div>
                <Link
                  href={`/ev/station/${station.id}`}
                  className="mt-2 inline-block rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-white transition-all hover:bg-primary-dark"
                >
                  Детальніше
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
