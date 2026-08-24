package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.models.Train
import com.example.ui.components.EmergencySosDialog
import com.example.ui.components.RailHeader
import com.example.ui.screens.*
import com.example.ui.theme.*

enum class RailNavTab(val label: String, val icon: ImageVector) {
    SEARCH("Search", Icons.Default.Search),
    LIVE("Live Status", Icons.Default.GpsFixed),
    PNR("PNR Status", Icons.Default.ConfirmationNumber),
    STATION("Live Station", Icons.Default.LocationCity),
    COACH("Coach Map", Icons.Default.ViewCarousel),
    AI_GUIDE("AI Assistant", Icons.Default.AutoAwesome)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                RailAppRoot()
            }
        }
    }
}

@Composable
fun RailAppRoot() {
    var currentTab by remember { mutableStateOf(RailNavTab.SEARCH) }
    var selectedTrainNumberForLive by remember { mutableStateOf("22436") }
    var selectedTrainForSchedule by remember { mutableStateOf<Train?>(null) }
    var showEmergencyDialog by remember { mutableStateOf(false) }

    if (showEmergencyDialog) {
        EmergencySosDialog(onDismiss = { showEmergencyDialog = false })
    }

    Scaffold(
        topBar = {
            RailHeader(
                onEmergencyClick = { showEmergencyDialog = true }
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 6.dp,
                modifier = Modifier
                    .height(64.dp)
                    .border(width = 1.dp, color = Slate200)
            ) {
                RailNavTab.values().forEach { tab ->
                    val isSelected = currentTab == tab
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentTab = tab },
                        icon = {
                            Icon(
                                imageVector = tab.icon,
                                contentDescription = tab.label,
                                tint = if (isSelected) SkyBlue500 else Slate400,
                                modifier = Modifier.size(20.dp)
                            )
                        },
                        label = {
                            Text(
                                text = tab.label,
                                fontSize = 9.sp,
                                fontWeight = if (isSelected) FontWeight.ExtraBold else FontWeight.Medium,
                                color = if (isSelected) SkyBlue600 else Slate500,
                                maxLines = 1
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            indicatorColor = SkyBlue50,
                            selectedIconColor = SkyBlue500,
                            unselectedIconColor = Slate400,
                            selectedTextColor = SkyBlue600,
                            unselectedTextColor = Slate500
                        )
                    )
                }
            }
        },
        modifier = Modifier.fillMaxSize()
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentTab) {
                RailNavTab.SEARCH -> {
                    TrainSearchScreen(
                        onTrackLiveClick = { trainNo ->
                            selectedTrainNumberForLive = trainNo
                            currentTab = RailNavTab.LIVE
                        },
                        onViewScheduleClick = { train ->
                            selectedTrainForSchedule = train
                            currentTab = RailNavTab.COACH
                        },
                        onCoachLayoutClick = { train ->
                            selectedTrainForSchedule = train
                            currentTab = RailNavTab.COACH
                        }
                    )
                }
                RailNavTab.LIVE -> {
                    LiveRunningScreen(
                        initialTrainNumber = selectedTrainNumberForLive
                    )
                }
                RailNavTab.PNR -> {
                    PnrStatusScreen()
                }
                RailNavTab.STATION -> {
                    LiveStationScreen(
                        onTrackLiveClick = { trainNo ->
                            selectedTrainNumberForLive = trainNo
                            currentTab = RailNavTab.LIVE
                        }
                    )
                }
                RailNavTab.COACH -> {
                    CoachAndScheduleScreen(
                        initialTrain = selectedTrainForSchedule
                    )
                }
                RailNavTab.AI_GUIDE -> {
                    AiRailAssistantScreen()
                }
            }
        }
    }
}
