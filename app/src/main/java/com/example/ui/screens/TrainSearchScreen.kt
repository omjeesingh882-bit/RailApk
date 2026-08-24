package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.Quota
import com.example.data.models.Station
import com.example.data.models.Train
import com.example.data.models.TravelClass
import com.example.data.repository.RailRepository
import com.example.ui.components.StationSelectorDialog
import com.example.ui.components.TrainCard
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TrainSearchScreen(
    onTrackLiveClick: (String) -> Unit,
    onViewScheduleClick: (Train) -> Unit,
    onCoachLayoutClick: (Train) -> Unit,
    modifier: Modifier = Modifier
) {
    var sourceStation by remember {
        mutableStateOf(RailRepository.popularStations.first { it.code == "NDLS" })
    }
    var destStation by remember {
        mutableStateOf(RailRepository.popularStations.first { it.code == "BSB" })
    }
    var selectedDate by remember { mutableStateOf("Today, 24 Aug") }
    var selectedClass by remember { mutableStateOf(TravelClass.ALL) }
    var selectedQuota by remember { mutableStateOf(Quota.GENERAL) }

    var showSourcePicker by remember { mutableStateOf(false) }
    var showDestPicker by remember { mutableStateOf(false) }

    val trainsList = remember(sourceStation, destStation, selectedClass, selectedQuota) {
        RailRepository.searchTrains(
            fromCode = sourceStation.code,
            toCode = destStation.code,
            travelClass = selectedClass,
            quota = selectedQuota
        )
    }

    if (showSourcePicker) {
        StationSelectorDialog(
            title = "Select Origin Station",
            currentSelectedCode = sourceStation.code,
            onStationSelected = { sourceStation = it },
            onDismiss = { showSourcePicker = false }
        )
    }

    if (showDestPicker) {
        StationSelectorDialog(
            title = "Select Destination Station",
            currentSelectedCode = destStation.code,
            onStationSelected = { destStation = it },
            onDismiss = { showDestPicker = false }
        )
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        // Main Search Form Card
        item {
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
                        text = "SEARCH TRAINS",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = SkyBlue500,
                        letterSpacing = 1.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    // From & To Stations Box with Swap Button
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(18.dp))
                            .border(1.dp, Slate200, RoundedCornerShape(18.dp))
                            .background(Slate50)
                            .padding(14.dp)
                    ) {
                        Column {
                            // Source Station
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { showSourcePicker = true }
                                    .padding(vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(12.dp)
                                        .clip(CircleShape)
                                        .background(SkyBlue500)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = "FROM STATION",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Slate400,
                                        letterSpacing = 0.5.sp
                                    )
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = sourceStation.code,
                                            fontWeight = FontWeight.Black,
                                            fontSize = 17.sp,
                                            color = Slate900
                                        )
                                        Text(
                                            text = " • ${sourceStation.name}",
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.SemiBold,
                                            color = Slate600,
                                            maxLines = 1
                                        )
                                    }
                                }
                            }

                            Divider(modifier = Modifier.padding(vertical = 8.dp), color = Slate200)

                            // Destination Station
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { showDestPicker = true }
                                    .padding(vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(12.dp)
                                        .clip(CircleShape)
                                        .background(Orange500)
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = "TO STATION",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Slate400,
                                        letterSpacing = 0.5.sp
                                    )
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = destStation.code,
                                            fontWeight = FontWeight.Black,
                                            fontSize = 17.sp,
                                            color = Slate900
                                        )
                                        Text(
                                            text = " • ${destStation.name}",
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.SemiBold,
                                            color = Slate600,
                                            maxLines = 1
                                        )
                                    }
                                }
                            }
                        }

                        // Swap Stations Circular Button
                        IconButton(
                            onClick = {
                                val temp = sourceStation
                                sourceStation = destStation
                                destStation = temp
                            },
                            modifier = Modifier
                                .align(Alignment.CenterEnd)
                                .size(38.dp)
                                .clip(CircleShape)
                                .background(SkyBlue50)
                                .border(1.dp, SkyBlue200, CircleShape)
                        ) {
                            Icon(
                                imageVector = Icons.Default.SwapVert,
                                contentDescription = "Swap Stations",
                                tint = SkyBlue500,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    // Date Picker Quick Buttons
                    Text(
                        text = "JOURNEY DATE",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Slate400,
                        letterSpacing = 0.5.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        listOf("Today, 24 Aug", "Tomorrow, 25 Aug", "26 Aug", "27 Aug").forEach { dateStr ->
                            val isSelected = selectedDate == dateStr
                            FilterChip(
                                selected = isSelected,
                                onClick = { selectedDate = dateStr },
                                label = {
                                    Text(
                                        text = dateStr,
                                        fontSize = 11.sp,
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                                    )
                                },
                                shape = RoundedCornerShape(12.dp),
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

                    Spacer(modifier = Modifier.height(12.dp))

                    // Class & Quota Selectors
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // Class Selector
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "CLASS",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Slate400,
                                letterSpacing = 0.5.sp
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            var classExpanded by remember { mutableStateOf(false) }
                            Box {
                                OutlinedButton(
                                    onClick = { classExpanded = true },
                                    shape = RoundedCornerShape(12.dp),
                                    colors = ButtonDefaults.outlinedButtonColors(
                                        containerColor = Slate50,
                                        contentColor = Slate800
                                    ),
                                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                                    modifier = Modifier.fillMaxWidth(),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 8.dp)
                                ) {
                                    Text(
                                        text = selectedClass.fullName,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        maxLines = 1
                                    )
                                    Spacer(modifier = Modifier.weight(1f))
                                    Icon(Icons.Default.ArrowDropDown, contentDescription = null, tint = Slate500)
                                }
                                DropdownMenu(
                                    expanded = classExpanded,
                                    onDismissRequest = { classExpanded = false }
                                ) {
                                    TravelClass.values().forEach { tClass ->
                                        DropdownMenuItem(
                                            text = { Text("${tClass.code} - ${tClass.fullName}") },
                                            onClick = {
                                                selectedClass = tClass
                                                classExpanded = false
                                            }
                                        )
                                    }
                                }
                            }
                        }

                        // Quota Selector
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "QUOTA",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Slate400,
                                letterSpacing = 0.5.sp
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            var quotaExpanded by remember { mutableStateOf(false) }
                            Box {
                                OutlinedButton(
                                    onClick = { quotaExpanded = true },
                                    shape = RoundedCornerShape(12.dp),
                                    colors = ButtonDefaults.outlinedButtonColors(
                                        containerColor = Slate50,
                                        contentColor = Slate800
                                    ),
                                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                                    modifier = Modifier.fillMaxWidth(),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 8.dp)
                                ) {
                                    Text(
                                        text = selectedQuota.fullName.substringBefore(" "),
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        maxLines = 1
                                    )
                                    Spacer(modifier = Modifier.weight(1f))
                                    Icon(Icons.Default.ArrowDropDown, contentDescription = null, tint = Slate500)
                                }
                                DropdownMenu(
                                    expanded = quotaExpanded,
                                    onDismissRequest = { quotaExpanded = false }
                                ) {
                                    Quota.values().forEach { q ->
                                        DropdownMenuItem(
                                            text = { Text("${q.code} - ${q.fullName}") },
                                            onClick = {
                                                selectedQuota = q
                                                quotaExpanded = false
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    // Popular Routes Chips
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "POPULAR ROUTES",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Slate400,
                            letterSpacing = 0.5.sp
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        val routes = listOf(
                            Pair("NDLS", "BSB") to "Delhi ➔ Varanasi",
                            Pair("NDLS", "HWH") to "Delhi ➔ Howrah",
                            Pair("NDLS", "MMCT") to "Delhi ➔ Mumbai",
                            Pair("BLR", "MAS") to "Bengaluru ➔ Chennai",
                            Pair("NDLS", "PNBE") to "Delhi ➔ Patna"
                        )
                        items(routes) { (codes, label) ->
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = Slate50,
                                border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
                                modifier = Modifier.clickable {
                                    sourceStation = RailRepository.popularStations.find { it.code == codes.first }
                                        ?: sourceStation
                                    destStation = RailRepository.popularStations.find { it.code == codes.second }
                                        ?: destStation
                                }
                            ) {
                                Text(
                                    text = label,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = Slate700,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        // Vibrant Palette Feature Highlight Cards
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Express Status Card (Vibrant Sky Blue)
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = SkyBlue500),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(18.dp)
                    ) {
                        Surface(
                            color = Color.White.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(20.dp)
                        ) {
                            Text(
                                text = "Express Status",
                                color = Color.White,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 3.dp)
                            )
                        }
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Rajdhani Express 12952",
                            fontWeight = FontWeight.Black,
                            fontSize = 20.sp,
                            color = Color.White
                        )
                        Text(
                            text = "Departing in 45 minutes from Platform 4",
                            fontSize = 12.sp,
                            color = SkyBlue100
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        // Timeline Bar
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column(horizontalAlignment = Alignment.Start) {
                                Text(
                                    text = "16:30",
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Black,
                                    color = Color.White
                                )
                                Text(
                                    text = "ON TIME",
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = SkyBlue100
                                )
                            }

                            Row(
                                modifier = Modifier
                                    .weight(1f)
                                    .padding(horizontal = 14.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(2.dp)
                                        .background(Color.White.copy(alpha = 0.4f))
                                )
                                Box(
                                    modifier = Modifier
                                        .size(8.dp)
                                        .clip(CircleShape)
                                        .background(Color.White)
                                )
                                Box(
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(2.dp)
                                        .background(Color.White.copy(alpha = 0.4f))
                                )
                            }

                            Column(horizontalAlignment = Alignment.End) {
                                Text(
                                    text = "08:15",
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Black,
                                    color = Color.White
                                )
                                Text(
                                    text = "ARRIVAL",
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = SkyBlue100
                                )
                            }
                        }
                    }
                }

                // Live Availability Card (Vibrant Emerald Green)
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Emerald600),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(18.dp)
                    ) {
                        Surface(
                            color = Color.White.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(20.dp)
                        ) {
                            Text(
                                text = "Seat Availability",
                                color = Color.White,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 3.dp)
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Shatabdi Express 12002",
                            fontWeight = FontWeight.Black,
                            fontSize = 20.sp,
                            color = Color.White
                        )
                        Text(
                            text = "Seats available for next 3 departures",
                            fontSize = 12.sp,
                            color = Emerald100
                        )

                        Spacer(modifier = Modifier.height(14.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Surface(
                                modifier = Modifier.weight(1f),
                                color = Color.White.copy(alpha = 0.18f),
                                shape = RoundedCornerShape(16.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.25f))
                            ) {
                                Column(
                                    modifier = Modifier.padding(10.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text(text = "CC", color = Emerald100, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    Text(text = "WL 12", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Black)
                                }
                            }

                            Surface(
                                modifier = Modifier.weight(1f),
                                color = Color.White.copy(alpha = 0.18f),
                                shape = RoundedCornerShape(16.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.25f))
                            ) {
                                Column(
                                    modifier = Modifier.padding(10.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text(text = "EC", color = Emerald100, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    Text(text = "AVL 42", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Black)
                                }
                            }

                            Surface(
                                modifier = Modifier.weight(1f),
                                color = Color.White.copy(alpha = 0.18f),
                                shape = RoundedCornerShape(16.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.25f))
                            ) {
                                Column(
                                    modifier = Modifier.padding(10.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text(text = "3A", color = Emerald100, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    Text(text = "AVL 118", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Black)
                                }
                            }
                        }
                    }
                }
            }
        }

        // Available Trains Section Header
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "AVAILABLE TRAINS (${trainsList.size})",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Black,
                    color = Slate900,
                    letterSpacing = 0.5.sp
                )
                Text(
                    text = "${sourceStation.code} ➔ ${destStation.code}",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = SkyBlue500
                )
            }
        }

        // Trains List
        items(trainsList) { train ->
            TrainCard(
                train = train,
                onTrackLiveClick = onTrackLiveClick,
                onViewScheduleClick = onViewScheduleClick,
                onCoachLayoutClick = onCoachLayoutClick
            )
        }
    }
}
