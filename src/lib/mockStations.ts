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
    name: "RB ROAD CHARGING STATION",
    address: "5th Street, LM Road, XYZ City, US, LM509A",
    distance: "1.0 km",
    timeText: "2 min",
    rating: 4,
    latitude: 45, // percentage y
    longitude: 60, // percentage x
    type: "public",
    pricePerKwh: 0.5,
    parkingFee: 1.0,
    connectionType: "Type 3",
    slotsAvailable: true,
  },
  {
    id: "subway",
    name: "SUBWAY CHARGING STATION",
    address: "10th Cross, Iaancer Road, ABC City, US, LM509A",
    distance: "2.5 km",
    timeText: "5 min",
    rating: 4,
    latitude: 35,
    longitude: 30,
    type: "public",
    pricePerKwh: 0.6,
    parkingFee: 1.5,
    connectionType: "Type 2",
    slotsAvailable: true,
  },
  {
    id: "charles",
    name: "CHARLES CHARGING STATION",
    address: "101, VB Street, Simple Road, Figma City, US, LM509A",
    distance: "10.5 km",
    timeText: "25 min",
    rating: 4,
    latitude: 25,
    longitude: 70,
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
