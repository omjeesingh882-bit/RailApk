import { Station, Train, TrainLiveRunningStatus, PnrDetails, LiveStationTrain } from '../types';

export const popularStations: Station[] = [
  { code: 'NDLS', name: 'New Delhi', city: 'Delhi', state: 'Delhi', platformsCount: 16, isJunction: true },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', platformsCount: 23, isJunction: true },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai', state: 'Maharashtra', platformsCount: 18, isJunction: true },
  { code: 'MAS', name: 'Puratchi Thalaivar Dr. M.G.R. Central', city: 'Chennai', state: 'Tamil Nadu', platformsCount: 12, isJunction: true },
  { code: 'SBC', name: 'KSR Bengaluru City Junction', city: 'Bengaluru', state: 'Karnataka', platformsCount: 10, isJunction: true },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar', platformsCount: 10, isJunction: true },
  { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh', platformsCount: 10, isJunction: true },
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh', platformsCount: 9, isJunction: true },
  { code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh', platformsCount: 9, isJunction: true },
  { code: 'GKP', name: 'Gorakhpur Junction', city: 'Gorakhpur', state: 'Uttar Pradesh', platformsCount: 10, isJunction: true },
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat', platformsCount: 12, isJunction: true },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra', platformsCount: 6, isJunction: true },
  { code: 'PRYJ', name: 'Prayagraj Junction', city: 'Prayagraj', state: 'Uttar Pradesh', platformsCount: 10, isJunction: true },
  { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana', platformsCount: 6, isJunction: true },
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan', platformsCount: 8, isJunction: true },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh', platformsCount: 6, isJunction: true },
  { code: 'ST', name: 'Surat', city: 'Surat', state: 'Gujarat', platformsCount: 4, isJunction: true },
  { code: 'GHY', name: 'Guwahati', city: 'Guwahati', state: 'Assam', platformsCount: 7, isJunction: true },
  { code: 'CDG', name: 'Chandigarh Junction', city: 'Chandigarh', state: 'Punjab/Haryana', platformsCount: 6, isJunction: true },
  { code: 'BJU', name: 'Barauni Junction', city: 'Barauni', state: 'Bihar', platformsCount: 7, isJunction: true }
];

export const allTrains: Train[] = [
  {
    number: '22436',
    name: 'Vande Bharat Express',
    type: 'VANDE_BHARAT',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[7], // BSB
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    distanceKm: 759,
    runningDays: ['T', 'W', 'F', 'S', 'S'],
    classes: [
      { travelClass: 'CC', className: 'AC Chair Car', status: 'AVL 84', statusCode: 'AVAILABLE', confirmationChance: 99, fare: 1750, lastUpdated: '2 mins ago' },
      { travelClass: 'EC', className: 'Executive Class', status: 'AVL 16', statusCode: 'AVAILABLE', confirmationChance: 95, fare: 3300, lastUpdated: '5 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.8,
    viaStations: ['Kanpur Central', 'Prayagraj Junction']
  },
  {
    number: '12302',
    name: 'Howrah Rajdhani Express',
    type: 'RAJDHANI',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[1], // HWH
    departureTime: '16:50',
    arrivalTime: '09:55',
    duration: '17h 05m',
    distanceKm: 1451,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: '3A', className: 'AC 3 Tier', status: 'AVL 48', statusCode: 'AVAILABLE', confirmationChance: 92, fare: 2180, lastUpdated: '4 mins ago' },
      { travelClass: '2A', className: 'AC 2 Tier', status: 'RAC 6', statusCode: 'RAC', confirmationChance: 78, fare: 3140, lastUpdated: '10 mins ago' },
      { travelClass: '1A', className: 'AC First Class', status: 'AVL 4', statusCode: 'AVAILABLE', confirmationChance: 88, fare: 5180, lastUpdated: '12 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.7,
    viaStations: ['Kanpur Central', 'Prayagraj Junction', 'Pt. Deen Dayal Upadhyaya Jn', 'Dhanbad']
  },
  {
    number: '12952',
    name: 'Mumbai Tejas Rajdhani',
    type: 'RAJDHANI',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[2], // CSMT
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    distanceKm: 1386,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: '3A', className: 'AC 3 Tier', status: 'AVL 112', statusCode: 'AVAILABLE', confirmationChance: 94, fare: 2125, lastUpdated: 'Just now' },
      { travelClass: '2A', className: 'AC 2 Tier', status: 'AVL 28', statusCode: 'AVAILABLE', confirmationChance: 89, fare: 3075, lastUpdated: '15 mins ago' },
      { travelClass: '1A', className: 'AC First Class', status: 'AVL 6', statusCode: 'AVAILABLE', confirmationChance: 90, fare: 4925, lastUpdated: '18 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.9,
    viaStations: ['Kota Junction', 'Vadodara Junction', 'Surat']
  },
  {
    number: '12004',
    name: 'Lucknow Shatabdi Express',
    type: 'SHATABDI',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[8], // LKO
    departureTime: '06:10',
    arrivalTime: '12:45',
    duration: '6h 35m',
    distanceKm: 512,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: 'CC', className: 'AC Chair Car', status: 'AVL 192', statusCode: 'AVAILABLE', confirmationChance: 98, fare: 1165, lastUpdated: '3 mins ago' },
      { travelClass: 'EC', className: 'Executive Class', status: 'AVL 24', statusCode: 'AVAILABLE', confirmationChance: 96, fare: 2125, lastUpdated: '8 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.6,
    viaStations: ['Ghaziabad', 'Aligarh Junction', 'Kanpur Central']
  },
  {
    number: '12556',
    name: 'Gorakhdham Superfast Express',
    type: 'SUPERFAST',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[9], // GKP
    departureTime: '21:25',
    arrivalTime: '09:45',
    duration: '12h 20m',
    distanceKm: 751,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: 'SL', className: 'Sleeper', status: 'RAC 18', statusCode: 'RAC', confirmationChance: 74, fare: 435, lastUpdated: '5 mins ago' },
      { travelClass: '3E', className: 'AC 3 Economy', status: 'AVL 62', statusCode: 'AVAILABLE', confirmationChance: 90, fare: 1075, lastUpdated: '6 mins ago' },
      { travelClass: '3A', className: 'AC 3 Tier', status: 'AVL 34', statusCode: 'AVAILABLE', confirmationChance: 88, fare: 1145, lastUpdated: '7 mins ago' },
      { travelClass: '2A', className: 'AC 2 Tier', status: 'AVL 12', statusCode: 'AVAILABLE', confirmationChance: 85, fare: 1625, lastUpdated: '9 mins ago' },
      { travelClass: '1A', className: 'AC First Class', status: 'AVL 2', statusCode: 'AVAILABLE', confirmationChance: 80, fare: 2750, lastUpdated: '14 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.5,
    viaStations: ['New Delhi', 'Kanpur Central', 'Lucknow Charbagh', 'Basti']
  },
  {
    number: '12394',
    name: 'Sampoorna Kranti Express',
    type: 'SUPERFAST',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[5], // PNBE
    departureTime: '17:30',
    arrivalTime: '06:50',
    duration: '13h 20m',
    distanceKm: 1000,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: 'SL', className: 'Sleeper', status: 'GNWL 32/WL 18', statusCode: 'WL', confirmationChance: 62, fare: 515, lastUpdated: '1 min ago' },
      { travelClass: '3A', className: 'AC 3 Tier', status: 'AVL 44', statusCode: 'AVAILABLE', confirmationChance: 91, fare: 1370, lastUpdated: '4 mins ago' },
      { travelClass: '2A', className: 'AC 2 Tier', status: 'AVL 18', statusCode: 'AVAILABLE', confirmationChance: 87, fare: 1965, lastUpdated: '11 mins ago' },
      { travelClass: '1A', className: 'AC First Class', status: 'AVL 4', statusCode: 'AVAILABLE', confirmationChance: 90, fare: 3315, lastUpdated: '20 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.8,
    viaStations: ['Kanpur Central', 'Mirzapur', 'Pt. Deen Dayal Upadhyaya Jn']
  },
  {
    number: '12626',
    name: 'Kerala Superfast Express',
    type: 'SUPERFAST',
    sourceStation: popularStations[0], // NDLS
    destStation: popularStations[3], // MAS
    departureTime: '20:10',
    arrivalTime: '04:30',
    duration: '32h 20m',
    distanceKm: 2182,
    runningDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    classes: [
      { travelClass: 'SL', className: 'Sleeper', status: 'AVL 88', statusCode: 'AVAILABLE', confirmationChance: 95, fare: 785, lastUpdated: '3 mins ago' },
      { travelClass: '3A', className: 'AC 3 Tier', status: 'AVL 40', statusCode: 'AVAILABLE', confirmationChance: 90, fare: 2060, lastUpdated: '7 mins ago' },
      { travelClass: '2A', className: 'AC 2 Tier', status: 'RAC 4', statusCode: 'RAC', confirmationChance: 82, fare: 2990, lastUpdated: '15 mins ago' }
    ],
    pantryAvailable: true,
    rating: 4.4,
    viaStations: ['Agra Cantt', 'Bhopal Junction', 'Nagpur', 'Vijayawada']
  }
];

export const liveTrackingDataMap: Record<string, TrainLiveRunningStatus> = {
  '22436': {
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    sourceStation: 'New Delhi (NDLS)',
    destStation: 'Varanasi Junction (BSB)',
    currentStationName: 'Kanpur Central (CNB)',
    nextStationName: 'Prayagraj Junction (PRYJ)',
    delayMinutes: 0,
    statusMessage: 'On Time • Departed Kanpur Central',
    currentSpeedKmH: 128,
    lastUpdated: '1 min ago (Live GPS)',
    totalDistanceKm: 759,
    coveredDistanceKm: 440,
    halts: [
      { stationCode: 'NDLS', stationName: 'New Delhi', distanceKm: 0, scheduledArrival: 'Source', scheduledDeparture: '06:00', actualArrival: 'Source', actualDeparture: '06:00', delayMinutes: 0, platformNo: '16', haltMinutes: 0, isDeparted: true, isCurrent: false, dayCount: 1, elevationMeters: 216, weatherTempC: 22, weatherDesc: 'Clear Sky' },
      { stationCode: 'CNB', stationName: 'Kanpur Central', distanceKm: 440, scheduledArrival: '10:08', scheduledDeparture: '10:10', actualArrival: '10:08', actualDeparture: '10:11', delayMinutes: 0, platformNo: '5', haltMinutes: 2, isDeparted: true, isCurrent: true, dayCount: 1, elevationMeters: 126, weatherTempC: 28, weatherDesc: 'Partly Cloudy' },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', distanceKm: 635, scheduledArrival: '12:08', scheduledDeparture: '12:10', actualArrival: '12:08 (Exp)', actualDeparture: '12:10 (Exp)', delayMinutes: 0, platformNo: '6', haltMinutes: 2, isDeparted: false, isCurrent: false, dayCount: 1, elevationMeters: 98, weatherTempC: 30, weatherDesc: 'Sunny' },
      { stationCode: 'BSB', stationName: 'Varanasi Junction', distanceKm: 759, scheduledArrival: '14:00', scheduledDeparture: 'Destination', actualArrival: '14:00 (Exp)', actualDeparture: 'Destination', delayMinutes: 0, platformNo: '1', haltMinutes: 0, isDeparted: false, isCurrent: false, dayCount: 1, elevationMeters: 80, weatherTempC: 31, weatherDesc: 'Sunny' }
    ]
  },
  '12302': {
    trainNumber: '12302',
    trainName: 'Howrah Rajdhani Express',
    sourceStation: 'New Delhi (NDLS)',
    destStation: 'Howrah Junction (HWH)',
    currentStationName: 'Pt. Deen Dayal Upadhyaya Jn (DDU)',
    nextStationName: 'Gaya Junction (GAYA)',
    delayMinutes: 14,
    statusMessage: 'Running 14m Late • Approaching Gaya Junction',
    currentSpeedKmH: 115,
    lastUpdated: 'Just now (Cellular Tower)',
    totalDistanceKm: 1451,
    coveredDistanceKm: 792,
    halts: [
      { stationCode: 'NDLS', stationName: 'New Delhi', distanceKm: 0, scheduledArrival: 'Source', scheduledDeparture: '16:50', actualArrival: 'Source', actualDeparture: '16:50', delayMinutes: 0, platformNo: '9', haltMinutes: 0, isDeparted: true, isCurrent: false, dayCount: 1, elevationMeters: 216, weatherTempC: 24, weatherDesc: 'Clear' },
      { stationCode: 'CNB', stationName: 'Kanpur Central', distanceKm: 440, scheduledArrival: '21:32', scheduledDeparture: '21:37', actualArrival: '21:35', actualDeparture: '21:40', delayMinutes: 3, platformNo: '4', haltMinutes: 5, isDeparted: true, isCurrent: false, dayCount: 1, elevationMeters: 126, weatherTempC: 27, weatherDesc: 'Haze' },
      { stationCode: 'PRYJ', stationName: 'Prayagraj Junction', distanceKm: 635, scheduledArrival: '23:43', scheduledDeparture: '23:45', actualArrival: '23:50', actualDeparture: '23:53', delayMinutes: 8, platformNo: '4', haltMinutes: 3, isDeparted: true, isCurrent: false, dayCount: 1, elevationMeters: 98, weatherTempC: 26, weatherDesc: 'Clear' },
      { stationCode: 'DDU', stationName: 'Pt. Deen Dayal Upadhyaya Jn', distanceKm: 788, scheduledArrival: '01:42', scheduledDeparture: '01:52', actualArrival: '01:54', actualDeparture: '02:06', delayMinutes: 14, platformNo: '2', haltMinutes: 10, isDeparted: true, isCurrent: true, dayCount: 2, elevationMeters: 78, weatherTempC: 25, weatherDesc: 'Mist' },
      { stationCode: 'GAYA', stationName: 'Gaya Junction', distanceKm: 993, scheduledArrival: '03:55', scheduledDeparture: '03:58', actualArrival: '04:10 (Exp)', actualDeparture: '04:13 (Exp)', delayMinutes: 15, platformNo: '1', haltMinutes: 3, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 113, weatherTempC: 24, weatherDesc: 'Clear' },
      { stationCode: 'DHN', stationName: 'Dhanbad Junction', distanceKm: 1194, scheduledArrival: '06:18', scheduledDeparture: '06:23', actualArrival: '06:30 (Exp)', actualDeparture: '06:35 (Exp)', delayMinutes: 12, platformNo: '1', haltMinutes: 5, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 227, weatherTempC: 26, weatherDesc: 'Partly Cloudy' },
      { stationCode: 'ASN', stationName: 'Asansol Junction', distanceKm: 1253, scheduledArrival: '07:09', scheduledDeparture: '07:11', actualArrival: '07:18 (Exp)', actualDeparture: '07:20 (Exp)', delayMinutes: 9, platformNo: '5', haltMinutes: 2, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 126, weatherTempC: 28, weatherDesc: 'Sunny' },
      { stationCode: 'HWH', stationName: 'Howrah Junction', distanceKm: 1451, scheduledArrival: '09:55', scheduledDeparture: 'Destination', actualArrival: '10:05 (Exp)', actualDeparture: 'Destination', delayMinutes: 10, platformNo: '8', haltMinutes: 0, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 12, weatherTempC: 32, weatherDesc: 'Warm & Humid' }
    ]
  },
  '12952': {
    trainNumber: '12952',
    trainName: 'Mumbai Tejas Rajdhani',
    sourceStation: 'New Delhi (NDLS)',
    destStation: 'Mumbai CSMT (CSMT)',
    currentStationName: 'Kota Junction (KOTA)',
    nextStationName: 'Ratlam Junction (RTM)',
    delayMinutes: 0,
    statusMessage: 'On Time • High Speed Track 130 km/h',
    currentSpeedKmH: 130,
    lastUpdated: 'Just now',
    totalDistanceKm: 1386,
    coveredDistanceKm: 466,
    halts: [
      { stationCode: 'NDLS', stationName: 'New Delhi', distanceKm: 0, scheduledArrival: 'Source', scheduledDeparture: '16:55', actualArrival: 'Source', actualDeparture: '16:55', delayMinutes: 0, platformNo: '3', haltMinutes: 0, isDeparted: true, isCurrent: false, dayCount: 1, elevationMeters: 216, weatherTempC: 24, weatherDesc: 'Clear' },
      { stationCode: 'KOTA', stationName: 'Kota Junction', distanceKm: 466, scheduledArrival: '21:30', scheduledDeparture: '21:40', actualArrival: '21:28', actualDeparture: '21:40', delayMinutes: 0, platformNo: '1', haltMinutes: 10, isDeparted: true, isCurrent: true, dayCount: 1, elevationMeters: 253, weatherTempC: 26, weatherDesc: 'Clear' },
      { stationCode: 'RTM', stationName: 'Ratlam Junction', distanceKm: 732, scheduledArrival: '00:25', scheduledDeparture: '00:28', actualArrival: '00:25 (Exp)', actualDeparture: '00:28 (Exp)', delayMinutes: 0, platformNo: '4', haltMinutes: 3, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 493, weatherTempC: 23, weatherDesc: 'Cool' },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', distanceKm: 993, scheduledArrival: '03:45', scheduledDeparture: '03:55', actualArrival: '03:45 (Exp)', actualDeparture: '03:55 (Exp)', delayMinutes: 0, platformNo: '1', haltMinutes: 10, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 36, weatherTempC: 27, weatherDesc: 'Clear' },
      { stationCode: 'ST', stationName: 'Surat', distanceKm: 1123, scheduledArrival: '05:13', scheduledDeparture: '05:18', actualArrival: '05:13 (Exp)', actualDeparture: '05:18 (Exp)', delayMinutes: 0, platformNo: '2', haltMinutes: 5, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 17, weatherTempC: 29, weatherDesc: 'Humid' },
      { stationCode: 'BVI', stationName: 'Borivali', distanceKm: 1356, scheduledArrival: '07:58', scheduledDeparture: '08:00', actualArrival: '07:58 (Exp)', actualDeparture: '08:00 (Exp)', delayMinutes: 0, platformNo: '7', haltMinutes: 2, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 14, weatherTempC: 30, weatherDesc: 'Warm' },
      { stationCode: 'CSMT', stationName: 'Mumbai CSMT', distanceKm: 1386, scheduledArrival: '08:35', scheduledDeparture: 'Destination', actualArrival: '08:35 (Exp)', actualDeparture: 'Destination', delayMinutes: 0, platformNo: '18', haltMinutes: 0, isDeparted: false, isCurrent: false, dayCount: 2, elevationMeters: 8, weatherTempC: 31, weatherDesc: 'Sunny' }
    ]
  }
};

export const samplePnrDatabase: Record<string, PnrDetails> = {
  '2456891023': {
    pnrNumber: '2456891023',
    trainNumber: '12302',
    trainName: 'Howrah Rajdhani Express',
    journeyDate: '28 Aug 2026',
    fromStation: popularStations[0], // NDLS
    toStation: popularStations[1], // HWH
    boardingStation: popularStations[0],
    travelClass: '3A',
    quota: 'General (GN)',
    chartStatus: 'Chart Prepared',
    passengers: [
      { passengerNo: 1, bookingStatus: 'CNF B4 23', currentStatus: 'CNF B4 23', coach: 'B4', berth: '23', berthType: 'Lower Berth (LB)' },
      { passengerNo: 2, bookingStatus: 'CNF B4 24', currentStatus: 'CNF B4 24', coach: 'B4', berth: '24', berthType: 'Middle Berth (MB)' }
    ],
    confirmationProbability: 100,
    coachPosition: 'Engine - EOG - B1 - B2 - B3 - [B4] - B5 - B6 - A1 - A2 - H1 - PC - EOG',
    farePaid: 4360
  },
  '8123456789': {
    pnrNumber: '8123456789',
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    journeyDate: '26 Aug 2026',
    fromStation: popularStations[0], // NDLS
    toStation: popularStations[7], // BSB
    boardingStation: popularStations[0],
    travelClass: 'CC',
    quota: 'General (GN)',
    chartStatus: 'Chart Not Prepared (Final chart at 02:00 AM)',
    passengers: [
      { passengerNo: 1, bookingStatus: 'WL 14', currentStatus: 'RAC 4', coach: 'C3', berth: '18', berthType: 'Window Seat (WS)' },
      { passengerNo: 2, bookingStatus: 'WL 15', currentStatus: 'RAC 5', coach: 'C3', berth: '19', berthType: 'Aisle Seat (AS)' }
    ],
    confirmationProbability: 92,
    coachPosition: 'DTC - C1 - C2 - [C3] - C4 - C5 - C6 - C7 - EC1 - EC2 - DTC',
    farePaid: 3500
  },
  '6789012345': {
    pnrNumber: '6789012345',
    trainNumber: '12556',
    trainName: 'Gorakhdham Superfast Express',
    journeyDate: '29 Aug 2026',
    fromStation: popularStations[0], // NDLS
    toStation: popularStations[9], // GKP
    boardingStation: popularStations[0],
    travelClass: 'SL',
    quota: 'Tatkal (TQ)',
    chartStatus: 'Chart Not Prepared',
    passengers: [
      { passengerNo: 1, bookingStatus: 'TQWL 6', currentStatus: 'CNF S3 48', coach: 'S3', berth: '48', berthType: 'Side Upper (SU)' }
    ],
    confirmationProbability: 98,
    coachPosition: 'SLR - GEN - GEN - S1 - S2 - [S3] - S4 - S5 - B1 - B2 - A1 - GEN - SLR',
    farePaid: 585
  }
};

export const emergencyHelplines = [
  { service: 'RailMadad All-in-One Helpline', number: '139', desc: 'Security, Medical, Complaints, Enquiries', icon: 'PhoneCall', primary: true },
  { service: 'RPF Railway Security / Emergency', number: '182 / 112', desc: 'Instant armed security & police response in train', icon: 'ShieldAlert', primary: true },
  { service: 'Government Railway Police (GRP)', number: '1512', desc: 'Station law enforcement & FIR assistance', icon: 'Siren', primary: false },
  { service: 'Women Passenger Helpline', number: '1091', desc: 'Dedicated 24/7 security for female commuters', icon: 'HeartHandshake', primary: false },
  { service: 'National Disaster / Medical SOS', number: '108', desc: 'Ambulance & paramedic escort at next station halt', icon: 'Ambulance', primary: false }
];
