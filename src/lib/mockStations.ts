export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  distance: string;
  timeText: string;
  rating: number;
  latitude: number;
  longitude: number;
  type: "public" | "private";
  pricePerKwh: number;
  parkingFee: number;
  connectionType: string;
  slotsAvailable: boolean;
}

export const mockStations: ChargingStation[] = [
  {
    id: "rb-road",
    name: "ЗАРЯДНА СТАНЦІЯ RB ROAD",
    address: "вул. П'ята, ЛМ Роуд, м. Київ, Україна",
    distance: "1.0 км",
    timeText: "2 хв",
    rating: 4,
    latitude: 50.4581,
    longitude: 30.5182,
    type: "public",
    pricePerKwh: 0.5,
    parkingFee: 1.0,
    connectionType: "Type 3",
    slotsAvailable: true,
  },
  {
    id: "subway",
    name: "ЗАРЯДНА СТАНЦІЯ SUBWAY",
    address: "вул. Десята, м. Київ, Україна",
    distance: "2.5 км",
    timeText: "5 хв",
    rating: 4,
    latitude: 50.4432,
    longitude: 30.5015,
    type: "public",
    pricePerKwh: 0.6,
    parkingFee: 1.5,
    connectionType: "Type 2",
    slotsAvailable: true,
  },
  {
    id: "charles",
    name: "ЗАРЯДНА СТАНЦІЯ CHARLES",
    address: "вул. Проста, 101, м. Київ, Україна",
    distance: "10.5 км",
    timeText: "25 хв",
    rating: 4,
    latitude: 50.4680,
    longitude: 30.5501,
    type: "public",
    pricePerKwh: 0.45,
    parkingFee: 0.8,
    connectionType: "CCS Combo Type 2",
    slotsAvailable: true,
  },
];

export function getStationById(id: string): ChargingStation | undefined {
  return mockStations.find((s) => s.id === id);
}
