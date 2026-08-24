package com.example.data.models

enum class TrainType(val label: String, val badgeColorHex: Long) {
    VANDE_BHARAT("Vande Bharat", 0xFF0284C7),
    RAJDHANI("Rajdhani Express", 0xFFDC2626),
    SHATABDI("Shatabdi Express", 0xFF2563EB),
    TEJAS("Tejas Express", 0xFFD97706),
    DURONTO("Duronto Express", 0xFF059669),
    SUPERFAST("Superfast", 0xFF4F46E5),
    EXPRESS("Mail / Express", 0xFF475569),
    GARIB_RATH("Garib Rath", 0xFF15803D)
}

enum class TravelClass(val code: String, val fullName: String) {
    ALL("All", "All Classes"),
    EC("EC", "Executive Class"),
    CC("CC", "AC Chair Car"),
    EA("EA", "Anubhuti"),
    FIRST_AC("1A", "AC First Class"),
    SECOND_AC("2A", "AC 2 Tier"),
    THIRD_AC("3A", "AC 3 Tier"),
    THIRD_AC_ECONOMY("3E", "AC 3 Economy"),
    SLEEPER("SL", "Sleeper"),
    SECOND_SEATING("2S", "Second Seating")
}

enum class Quota(val code: String, val fullName: String) {
    GENERAL("GN", "General Quota"),
    TATKAL("TQ", "Tatkal Quota"),
    PREMIUM_TATKAL("PT", "Premium Tatkal"),
    LADIES("LD", "Ladies Quota"),
    SENIOR_CITIZEN("SS", "Senior Citizen / Lower Berth"),
    DIVYANG("HP", "Divyangjan Quota")
}

data class Station(
    val code: String,
    val name: String,
    val city: String,
    val state: String,
    val platformsCount: Int = 10,
    val isJunction: Boolean = true
)

data class SeatAvailability(
    val travelClass: TravelClass,
    val status: String, // "AVL 42", "RAC 14", "GNWL 8/WL 6"
    val statusCode: String, // "AVAILABLE", "RAC", "WL"
    val confirmationChance: Int, // 0 - 100%
    val fare: Int,
    val lastUpdated: String = "2 mins ago"
)

data class Train(
    val number: String,
    val name: String,
    val type: TrainType,
    val sourceStation: Station,
    val destStation: Station,
    val departureTime: String,
    val arrivalTime: String,
    val duration: String,
    val distanceKm: Int,
    val runningDays: List<String>, // "M", "T", "W", "T", "F", "S", "S"
    val classes: List<SeatAvailability>,
    val pantryAvailable: Boolean = true,
    val rating: Double = 4.6
)

data class StationHalt(
    val stationCode: String,
    val stationName: String,
    val distanceKm: Int,
    val scheduledArrival: String,
    val scheduledDeparture: String,
    val actualArrival: String,
    val actualDeparture: String,
    val delayMinutes: Int,
    val platformNo: String,
    val haltMinutes: Int,
    val isDeparted: Boolean,
    val isCurrent: Boolean,
    val dayCount: Int = 1
)

data class TrainLiveRunningStatus(
    val trainNumber: String,
    val trainName: String,
    val sourceStation: String,
    val destStation: String,
    val currentStationName: String,
    val nextStationName: String,
    val delayMinutes: Int,
    val statusMessage: String,
    val currentSpeedKmH: Int,
    val lastUpdated: String,
    val totalDistanceKm: Int,
    val coveredDistanceKm: Int,
    val halts: List<StationHalt>
)

data class Passenger(
    val passengerNo: Int,
    val bookingStatus: String, // "W/L 24" or "CNF"
    val currentStatus: String, // "CNF B3 42 MB" or "RAC 4" or "WL 12"
    val coach: String,
    val berth: String,
    val berthType: String // "Lower Berth", "Middle Berth", "Upper Berth", "Side Lower", "Window"
)

data class PnrDetails(
    val pnrNumber: String,
    val trainNumber: String,
    val trainName: String,
    val journeyDate: String,
    val fromStation: Station,
    val toStation: Station,
    val boardingStation: Station,
    val travelClass: TravelClass,
    val quota: Quota,
    val chartStatus: String, // "Chart Prepared" or "Chart Not Prepared"
    val passengers: List<Passenger>,
    val confirmationProbability: Int,
    val coachPosition: String = "Engine-SLR-GEN-B1-B2-B3-B4-B5-A1-A2-H1-GEN-SLR",
    val farePaid: Int
)

data class LiveStationTrain(
    val trainNumber: String,
    val trainName: String,
    val sourceName: String,
    val destinationName: String,
    val scheduledArrival: String,
    val scheduledDeparture: String,
    val expectedArrival: String,
    val delayMinutes: Int,
    val platformNo: String,
    val trainType: TrainType
)

data class ChatMessage(
    val id: String,
    val text: String,
    val isUser: Boolean,
    val timestamp: Long = System.currentTimeMillis(),
    val quickReplies: List<String> = emptyList()
)
