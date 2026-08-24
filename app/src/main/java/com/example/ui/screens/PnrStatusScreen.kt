package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.ConfirmationNumber
import androidx.compose.material.icons.filled.Fastfood
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.NotificationsActive
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.repository.RailRepository
import com.example.ui.components.PnrCard
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PnrStatusScreen(
    modifier: Modifier = Modifier
) {
    var pnrInput by remember { mutableStateOf("8421950312") }
    var searchedPnr by remember { mutableStateOf("8421950312") }
    var showRefundInfoDialog by remember { mutableStateOf(false) }

    val pnrDetails = remember(searchedPnr) {
        RailRepository.getPnrDetails(searchedPnr)
    }

    if (showRefundInfoDialog) {
        AlertDialog(
            onDismissRequest = { showRefundInfoDialog = false },
            title = {
                Text("IRCTC Cancellation & Refund Rules", fontWeight = FontWeight.Bold)
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text("• >48 hrs before departure: Flat cancellation charge (1A: ₹240, 2A: ₹200, 3A: ₹180, SL: ₹120).", fontSize = 12.sp)
                    Text("• 12 to 48 hrs before departure: 25% of ticket fare deducted.", fontSize = 12.sp)
                    Text("• 4 to 12 hrs before departure: 50% of ticket fare deducted.", fontSize = 12.sp)
                    Text("• Waitlisted tickets auto-cancelled post chart preparation with full refund to original payment method within 3-5 days.", fontSize = 12.sp)
                }
            },
            confirmButton = {
                Button(
                    onClick = { showRefundInfoDialog = false },
                    colors = ButtonDefaults.buttonColors(containerColor = SkyBlue500),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Got It", fontWeight = FontWeight.Bold)
                }
            }
        )
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        item {
            // PNR Input Card
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
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "PNR STATUS & PREDICTION",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = SkyBlue500,
                            letterSpacing = 1.sp
                        )
                        IconButton(onClick = { showRefundInfoDialog = true }, modifier = Modifier.size(24.dp)) {
                            Icon(Icons.Default.HelpOutline, contentDescription = "Refund Rules", tint = Slate400)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = pnrInput,
                            onValueChange = {
                                if (it.length <= 10 && it.all { char -> char.isDigit() }) {
                                    pnrInput = it
                                }
                            },
                            placeholder = { Text("Enter 10-Digit PNR Number", fontSize = 13.sp) },
                            leadingIcon = {
                                Icon(Icons.Default.ConfirmationNumber, contentDescription = null, tint = SkyBlue500)
                            },
                            trailingIcon = {
                                if (pnrInput.isNotEmpty()) {
                                    IconButton(onClick = { pnrInput = "" }) {
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
                                if (pnrInput.length == 10) {
                                    searchedPnr = pnrInput
                                }
                            },
                            enabled = pnrInput.length == 10,
                            colors = ButtonDefaults.buttonColors(containerColor = SkyBlue500),
                            shape = RoundedCornerShape(14.dp),
                            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 14.dp)
                        ) {
                            Icon(Icons.Default.Search, contentDescription = "Check", modifier = Modifier.size(20.dp))
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Sample PNRs
                    Text(
                        text = "Quick Demo PNRs:",
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
                        items(RailRepository.samplePnrList) { pnr ->
                            val isSelected = searchedPnr == pnr
                            FilterChip(
                                selected = isSelected,
                                onClick = {
                                    pnrInput = pnr
                                    searchedPnr = pnr
                                },
                                label = { Text("PNR: $pnr", fontSize = 10.sp, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium) },
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
        }

        // PNR Result Card
        item {
            PnrCard(pnrDetails = pnrDetails)
        }

        // Travel Smart Pro Card (Vibrant Slate-900) from design
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(18.dp)
                ) {
                    Text(
                        text = "Travel Smart",
                        fontWeight = FontWeight.Black,
                        fontSize = 18.sp,
                        color = Color.White
                    )
                    Text(
                        text = "Get automated PNR status change alerts and IRCTC e-catering food delivery right to your berth.",
                        fontSize = 12.sp,
                        color = Slate400,
                        modifier = Modifier.padding(top = 4.dp, bottom = 14.dp)
                    )

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.White.copy(alpha = 0.06f), RoundedCornerShape(14.dp))
                            .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(14.dp))
                            .padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            color = Orange500,
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.size(30.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text("PNR", fontSize = 9.sp, fontWeight = FontWeight.Black, color = Color.White)
                            }
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = "Auto-PNR Status Tracking & Chart Alert",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color.White
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.White.copy(alpha = 0.06f), RoundedCornerShape(14.dp))
                            .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(14.dp))
                            .padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            color = Emerald600,
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.size(30.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text("FOOD", fontSize = 9.sp, fontWeight = FontWeight.Black, color = Color.White)
                            }
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = "IRCTC E-Catering Support at Halts",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color.White
                        )
                    }
                }
            }
        }
    }
}
