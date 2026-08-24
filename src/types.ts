export type TrainType = 
  | 'VANDE_BHARAT' 
  | 'RAJDHANI' 
  | 'SHATABDI' 
  | 'TEJAS' 
  | 'DURONTO' 
  | 'SUPERFAST' 
  | 'EXPRESS' 
  | 'GARIB_RATH';

export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  platformsCount: number;
  isJunction?: boolean;
}

export type TravelClassCode = '1A' | '2A' | '3A' | '3E' | 'SL' | 'CC' | 'EC' | '2S' | 'EA';

export interface SeatAvailability {
  travelClass: TravelClassCode;
  className: string;
  status: string; // "AVL 84", "RAC 6", "GNWL 32/WL 18"
  statusCode: 'AVAILABLE' | 'RAC' | 'WL';
  confirmationChance: number; // 0 - 100
  fare: number;
  lastUpdated: string;
}

export interface Train {
  number: string;
  name: string;
  type: TrainType;
  sourceStation: Station;
  destStation: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runningDays: string[]; // ["M", "T", "W", "T", "F", "S", "S"]
  classes: SeatAvailability[];
  pantryAvailable: boolean;
  rating: number;
  viaStations?: string[];
}

export interface StationHalt {
  stationCode: string;
  stationName: string;
  distanceKm: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival: string;
  actualDeparture: string;
  delayMinutes: number;
  platformNo: string;
  haltMinutes: number;
  isDeparted: boolean;
  isCurrent: boolean;
  dayCount: number;
  elevationMeters?: number;
  weatherTempC?: number;
  weatherDesc?: string;
}

export interface TrainLiveRunningStatus {
  trainNumber: string;
  trainName: string;
  sourceStation: string;
  destStation: string;
  currentStationName: string;
  nextStationName: string;
  delayMinutes: number;
  statusMessage: string;
  currentSpeedKmH: number;
  lastUpdated: string;
  totalDistanceKm: number;
  coveredDistanceKm: number;
  halts: StationHalt[];
}

export interface Passenger {
  passengerNo: number;
  bookingStatus: string;
  currentStatus: string;
  coach: string;
  berth: string;
  berthType: string; // "Lower Berth", "Middle Berth", "Upper Berth", "Side Lower", "Side Upper", "Window Seat"
}

export interface PnrDetails {
  pnrNumber: string;
  trainNumber: string;
  trainName: string;
  journeyDate: string;
  fromStation: Station;
  toStation: Station;
  boardingStation: Station;
  travelClass: TravelClassCode;
  quota: string;
  chartStatus: string;
  passengers: Passenger[];
  confirmationProbability: number;
  coachPosition: string;
  farePaid: number;
}

export interface LiveStationTrain {
  trainNumber: string;
  trainName: string;
  sourceName: string;
  destinationName: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  expectedArrival: string;
  delayMinutes: number;
  platformNo: string;
  trainType: TrainType;
  statusText: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  quickReplies?: string[];
}
