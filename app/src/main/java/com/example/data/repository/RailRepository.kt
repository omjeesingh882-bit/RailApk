package com.example.data.repository

import com.example.data.models.*
import kotlin.random.Random

object RailRepository {

    val popularStations = listOf(
        Station("NDLS", "New Delhi", "Delhi", "Delhi", 16),
        Station("HWH", "Howrah Junction", "Kolkata", "West Bengal", 23),
        Station("CSMT", "Chhatrapati Shivaji Maharaj Terminus", "Mumbai", "Maharashtra", 18),
        Station("MAS", "Puratchi Thalaivar Dr. M.G.R. Central", "Chennai", "Tamil Nadu", 12),
        Station("SBC", "KSR Bengaluru City Junction", "Bengaluru", "Karnataka", 10),
        Station("PNBE", "Patna Junction", "Patna", "Bihar", 10),
        Station("CNB", "Kanpur Central", "Kanpur", "Uttar Pradesh", 10),
        Station("BSB", "Varanasi Junction", "Varanasi", "Uttar Pradesh", 9),
        Station("LKO", "Lucknow Charbagh", "Lucknow", "Uttar Pradesh", 9),
        Station("GKP", "Gorakhpur Junction", "Gorakhpur", "Uttar Pradesh", 10),
        Station("ADI", "Ahmedabad Junction", "Ahmedabad", "Gujarat", 12),
        Station("PUNE", "Pune Junction", "Pune", "Maharashtra", 6),
        Station("PRYJ", "Prayagraj Junction", "Prayagraj", "Uttar Pradesh", 10),
        Station("HYB", "Hyderabad Deccan", "Hyderabad", "Telangana", 6),
        Station("JP", "Jaipur Junction", "Jaipur", "Rajasthan", 8),
        Station("BPL", "Bhopal Junction", "Bhopal", "Madhya Pradesh", 6),
        Station("ST", "Surat", "Surat", "Gujarat", 4),
        Station("GHY", "Guwahati", "Guwahati", "Assam", 7),
        Station("CDG", "Chandigarh Junction", "Chandigarh", "Punjab/Haryana", 6),
        Station("BJU", "Barauni Junction", "Barauni", "Bihar", 7)
    )

    private val allTrains = listOf(
        Train(
            number = "22436",
            name = "Vande Bharat Express",
            type = TrainType.VANDE_BHARAT,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "BSB" },
            departureTime = "06:00",
            arrivalTime = "14:00",
            duration = "8h 00m",
            distanceKm = 759,
            runningDays = listOf("T", "W", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.CC, "AVL 84", "AVAILABLE", 99, 1750),
                SeatAvailability(TravelClass.EC, "AVL 16", "AVAILABLE", 95, 3300)
            ),
            pantryAvailable = true,
            rating = 4.8
        ),
        Train(
            number = "12302",
            name = "Howrah Rajdhani Express",
            type = TrainType.RAJDHANI,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "HWH" },
            departureTime = "16:50",
            arrivalTime = "09:55",
            duration = "17h 05m",
            distanceKm = 1451,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.THIRD_AC, "AVL 48", "AVAILABLE", 92, 2180),
                SeatAvailability(TravelClass.SECOND_AC, "RAC 6", "RAC", 78, 3140),
                SeatAvailability(TravelClass.FIRST_AC, "AVL 4", "AVAILABLE", 88, 5180)
            ),
            pantryAvailable = true,
            rating = 4.7
        ),
        Train(
            number = "12952",
            name = "Mumbai Tejas Rajdhani",
            type = TrainType.RAJDHANI,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "CSMT" },
            departureTime = "16:55",
            arrivalTime = "08:35",
            duration = "15h 40m",
            distanceKm = 1386,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.THIRD_AC, "AVL 112", "AVAILABLE", 94, 2125),
                SeatAvailability(TravelClass.SECOND_AC, "AVL 28", "AVAILABLE", 89, 3075),
                SeatAvailability(TravelClass.FIRST_AC, "AVL 6", "AVAILABLE", 90, 4925)
            ),
            pantryAvailable = true,
            rating = 4.9
        ),
        Train(
            number = "12004",
            name = "Lucknow Shatabdi Express",
            type = TrainType.SHATABDI,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "LKO" },
            departureTime = "06:10",
            arrivalTime = "12:45",
            duration = "6h 35m",
            distanceKm = 512,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.CC, "AVL 192", "AVAILABLE", 98, 1165),
                SeatAvailability(TravelClass.EC, "AVL 24", "AVAILABLE", 96, 2125)
            ),
            pantryAvailable = true,
            rating = 4.6
        ),
        Train(
            number = "12556",
            name = "Gorakhdham Superfast Express",
            type = TrainType.SUPERFAST,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "GKP" },
            departureTime = "21:25",
            arrivalTime = "09:45",
            duration = "12h 20m",
            distanceKm = 751,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.SLEEPER, "RAC 18", "RAC", 74, 435),
                SeatAvailability(TravelClass.THIRD_AC_ECONOMY, "AVL 62", "AVAILABLE", 90, 1075),
                SeatAvailability(TravelClass.THIRD_AC, "AVL 34", "AVAILABLE", 88, 1145),
                SeatAvailability(TravelClass.SECOND_AC, "AVL 12", "AVAILABLE", 85, 1625),
                SeatAvailability(TravelClass.FIRST_AC, "AVL 2", "AVAILABLE", 80, 2750)
            ),
            pantryAvailable = true,
            rating = 4.5
        ),
        Train(
            number = "12394",
            name = "Sampoorna Kranti Express",
            type = TrainType.SUPERFAST,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "PNBE" },
            departureTime = "17:30",
            arrivalTime = "06:50",
            duration = "13h 20m",
            distanceKm = 1000,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.SLEEPER, "GNWL 32/WL 18", "WL", 62, 515),
                SeatAvailability(TravelClass.THIRD_AC, "AVL 44", "AVAILABLE", 91, 1370),
                SeatAvailability(TravelClass.SECOND_AC, "AVL 18", "AVAILABLE", 87, 1965),
                SeatAvailability(TravelClass.FIRST_AC, "AVL 4", "AVAILABLE", 90, 3315)
            ),
            pantryAvailable = true,
            rating = 4.8
        ),
        Train(
            number = "12626",
            name = "Kerala Express",
            type = TrainType.SUPERFAST,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "MAS" },
            departureTime = "20:10",
            arrivalTime = "04:30",
            duration = "32h 20m",
            distanceKm = 2180,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.SLEEPER, "AVL 140", "AVAILABLE", 95, 785),
                SeatAvailability(TravelClass.THIRD_AC, "AVL 52", "AVAILABLE", 89, 2040),
                SeatAvailability(TravelClass.SECOND_AC, "AVL 15", "AVAILABLE", 84, 2980)
            ),
            pantryAvailable = true,
            rating = 4.4
        ),
        Train(
            number = "20608",
            name = "Vande Bharat Express (Mysuru - Chennai)",
            type = TrainType.VANDE_BHARAT,
            sourceStation = popularStations.first { it.code == "SBC" },
            destStation = popularStations.first { it.code == "MAS" },
            departureTime = "14:50",
            arrivalTime = "19:20",
            duration = "4h 30m",
            distanceKm = 359,
            runningDays = listOf("M", "T", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.CC, "AVL 126", "AVAILABLE", 99, 995),
                SeatAvailability(TravelClass.EC, "AVL 28", "AVAILABLE", 96, 1885)
            ),
            pantryAvailable = true,
            rating = 4.9
        ),
        Train(
            number = "12138",
            name = "Punjab Mail",
            type = TrainType.EXPRESS,
            sourceStation = popularStations.first { it.code == "NDLS" },
            destStation = popularStations.first { it.code == "CSMT" },
            departureTime = "05:15",
            arrivalTime = "07:35",
            duration = "26h 20m",
            distanceKm = 1541,
            runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
            classes = listOf(
                SeatAvailability(TravelClass.SLEEPER, "AVL 88", "AVAILABLE", 93, 630),
                SeatAvailability(TravelClass.THIRD_AC, "AVL 42", "AVAILABLE", 86, 1690),
                SeatAvailability(TravelClass.SECOND_AC, "RAC 4", "RAC", 80, 2450)
            ),
            pantryAvailable = true,
            rating = 4.3
        )
    )

    fun searchTrains(fromCode: String, toCode: String, travelClass: TravelClass, quota: Quota): List<Train> {
        val matches = allTrains.filter { train ->
            (train.sourceStation.code.equals(fromCode, ignoreCase = true) &&
             train.destStation.code.equals(toCode, ignoreCase = true)) ||
            (train.sourceStation.code.equals(fromCode, ignoreCase = true) ||
             train.destStation.code.equals(toCode, ignoreCase = true))
        }

        if (matches.isNotEmpty()) {
            return matches
        }

        // If no direct hardcoded match, create dynamic trains between the selected pair
        val fromStation = popularStations.find { it.code.equals(fromCode, ignoreCase = true) }
            ?: Station(fromCode.uppercase(), fromCode.uppercase(), fromCode.uppercase(), "India")
        val toStation = popularStations.find { it.code.equals(toCode, ignoreCase = true) }
            ?: Station(toCode.uppercase(), toCode.uppercase(), toCode.uppercase(), "India")

        return listOf(
            Train(
                number = "22" + Random.nextInt(100, 999),
                name = "${fromStation.city} - ${toStation.city} Superfast Express",
                type = TrainType.SUPERFAST,
                sourceStation = fromStation,
                destStation = toStation,
                departureTime = "07:30",
                arrivalTime = "17:45",
                duration = "10h 15m",
                distanceKm = 680,
                runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
                classes = listOf(
                    SeatAvailability(TravelClass.SLEEPER, "AVL 64", "AVAILABLE", 94, 460),
                    SeatAvailability(TravelClass.THIRD_AC, "AVL 38", "AVAILABLE", 90, 1180),
                    SeatAvailability(TravelClass.SECOND_AC, "RAC 8", "RAC", 78, 1720)
                ),
                pantryAvailable = true,
                rating = 4.5
            ),
            Train(
                number = "20" + Random.nextInt(100, 999),
                name = "${fromStation.city} - ${toStation.city} Vande Bharat",
                type = TrainType.VANDE_BHARAT,
                sourceStation = fromStation,
                destStation = toStation,
                departureTime = "14:15",
                arrivalTime = "21:30",
                duration = "7h 15m",
                distanceKm = 680,
                runningDays = listOf("M", "T", "W", "F", "S", "S"),
                classes = listOf(
                    SeatAvailability(TravelClass.CC, "AVL 110", "AVAILABLE", 98, 1540),
                    SeatAvailability(TravelClass.EC, "AVL 18", "AVAILABLE", 92, 2890)
                ),
                pantryAvailable = true,
                rating = 4.8
            ),
            Train(
                number = "12" + Random.nextInt(100, 999),
                name = "${fromStation.city} - ${toStation.city} AC Express",
                type = TrainType.RAJDHANI,
                sourceStation = fromStation,
                destStation = toStation,
                departureTime = "20:00",
                arrivalTime = "06:15",
                duration = "10h 15m",
                distanceKm = 680,
                runningDays = listOf("M", "T", "W", "T", "F", "S", "S"),
                classes = listOf(
                    SeatAvailability(TravelClass.THIRD_AC_ECONOMY, "AVL 80", "AVAILABLE", 95, 1020),
                    SeatAvailability(TravelClass.THIRD_AC, "AVL 45", "AVAILABLE", 89, 1210),
                    SeatAvailability(TravelClass.SECOND_AC, "AVL 14", "AVAILABLE", 86, 1850)
                ),
                pantryAvailable = true,
                rating = 4.6
            )
        )
    }

    fun getLiveRunningStatus(trainQuery: String): TrainLiveRunningStatus {
        val cleanQuery = trainQuery.trim().uppercase()
        val matchedTrain = allTrains.find {
            it.number.contains(cleanQuery) || it.name.uppercase().contains(cleanQuery)
        } ?: allTrains.first()

        val stops = listOf(
            StationHalt("NDLS", "New Delhi", 0, "Source", "06:00", "Source", "06:00", 0, "1", 0, isDeparted = true, isCurrent = false),
            StationHalt("GZB", "Ghaziabad Junction", 26, "06:48", "06:50", "06:48", "06:50", 0, "2", 2, isDeparted = true, isCurrent = false),
            StationHalt("ALJN", "Aligarh Junction", 131, "07:53", "07:55", "07:55", "07:57", 2, "3", 2, isDeparted = true, isCurrent = false),
            StationHalt("TDL", "Tundla Junction", 209, "08:48", "08:50", "08:52", "08:54", 4, "4", 2, isDeparted = true, isCurrent = false),
            StationHalt("CNB", "Kanpur Central", 440, "10:08", "10:13", "10:14", "10:19", 6, "1", 5, isDeparted = false, isCurrent = true),
            StationHalt("PRYJ", "Prayagraj Junction", 635, "12:08", "12:10", "12:15", "12:17", 7, "6", 2, isDeparted = false, isCurrent = false),
            StationHalt("BSB", "Varanasi Junction", 759, "14:00", "Destination", "14:05", "Destination", 5, "1", 0, isDeparted = false, isCurrent = false)
        )

        return TrainLiveRunningStatus(
            trainNumber = matchedTrain.number,
            trainName = matchedTrain.name,
            sourceStation = matchedTrain.sourceStation.name,
            destStation = matchedTrain.destStation.name,
            currentStationName = "Approaching Kanpur Central (CNB)",
            nextStationName = "Prayagraj Junction (PRYJ)",
            delayMinutes = 6,
            statusMessage = "Running 6 mins late • Near Panki Dham",
            currentSpeedKmH = 112,
            lastUpdated = "Updated 1 min ago via GPS",
            totalDistanceKm = matchedTrain.distanceKm,
            coveredDistanceKm = 428,
            halts = stops
        )
    }

    private val samplePnrs = mapOf(
        "8421950312" to PnrDetails(
            pnrNumber = "8421950312",
            trainNumber = "22436",
            trainName = "VANDE BHARAT EXP",
            journeyDate = "28 Aug 2026",
            fromStation = popularStations.first { it.code == "NDLS" },
            toStation = popularStations.first { it.code == "BSB" },
            boardingStation = popularStations.first { it.code == "NDLS" },
            travelClass = TravelClass.CC,
            quota = Quota.GENERAL,
            chartStatus = "Chart Not Prepared",
            passengers = listOf(
                Passenger(1, "CNF", "CNF C4 23", "C4", "23", "Window Seat"),
                Passenger(2, "CNF", "CNF C4 24", "C4", "24", "Aisle Seat")
            ),
            confirmationProbability = 100,
            coachPosition = "Engine-C1-C2-C3-C4-C5-E1-E2-C6-C7-C8",
            farePaid = 3500
        ),
        "2341908472" to PnrDetails(
            pnrNumber = "2341908472",
            trainNumber = "12302",
            trainName = "HOWRAH RAJDHANI",
            journeyDate = "30 Aug 2026",
            fromStation = popularStations.first { it.code == "NDLS" },
            toStation = popularStations.first { it.code == "HWH" },
            boardingStation = popularStations.first { it.code == "NDLS" },
            travelClass = TravelClass.THIRD_AC,
            quota = Quota.GENERAL,
            chartStatus = "Chart Not Prepared",
            passengers = listOf(
                Passenger(1, "WL 14", "RAC 6", "B3", "45", "Side Lower"),
                Passenger(2, "WL 15", "RAC 7", "B3", "45", "Side Lower")
            ),
            confirmationProbability = 89,
            coachPosition = "Engine-EOG-B1-B2-B3-B4-B5-B6-A1-A2-H1-PC-EOG",
            farePaid = 4360
        ),
        "6128490153" to PnrDetails(
            pnrNumber = "6128490153",
            trainNumber = "12556",
            trainName = "GORAKHDHAM EXP",
            journeyDate = "25 Aug 2026",
            fromStation = popularStations.first { it.code == "NDLS" },
            toStation = popularStations.first { it.code == "GKP" },
            boardingStation = popularStations.first { it.code == "NDLS" },
            travelClass = TravelClass.SLEEPER,
            quota = Quota.GENERAL,
            chartStatus = "Chart Prepared",
            passengers = listOf(
                Passenger(1, "WL 38", "CNF S5 34", "S5", "34", "Lower Berth"),
                Passenger(2, "WL 39", "CNF S5 35", "S5", "35", "Middle Berth")
            ),
            confirmationProbability = 100,
            coachPosition = "Engine-SLR-GEN-S1-S2-S3-S4-S5-S6-B1-B2-A1-GEN-SLR",
            farePaid = 870
        )
    )

    fun getPnrDetails(pnr: String): PnrDetails {
        val cleanPnr = pnr.trim()
        if (samplePnrs.containsKey(cleanPnr)) {
            return samplePnrs[cleanPnr]!!
        }

        // Generate realistic dynamic PNR details
        return PnrDetails(
            pnrNumber = cleanPnr,
            trainNumber = "12394",
            trainName = "SAMPOORNA KRANTI EXP",
            journeyDate = "29 Aug 2026",
            fromStation = popularStations.first { it.code == "NDLS" },
            toStation = popularStations.first { it.code == "PNBE" },
            boardingStation = popularStations.first { it.code == "NDLS" },
            travelClass = TravelClass.THIRD_AC,
            quota = Quota.GENERAL,
            chartStatus = "Chart Not Prepared",
            passengers = listOf(
                Passenger(1, "WL 8", "CNF B2 18", "B2", "18", "Lower Berth"),
                Passenger(2, "WL 9", "CNF B2 19", "B2", "19", "Middle Berth")
            ),
            confirmationProbability = 94,
            coachPosition = "Engine-SLR-GEN-S1-S2-B1-B2-B3-B4-A1-H1-GEN-SLR",
            farePaid = 2740
        )
    }

    fun getLiveStationTrains(stationCode: String): List<LiveStationTrain> {
        val station = popularStations.find { it.code.equals(stationCode, ignoreCase = true) }
            ?: popularStations.first()

        return listOf(
            LiveStationTrain(
                trainNumber = "22436",
                trainName = "Vande Bharat Express",
                sourceName = "New Delhi",
                destinationName = "Varanasi",
                scheduledArrival = "05:40",
                scheduledDeparture = "06:00",
                expectedArrival = "05:40",
                delayMinutes = 0,
                platformNo = "1",
                trainType = TrainType.VANDE_BHARAT
            ),
            LiveStationTrain(
                trainNumber = "12302",
                trainName = "Howrah Rajdhani Express",
                sourceName = "New Delhi",
                destinationName = "Howrah",
                scheduledArrival = "16:30",
                scheduledDeparture = "16:50",
                expectedArrival = "16:30",
                delayMinutes = 0,
                platformNo = "4",
                trainType = TrainType.RAJDHANI
            ),
            LiveStationTrain(
                trainNumber = "12556",
                trainName = "Gorakhdham Superfast",
                sourceName = "Hisar",
                destinationName = "Gorakhpur",
                scheduledArrival = "21:10",
                scheduledDeparture = "21:25",
                expectedArrival = "21:20",
                delayMinutes = 10,
                platformNo = "6",
                trainType = TrainType.SUPERFAST
            ),
            LiveStationTrain(
                trainNumber = "12004",
                trainName = "Lucknow Shatabdi",
                sourceName = "New Delhi",
                destinationName = "Lucknow",
                scheduledArrival = "05:50",
                scheduledDeparture = "06:10",
                expectedArrival = "05:50",
                delayMinutes = 0,
                platformNo = "2",
                trainType = TrainType.SHATABDI
            ),
            LiveStationTrain(
                trainNumber = "12952",
                trainName = "Mumbai Tejas Rajdhani",
                sourceName = "New Delhi",
                destinationName = "Mumbai CSMT",
                scheduledArrival = "16:35",
                scheduledDeparture = "16:55",
                expectedArrival = "16:35",
                delayMinutes = 0,
                platformNo = "3",
                trainType = TrainType.RAJDHANI
            ),
            LiveStationTrain(
                trainNumber = "12394",
                trainName = "Sampoorna Kranti Express",
                sourceName = "New Delhi",
                destinationName = "Patna Junction",
                scheduledArrival = "17:10",
                scheduledDeparture = "17:30",
                expectedArrival = "17:42",
                delayMinutes = 12,
                platformNo = "5",
                trainType = TrainType.SUPERFAST
            )
        )
    }

    val samplePnrList = listOf("8421950312", "2341908472", "6128490153")

    val emergencyHelplines = listOf(
        Pair("139", "RailMadad Integrated Railway Helpline (Security, Medical, PNR, Catering)"),
        Pair("182", "Railway Protection Force (RPF) Security Emergency"),
        Pair("112", "National Emergency Number"),
        Pair("1072", "Railway Accident Emergency Helpline"),
        Pair("1800-111-139", "IRCTC E-Catering Customer Support")
    )
}
