package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.LocationCity
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.Train
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.LiveStationTrain
import com.example.data.repository.RailRepository
import com.example.ui.components.StationSelectorDialog
import com.example.ui.theme.*

@Composable
fun LiveStationScreen(
    onTrackLiveClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedStation by remember {
        mutableStateOf(RailRepository.popularStations.first { it.code == "NDLS" })
    }
    var selectedTimeWindow by remember { mutableStateOf("Next 4 Hours") }
    var showStationPicker by remember { mutableStateOf(false) }

    val stationTrains = remember(selectedStation, selectedTimeWindow) {
        RailRepository.getLiveStationTrains(selectedStation.code)
    }

    if (showStationPicker) {
        StationSelectorDialog(
            title = "Select Station for Live Board",
            currentSelectedCode = selectedStation.code,
            onStationSelected = { selectedStation = it },
            onDismiss = { showStationPicker = false }
        )
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        item {
            // Station Selector Header Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "LIVE STATION BOARD (ARRIVALS / DEPARTURES)",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = SkyBlue500,
                        letterSpacing = 1.sp
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Selected Station Row
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Slate50,
                        border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { showStationPicker = true }
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.LocationCity,
                                    contentDescription = null,
                                    tint = SkyBlue500,
                                    modifier = Modifier.size(26.dp)
                                )
                                Spacer(modifier = Modifier.width(10.dp))
                                Column {
                                    Text(
                                        text = "${selectedStation.code} - ${selectedStation.name}",
                                        fontWeight = FontWeight.Black,
                                        fontSize = 15.sp,
                                        color = Slate900
                                    )
                                    Text(
                                        text = "${selectedStation.city}, ${selectedStation.state} • ${selectedStation.platformsCount} Platforms",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Medium,
                                        color = Slate500
                                    )
                                }
                            }
                            Text(
                                text = "Change",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = SkyBlue500
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Quick Hub Selectors
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        items(RailRepository.popularStations.take(6)) { st ->
                            val isSelected = selectedStation.code == st.code
                            FilterChip(
                                selected = isSelected,
                                onClick = { selectedStation = st },
                                label = { Text(st.code, fontSize = 11.sp, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium) },
                                shape = RoundedCornerShape(10.dp),
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = SkyBlue50,
                                    selectedLabelColor = SkyBlue600
                                ),
                                border = FilterChipDefaults.filterChipBorder(
                                    enabled = true,
                                    selected = isSelected,
                                    borderColor = if (isSelected) SkyBlue500 else Slate200
                                )
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Time Windows (Next 2h, 4h, 8h)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        listOf("Next 2 Hours", "Next 4 Hours", "Next 8 Hours").forEach { window ->
                            val isSelected = selectedTimeWindow == window
                            FilterChip(
                                selected = isSelected,
                                onClick = { selectedTimeWindow = window },
                                label = { Text(window, fontSize = 10.sp, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium) },
                                shape = RoundedCornerShape(10.dp),
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = SkyBlue50,
                                    selectedLabelColor = SkyBlue600
                                ),
                                border = FilterChipDefaults.filterChipBorder(
                                    enabled = true,
                                    selected = isSelected,
                                    borderColor = if (isSelected) SkyBlue500 else Slate200
                                ),
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                }
            }
        }

        // Live Station Board Table Header
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "TRAIN / ROUTE",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Slate400,
                    letterSpacing = 0.5.sp
                )
                Text(
                    text = "TIME / PF / STATUS",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Slate400,
                    letterSpacing = 0.5.sp
                )
            }
        }

        // Live Station Board Items
        items(stationTrains) { item ->
            LiveStationBoardCard(
                item = item,
                onTrackLiveClick = onTrackLiveClick
            )
        }
    }
}

@Composable
fun LiveStationBoardCard(
    item: LiveStationTrain,
    onTrackLiveClick: (String) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = item.trainNumber,
                        fontWeight = FontWeight.Black,
                        fontSize = 15.sp,
                        color = SkyBlue500
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = item.trainName,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = Slate900,
                        maxLines = 1
                    )
                }

                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "${item.sourceName} ➔ ${item.destinationName}",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Medium,
                    color = Slate500
                )

                Spacer(modifier = Modifier.height(4.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Surface(
                        color = Color(item.trainType.badgeColorHex).copy(alpha = 0.1f),
                        shape = RoundedCornerShape(4.dp)
                    ) {
                        Text(
                            text = item.trainType.label,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(item.trainType.badgeColorHex),
                            modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                        )
                    }
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = item.expectedArrival,
                        fontWeight = FontWeight.Black,
                        fontSize = 15.sp,
                        color = Slate900
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Surface(
                        color = SkyBlue500,
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = "PF ${item.platformNo}",
                            color = Color.White,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Black,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(2.dp))
                if (item.delayMinutes > 0) {
                    Text(
                        text = "+${item.delayMinutes}m Late",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFFEF4444)
                    )
                } else {
                    Text(
                        text = "Right Time (RT)",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Emerald600
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))
                TextButton(
                    onClick = { onTrackLiveClick(item.trainNumber) },
                    contentPadding = PaddingValues(0.dp),
                    modifier = Modifier.height(24.dp)
                ) {
                    Text(
                        text = "Track Live ➔",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = SkyBlue500
                    )
                }
            }
        }
    }
}
