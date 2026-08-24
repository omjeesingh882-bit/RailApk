package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Chair
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.MeetingRoom
import androidx.compose.material.icons.filled.Wc
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*

enum class VisualCoachType(val label: String, val seatsCount: Int, val description: String) {
    VANDE_BHARAT_CC("Vande Bharat CC (Chair Car)", 78, "3x2 Seating layout with aerated swivel seats"),
    VANDE_BHARAT_EC("Vande Bharat EC (Executive)", 52, "2x2 Luxury 180° Rotational Executive Seats"),
    LHB_3A("AC 3 Tier (3A)", 72, "Lower, Middle, Upper + Side Lower, Side Upper berths"),
    LHB_2A("AC 2 Tier (2A)", 54, "Spacious 2x2 with reading lights and privacy curtains"),
    LHB_1A("AC First Class (1A)", 24, "Lockable 2-berth Coupe & 4-berth Cabins"),
    LHB_SL("Sleeper Class (SL)", 80, "Classic 8-berth compartment layout")
}

@Composable
fun CoachLayoutVisualizer(
    modifier: Modifier = Modifier
) {
    var selectedCoach by remember { mutableStateOf(VisualCoachType.VANDE_BHARAT_CC) }
    var selectedSeatNum by remember { mutableStateOf<Int?>(null) }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "COACH LAYOUT & SEAT MAP",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = TextSecondaryLight
            )
            Spacer(modifier = Modifier.height(8.dp))

            // Coach Selector Tabs
            ScrollableTabRow(
                selectedTabIndex = selectedCoach.ordinal,
                edgePadding = 0.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                VisualCoachType.values().forEach { coach ->
                    Tab(
                        selected = selectedCoach == coach,
                        onClick = {
                            selectedCoach = coach
                            selectedSeatNum = null
                        },
                        text = {
                            Text(
                                text = coach.label.substringBefore(" ("),
                                fontWeight = if (selectedCoach == coach) FontWeight.Bold else FontWeight.Normal,
                                fontSize = 12.sp
                            )
                        }
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = selectedCoach.description,
                fontSize = 11.sp,
                color = TextSecondaryLight
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Train Coach Outer Shell
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .border(2.dp, SkyBluePrimary, RoundedCornerShape(12.dp))
                    .background(Color(0xFFF8FAFC))
                    .padding(10.dp)
            ) {
                // Coach End 1: Entry / Restroom / Pantry
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFFE2E8F0), RoundedCornerShape(6.dp))
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.MeetingRoom, contentDescription = null, modifier = Modifier.size(14.dp), tint = TextSecondaryLight)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Door Entry / Exit", fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = TextSecondaryLight)
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Wc, contentDescription = null, modifier = Modifier.size(14.dp), tint = SkyBluePrimary)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Bio-Toilet", fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = SkyBluePrimary)
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Seat Grid
                val seats = (1..selectedCoach.seatsCount).toList()
                val columns = if (selectedCoach == VisualCoachType.VANDE_BHARAT_EC) 4 else if (selectedCoach == VisualCoachType.LHB_2A) 4 else 5

                LazyVerticalGrid(
                    columns = GridCells.Fixed(columns),
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(280.dp)
                ) {
                    items(seats) { seatNum ->
                        val isSelected = selectedSeatNum == seatNum
                        val berthName = getBerthTypeLabel(seatNum, selectedCoach)

                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = if (isSelected) SkyBluePrimary else Color.White,
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (isSelected) SkyBluePrimary else Color(0xFFCBD5E1)
                            ),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(46.dp)
                                .clickable { selectedSeatNum = seatNum }
                        ) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center,
                                modifier = Modifier.padding(2.dp)
                            ) {
                                Text(
                                    text = "$seatNum",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface
                                )
                                Text(
                                    text = berthName,
                                    fontSize = 8.sp,
                                    color = if (isSelected) Color.White.copy(alpha = 0.9f) else TextSecondaryLight
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Coach End 2: Exit / Washbasin
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFFE2E8F0), RoundedCornerShape(6.dp))
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Luggage Rack", fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = TextSecondaryLight)
                    Text("Vestibule Gangway", fontSize = 10.sp, fontWeight = FontWeight.SemiBold, color = TextSecondaryLight)
                }
            }

            // Seat Details Toast
            selectedSeatNum?.let { seatNo ->
                Spacer(modifier = Modifier.height(10.dp))
                Surface(
                    color = SkyBluePrimary.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Chair, contentDescription = null, tint = SkyBluePrimary)
                        Spacer(modifier = Modifier.width(8.dp))
                        Column {
                            Text(
                                text = "Selected Seat #$seatNo (${getBerthTypeLabel(seatNo, selectedCoach)})",
                                fontWeight = FontWeight.Bold,
                                fontSize = 12.sp,
                                color = SkyBlueDark
                            )
                            Text(
                                text = "Equipped with Charging Socket, Bottle Holder & Folding Snack Table",
                                fontSize = 10.sp,
                                color = TextSecondaryLight
                            )
                        }
                    }
                }
            }
        }
    }
}

private fun getBerthTypeLabel(seat: Int, coach: VisualCoachType): String {
    return when (coach) {
        VisualCoachType.VANDE_BHARAT_CC -> when (seat % 5) {
            1, 5 -> "Window"
            2, 4 -> "Aisle"
            else -> "Middle"
        }
        VisualCoachType.VANDE_BHARAT_EC -> if (seat % 2 == 1) "Window" else "Aisle"
        VisualCoachType.LHB_3A -> when (seat % 8) {
            1, 4 -> "Lower"
            2, 5 -> "Middle"
            3, 6 -> "Upper"
            7 -> "Side Low"
            else -> "Side Up"
        }
        VisualCoachType.LHB_2A -> when (seat % 6) {
            1, 3 -> "Lower"
            2, 4 -> "Upper"
            5 -> "Side Low"
            else -> "Side Up"
        }
        VisualCoachType.LHB_1A -> if (seat % 2 == 1) "Lower" else "Upper"
        VisualCoachType.LHB_SL -> when (seat % 8) {
            1, 4 -> "Lower"
            2, 5 -> "Middle"
            3, 6 -> "Upper"
            7 -> "Side Low"
            else -> "Side Up"
        }
    }
}
