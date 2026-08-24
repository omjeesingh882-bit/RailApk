package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Dining
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.ViewCarousel
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.Train
import com.example.data.repository.RailRepository
import com.example.ui.components.CoachLayoutVisualizer
import com.example.ui.theme.*

@Composable
fun CoachAndScheduleScreen(
    initialTrain: Train? = null,
    modifier: Modifier = Modifier
) {
    var selectedTab by remember { mutableStateOf(0) } // 0: Coach Layout, 1: Full Schedule

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        item {
            // Screen Header Tabs
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = androidx.compose.foundation.BorderStroke(1.dp, Slate100),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    TabRow(
                        selectedTabIndex = selectedTab,
                        modifier = Modifier.fillMaxWidth(),
                        containerColor = Color.Transparent,
                        contentColor = SkyBlue500
                    ) {
                        Tab(
                            selected = selectedTab == 0,
                            onClick = { selectedTab = 0 },
                            icon = { Icon(Icons.Default.ViewCarousel, contentDescription = null, modifier = Modifier.size(18.dp)) },
                            text = { Text("Coach & Seat Map", fontWeight = FontWeight.Bold) }
                        )
                        Tab(
                            selected = selectedTab == 1,
                            onClick = { selectedTab = 1 },
                            icon = { Icon(Icons.Default.Schedule, contentDescription = null, modifier = Modifier.size(18.dp)) },
                            text = { Text("Train Schedule", fontWeight = FontWeight.Bold) }
                        )
                    }
                }
            }
        }

        if (selectedTab == 0) {
            item {
                CoachLayoutVisualizer()
            }
        } else {
            item {
                // Train Timetable Guide
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
                                Text(
                                    text = "22436 • VANDE BHARAT EXPRESS",
                                    fontWeight = FontWeight.Black,
                                    fontSize = 15.sp,
                                    color = SkyBlue500
                                )
                                Text(
                                    text = "New Delhi (NDLS) ➔ Varanasi (BSB)",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = Slate500
                                )
                            }
                            Surface(
                                color = SkyBlue50,
                                shape = RoundedCornerShape(8.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, SkyBlue200)
                            ) {
                                Text(
                                    text = "8h 00m",
                                    color = SkyBlue600,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))
                        Divider(color = Slate200)
                        Spacer(modifier = Modifier.height(10.dp))

                        val stops = listOf(
                            Triple("NDLS", "New Delhi", "06:00 (Source) • PF 1"),
                            Triple("CNB", "Kanpur Central", "10:08 Arr / 10:13 Dep • PF 1"),
                            Triple("PRYJ", "Prayagraj Jn", "12:08 Arr / 12:10 Dep • PF 6"),
                            Triple("BSB", "Varanasi Jn", "14:00 (Dest) • PF 1")
                        )

                        stops.forEachIndexed { idx, (code, name, timing) ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 6.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Surface(
                                        color = if (idx == 0 || idx == stops.size - 1) SkyBlue500 else Slate100,
                                        shape = RoundedCornerShape(6.dp)
                                    ) {
                                        Text(
                                            text = "${idx + 1}",
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Black,
                                            color = if (idx == 0 || idx == stops.size - 1) Color.White else Slate600,
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(10.dp))
                                    Column {
                                        Text(text = "$code - $name", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Slate900)
                                        Text(text = timing, fontSize = 11.sp, fontWeight = FontWeight.Medium, color = Slate500)
                                    }
                                }
                            }
                            if (idx < stops.size - 1) {
                                Divider(modifier = Modifier.padding(start = 28.dp), color = Slate200)
                            }
                        }
                    }
                }
            }
        }
    }
}
