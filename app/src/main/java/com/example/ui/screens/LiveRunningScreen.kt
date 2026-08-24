package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.GpsFixed
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Train
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.repository.RailRepository
import com.example.ui.components.LiveRunningTimeline
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LiveRunningScreen(
    initialTrainNumber: String = "22436",
    modifier: Modifier = Modifier
) {
    var trainQuery by remember { mutableStateOf(initialTrainNumber) }
    var searchedTrain by remember { mutableStateOf(initialTrainNumber) }
    var showAlarmDialog by remember { mutableStateOf(false) }

    val liveStatus = remember(searchedTrain) {
        RailRepository.getLiveRunningStatus(searchedTrain)
    }

    if (showAlarmDialog) {
        AlertDialog(
            onDismissRequest = { showAlarmDialog = false },
            title = {
                Text(
                    text = "Destination Station Alarm Set",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            },
            text = {
                Text(
                    text = "RailApp will ring a loud alarm 20 minutes before train reaches ${liveStatus.destStation} even when phone is locked.",
                    fontSize = 13.sp
                )
            },
            confirmButton = {
                Button(
                    onClick = { showAlarmDialog = false },
                    colors = ButtonDefaults.buttonColors(containerColor = SkyBlue500),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("OK, Set Alarm", fontWeight = FontWeight.Bold)
                }
            }
        )
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50)
    ) {
        // Search Bar Card
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
                    text = "LIVE RUNNING STATUS (WHERE IS MY TRAIN)",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = SkyBlue500,
                    letterSpacing = 1.sp
                )

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = trainQuery,
                        onValueChange = { trainQuery = it },
                        placeholder = { Text("Train Number (e.g. 22436, 12302)", fontSize = 13.sp) },
                        leadingIcon = {
                            Icon(Icons.Default.Train, contentDescription = null, tint = SkyBlue500)
                        },
                        trailingIcon = {
                            if (trainQuery.isNotEmpty()) {
                                IconButton(onClick = { trainQuery = "" }) {
                                    Icon(Icons.Default.Close, contentDescription = "Clear")
                                }
                            }
                        },
                        singleLine = true,
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.weight(1f)
                    )

                    Button(
                        onClick = {
                            if (trainQuery.isNotBlank()) {
                                searchedTrain = trainQuery
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = SkyBlue500),
                        shape = RoundedCornerShape(14.dp),
                        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 14.dp)
                    ) {
                        Icon(Icons.Default.Search, contentDescription = "Search", modifier = Modifier.size(20.dp))
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Quick Popular Train Chips
                Text(
                    text = "Popular Trains:",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Slate400,
                    letterSpacing = 0.5.sp
                )
                Spacer(modifier = Modifier.height(6.dp))
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    val popularList = listOf(
                        Pair("22436", "22436 Vande Bharat"),
                        Pair("12302", "12302 Howrah Rajdhani"),
                        Pair("12004", "12004 Shatabdi"),
                        Pair("12556", "12556 Gorakhdham"),
                        Pair("12952", "12952 Tejas Rajdhani"),
                        Pair("12626", "12626 Kerala Exp")
                    )
                    items(popularList) { (num, label) ->
                        val isSelected = searchedTrain == num
                        FilterChip(
                            selected = isSelected,
                            onClick = {
                                trainQuery = num
                                searchedTrain = num
                            },
                            label = { Text(label, fontSize = 10.sp, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium) },
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
            }
        }

        // Live Timeline
        LiveRunningTimeline(
            status = liveStatus,
            onSetAlarmClick = { showAlarmDialog = true }
        )
    }
}
