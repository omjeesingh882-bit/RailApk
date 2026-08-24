package com.example.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.GpsFixed
import androidx.compose.material.icons.filled.NotificationsActive
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material.icons.filled.Train
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.StationHalt
import com.example.data.models.TrainLiveRunningStatus
import com.example.ui.theme.*

@Composable
fun LiveRunningTimeline(
    status: TrainLiveRunningStatus,
    onSetAlarmClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "train_pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.25f,
        animationSpec = infiniteRepeatable(
            animation = tween(900, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse"
    )

    Column(modifier = modifier.fillMaxWidth()) {
        // Live Speed & Summary Banner
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 6.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = status.trainNumber,
                                fontWeight = FontWeight.Black,
                                fontSize = 17.sp,
                                color = SkyBlue500
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = status.trainName,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = Slate900
                            )
                        }
                        Text(
                            text = "${status.sourceStation} ➔ ${status.destStation}",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium,
                            color = Slate500
                        )
                    }

                    // Speed Badge
                    Surface(
                        color = SkyBlue50,
                        shape = RoundedCornerShape(10.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SkyBlue200)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Speed,
                                contentDescription = null,
                                tint = SkyBlue500,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "${status.currentSpeedKmH} km/h",
                                fontWeight = FontWeight.Black,
                                fontSize = 12.sp,
                                color = SkyBlue600
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Running Status Pill
                Surface(
                    color = if (status.delayMinutes == 0) Emerald50 else Color(0xFFFFF1F2),
                    shape = RoundedCornerShape(12.dp),
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        if (status.delayMinutes == 0) Emerald100 else Color(0xFFFFE4E6)
                    ),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.GpsFixed,
                                contentDescription = null,
                                tint = if (status.delayMinutes == 0) Emerald600 else Color(0xFFEF4444),
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = status.statusMessage,
                                fontWeight = FontWeight.Bold,
                                fontSize = 12.sp,
                                color = if (status.delayMinutes == 0) Emerald600 else Color(0xFFEF4444)
                            )
                        }

                        Text(
                            text = status.lastUpdated,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Medium,
                            color = Slate500
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Progress Bar: Distance Covered
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Covered: ${status.coveredDistanceKm} km",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Slate500
                        )
                        Text(
                            text = "Total: ${status.totalDistanceKm} km",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Slate500
                        )
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    val progressFraction = (status.coveredDistanceKm.toFloat() / status.totalDistanceKm.toFloat()).coerceIn(0f, 1f)
                    LinearProgressIndicator(
                        progress = { progressFraction },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = SkyBlue500,
                        trackColor = Slate200
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Station Wakeup Alarm button
                OutlinedButton(
                    onClick = onSetAlarmClick,
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        containerColor = Orange50,
                        contentColor = Orange600
                    ),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Orange100),
                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(
                        imageVector = Icons.Default.NotificationsActive,
                        contentDescription = null,
                        tint = Orange500,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Set Destination Wakeup Alarm",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Orange600
                    )
                }
            }
        }

        // Halts List Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "STATION & PLATFORM",
                fontSize = 10.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Slate400,
                letterSpacing = 0.5.sp
            )
            Text(
                text = "SCHED / ACTUAL",
                fontSize = 10.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Slate400,
                letterSpacing = 0.5.sp
            )
        }

        // Timeline Halts
        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {
            itemsIndexed(status.halts) { index, halt ->
                HaltTimelineItem(
                    halt = halt,
                    isFirst = index == 0,
                    isLast = index == status.halts.size - 1,
                    pulseScale = pulseScale
                )
            }
        }
    }
}

@Composable
fun HaltTimelineItem(
    halt: StationHalt,
    isFirst: Boolean,
    isLast: Boolean,
    pulseScale: Float
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Distance
        Text(
            text = "${halt.distanceKm} km",
            fontSize = 10.sp,
            fontWeight = FontWeight.Medium,
            color = Slate400,
            modifier = Modifier.width(46.dp)
        )

        // Timeline vertical track + dot
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.width(32.dp)
        ) {
            if (!isFirst) {
                Box(
                    modifier = Modifier
                        .width(2.dp)
                        .height(14.dp)
                        .background(if (halt.isDeparted) SkyBlue500 else Slate200)
                )
            } else {
                Spacer(modifier = Modifier.height(14.dp))
            }

            if (halt.isCurrent) {
                Box(
                    modifier = Modifier
                        .size(24.dp)
                        .scale(pulseScale)
                        .clip(CircleShape)
                        .background(SkyBlue500),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Train,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(14.dp)
                    )
                }
            } else if (halt.isDeparted) {
                Box(
                    modifier = Modifier
                        .size(16.dp)
                        .clip(CircleShape)
                        .background(SkyBlue500),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(10.dp)
                    )
                }
            } else {
                Box(
                    modifier = Modifier
                        .size(14.dp)
                        .clip(CircleShape)
                        .border(2.dp, Slate400, CircleShape)
                        .background(Color.White)
                )
            }

            if (!isLast) {
                Box(
                    modifier = Modifier
                        .width(2.dp)
                        .height(14.dp)
                        .background(if (halt.isDeparted) SkyBlue500 else Slate200)
                )
            } else {
                Spacer(modifier = Modifier.height(14.dp))
            }
        }

        Spacer(modifier = Modifier.width(6.dp))

        // Station Details & Timing Card
        Surface(
            shape = RoundedCornerShape(12.dp),
            color = if (halt.isCurrent) SkyBlue50 else Color.White,
            border = if (halt.isCurrent) androidx.compose.foundation.BorderStroke(1.5.dp, SkyBlue500)
                     else androidx.compose.foundation.BorderStroke(1.dp, Slate100),
            shadowElevation = if (halt.isCurrent) 2.dp else 1.dp,
            modifier = Modifier.weight(1f)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 9.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = halt.stationCode,
                            fontWeight = FontWeight.Black,
                            fontSize = 13.sp,
                            color = if (halt.isCurrent) SkyBlue500 else Slate900
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "• ${halt.stationName}",
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 12.sp,
                            color = Slate800,
                            maxLines = 1
                        )
                    }
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Surface(
                            color = Slate100,
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                text = "PF ${halt.platformNo}",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = Slate700,
                                modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                            )
                        }
                        if (halt.haltMinutes > 0) {
                            Text(
                                text = "Halt: ${halt.haltMinutes}m",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Medium,
                                color = Slate500
                            )
                        }
                    }
                }

                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "${halt.scheduledArrival} / ${halt.actualArrival}",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = Slate900
                    )
                    if (halt.delayMinutes > 0) {
                        Text(
                            text = "+${halt.delayMinutes}m Late",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFEF4444)
                        )
                    } else {
                        Text(
                            text = "On Time",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Emerald600
                        )
                    }
                }
            }
        }
    }
}
