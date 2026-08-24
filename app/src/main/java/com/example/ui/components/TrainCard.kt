package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.Dining
import androidx.compose.material.icons.filled.Fastfood
import androidx.compose.material.icons.filled.GpsFixed
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.ViewCarousel
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.SeatAvailability
import com.example.data.models.Train
import com.example.ui.theme.*

@Composable
fun TrainCard(
    train: Train,
    onTrackLiveClick: (String) -> Unit,
    onViewScheduleClick: (Train) -> Unit,
    onCoachLayoutClick: (Train) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedClassIndex by remember { mutableStateOf(0) }
    val currentClass = train.classes.getOrNull(selectedClassIndex) ?: train.classes.firstOrNull()

    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            // Train Header: Number, Name, Type Pill
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Text(
                            text = train.number,
                            fontWeight = FontWeight.Black,
                            fontSize = 16.sp,
                            color = SkyBlue500
                        )
                        Text(
                            text = "•",
                            color = Slate300,
                            fontSize = 13.sp
                        )
                        Text(
                            text = train.name,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = Slate900,
                            maxLines = 1
                        )
                    }
                    
                    // Runs on days
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        modifier = Modifier.padding(top = 3.dp)
                    ) {
                        val dayNames = listOf("M", "T", "W", "T", "F", "S", "S")
                        dayNames.forEach { day ->
                            val runs = train.runningDays.contains(day)
                            Text(
                                text = day,
                                fontSize = 10.sp,
                                fontWeight = if (runs) FontWeight.ExtraBold else FontWeight.Medium,
                                color = if (runs) Emerald600 else Slate300
                            )
                        }
                        if (train.pantryAvailable) {
                            Text(
                                text = "• Pantry",
                                fontSize = 10.sp,
                                color = Orange600,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(start = 4.dp)
                            )
                        }
                    }
                }

                // Type Badge
                Surface(
                    color = Color(train.type.badgeColorHex).copy(alpha = 0.12f),
                    shape = RoundedCornerShape(8.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(train.type.badgeColorHex).copy(alpha = 0.25f))
                ) {
                    Text(
                        text = train.type.label,
                        color = Color(train.type.badgeColorHex),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Timetable row: Departure, Duration, Arrival
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Slate50,
                        shape = RoundedCornerShape(14.dp)
                    )
                    .border(1.dp, Slate200, RoundedCornerShape(14.dp))
                    .padding(horizontal = 14.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Departure
                Column(horizontalAlignment = Alignment.Start) {
                    Text(
                        text = train.departureTime,
                        fontWeight = FontWeight.Black,
                        fontSize = 17.sp,
                        color = Slate900
                    )
                    Text(
                        text = train.sourceStation.code,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = SkyBlue500
                    )
                }

                // Duration Indicator
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = train.duration,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Slate600
                    )
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .width(28.dp)
                                .height(2.dp)
                                .background(Slate300)
                        )
                        Icon(
                            imageVector = Icons.Default.ArrowForward,
                            contentDescription = null,
                            tint = SkyBlue500,
                            modifier = Modifier.size(12.dp)
                        )
                        Box(
                            modifier = Modifier
                                .width(28.dp)
                                .height(2.dp)
                                .background(Slate300)
                        )
                    }
                    Text(
                        text = "${train.distanceKm} km",
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Medium,
                        color = Slate400
                    )
                }

                // Arrival
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = train.arrivalTime,
                        fontWeight = FontWeight.Black,
                        fontSize = 17.sp,
                        color = Slate900
                    )
                    Text(
                        text = train.destStation.code,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = SkyBlue500
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Class selection & Seat Availability Chips
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                train.classes.forEachIndexed { index, seat ->
                    val isSelected = index == selectedClassIndex
                    val statusColor = when (seat.statusCode) {
                        "AVAILABLE" -> Emerald600
                        "RAC" -> Orange500
                        else -> Color(0xFFF43F5E)
                    }
                    val statusBg = when (seat.statusCode) {
                        "AVAILABLE" -> Emerald50
                        "RAC" -> Orange50
                        else -> Color(0xFFFFF1F2)
                    }

                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(12.dp))
                            .border(
                                width = if (isSelected) 1.5.dp else 1.dp,
                                color = if (isSelected) SkyBlue500 else Slate200,
                                shape = RoundedCornerShape(12.dp)
                            )
                            .background(
                                if (isSelected) SkyBlue50 else Slate50
                            )
                            .clickable { selectedClassIndex = index }
                            .padding(vertical = 8.dp, horizontal = 6.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Row(
                                horizontalArrangement = Arrangement.SpaceBetween,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(
                                    text = seat.travelClass.code,
                                    fontWeight = FontWeight.Black,
                                    fontSize = 12.sp,
                                    color = if (isSelected) SkyBlue500 else Slate800
                                )
                                Text(
                                    text = "₹${seat.fare}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    color = Slate700
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Surface(
                                color = statusBg,
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text(
                                    text = seat.status,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Black,
                                    color = statusColor,
                                    modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                                )
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = "${seat.confirmationChance}% chance",
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Medium,
                                color = Slate500
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Action Buttons: Track Live Status, Schedule, Coach Layout
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Button(
                    onClick = { onTrackLiveClick(train.number) },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = SkyBlue500,
                        contentColor = Color.White
                    ),
                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 8.dp),
                    modifier = Modifier.weight(1.1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.GpsFixed,
                        contentDescription = null,
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Live Status",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                OutlinedButton(
                    onClick = { onViewScheduleClick(train) },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        containerColor = Slate50,
                        contentColor = Slate700
                    ),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.Schedule,
                        contentDescription = null,
                        modifier = Modifier.size(14.dp),
                        tint = Slate600
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Schedule",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                OutlinedButton(
                    onClick = { onCoachLayoutClick(train) },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        containerColor = Slate50,
                        contentColor = Slate700
                    ),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(
                        imageVector = Icons.Default.ViewCarousel,
                        contentDescription = null,
                        modifier = Modifier.size(14.dp),
                        tint = Slate600
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Coach Map",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}
