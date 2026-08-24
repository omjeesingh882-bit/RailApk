package com.example.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AirlineSeatReclineNormal
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DirectionsRailway
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.PnrDetails
import com.example.ui.theme.*

@Composable
fun PnrCard(
    pnrDetails: PnrDetails,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp)
        ) {
            // PNR Number & Chart Status
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "PNR NUMBER",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Slate400,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = pnrDetails.pnrNumber,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Black,
                        color = SkyBlue500,
                        letterSpacing = 1.sp
                    )
                }

                Surface(
                    color = if (pnrDetails.chartStatus == "Chart Prepared") Emerald50 else Orange50,
                    shape = RoundedCornerShape(10.dp),
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        if (pnrDetails.chartStatus == "Chart Prepared") Emerald100 else Orange100
                    )
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = if (pnrDetails.chartStatus == "Chart Prepared") Icons.Default.CheckCircle else Icons.Default.Info,
                            contentDescription = null,
                            tint = if (pnrDetails.chartStatus == "Chart Prepared") Emerald600 else Orange600,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = pnrDetails.chartStatus,
                            color = if (pnrDetails.chartStatus == "Chart Prepared") Emerald600 else Orange600,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))
            Divider(color = Slate200)
            Spacer(modifier = Modifier.height(14.dp))

            // Train & Journey Summary
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = "${pnrDetails.trainNumber} • ${pnrDetails.trainName}",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = Slate900
                    )
                    Text(
                        text = "Date: ${pnrDetails.journeyDate}",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium,
                        color = Slate500
                    )
                }
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "${pnrDetails.travelClass.code} (${pnrDetails.travelClass.fullName})",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = SkyBlue500
                    )
                    Text(
                        text = "Quota: ${pnrDetails.quota.fullName}",
                        fontSize = 11.sp,
                        color = Slate500
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Boarding - Destination Route
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Slate50,
                        shape = RoundedCornerShape(14.dp)
                    )
                    .border(1.dp, Slate200, RoundedCornerShape(14.dp))
                    .padding(12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = pnrDetails.fromStation.code,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black,
                        color = Slate900
                    )
                    Text(
                        text = pnrDetails.fromStation.city,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = Slate500
                    )
                }
                Text(
                    text = "━━━ ➔ ━━━",
                    color = SkyBlue500,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = pnrDetails.toStation.code,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black,
                        color = Slate900
                    )
                    Text(
                        text = pnrDetails.toStation.city,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = Slate500
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // AI Confirmation Prediction
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            colors = listOf(
                                Emerald50,
                                SkyBlue50
                            )
                        ),
                        shape = RoundedCornerShape(14.dp)
                    )
                    .border(
                        1.dp,
                        Emerald100,
                        RoundedCornerShape(14.dp)
                    )
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.TrendingUp,
                    contentDescription = null,
                    tint = Emerald600,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "AI Confirmation Probability",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = Slate900
                    )
                    Text(
                        text = if (pnrDetails.confirmationProbability >= 90) "High Chance of Confirmation / CNF Confirmed"
                               else "Moderate Chance based on historic chart trends",
                        fontSize = 11.sp,
                        color = Slate600
                    )
                }
                Surface(
                    color = Emerald600,
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text(
                        text = "${pnrDetails.confirmationProbability}%",
                        color = Color.White,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Black,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Passenger List
            Text(
                text = "PASSENGERS STATUS (${pnrDetails.passengers.size})",
                fontSize = 11.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Slate400,
                letterSpacing = 0.5.sp
            )
            Spacer(modifier = Modifier.height(8.dp))

            pnrDetails.passengers.forEach { passenger ->
                val isConfirmed = passenger.currentStatus.startsWith("CNF")
                val isRac = passenger.currentStatus.startsWith("RAC")

                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = Slate50,
                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(32.dp)
                                    .clip(CircleShape)
                                    .background(SkyBlue50)
                                    .border(1.dp, SkyBlue200, CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "${passenger.passengerNo}",
                                    fontWeight = FontWeight.Black,
                                    fontSize = 13.sp,
                                    color = SkyBlue500
                                )
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = "Passenger ${passenger.passengerNo}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = Slate900
                                )
                                Text(
                                    text = "Booking: ${passenger.bookingStatus}",
                                    fontSize = 11.sp,
                                    color = Slate500
                                )
                            }
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Text(
                                text = passenger.currentStatus,
                                fontWeight = FontWeight.Black,
                                fontSize = 13.sp,
                                color = if (isConfirmed) Emerald600 else if (isRac) Orange500 else Color(0xFFF43F5E)
                            )
                            Text(
                                text = "${passenger.berthType} (${passenger.coach})",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Medium,
                                color = Slate500
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Coach Position
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Slate50,
                        shape = RoundedCornerShape(12.dp)
                    )
                    .border(1.dp, Slate200, RoundedCornerShape(12.dp))
                    .padding(12.dp)
            ) {
                Text(
                    text = "Coach Sequence at Platform:",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Slate600
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = pnrDetails.coachPosition,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = SkyBlue600
                )
            }
        }
    }
}
