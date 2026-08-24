package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.SupportAgent
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
import com.example.data.models.ChatMessage
import com.example.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun AiRailAssistantScreen(
    modifier: Modifier = Modifier
) {
    val coroutineScope = rememberCoroutineScope()
    val listState = rememberLazyListState()

    var messages by remember {
        mutableStateOf(
            listOf(
                ChatMessage(
                    id = "1",
                    text = "Namaste! I am your AI Rail Assistant for Indian Railways. How can I assist you with train bookings, Tatkal timings, RAC rules, baggage allowances, or journey planning today?",
                    isUser = false,
                    quickReplies = listOf(
                        "Tatkal booking timings?",
                        "Can I travel with RAC ticket?",
                        "Train delay >3 hours TDR refund rule?",
                        "Free baggage limit in 3A & 2A?",
                        "Vande Bharat vs Rajdhani difference?"
                    )
                )
            )
        )
    }

    var inputText by remember { mutableStateOf("") }

    val handleSendMessage: (String) -> Unit = { query ->
        if (query.isNotBlank()) {
            val userMsg = ChatMessage(id = System.currentTimeMillis().toString(), text = query, isUser = true)
            val botResponseText = generateBotResponse(query)
            val botMsg = ChatMessage(
                id = (System.currentTimeMillis() + 1).toString(),
                text = botResponseText,
                isUser = false,
                quickReplies = getNextQuickReplies(query)
            )
            messages = messages + userMsg + botMsg
            inputText = ""
            coroutineScope.launch {
                listState.animateScrollToItem(messages.size - 1)
            }
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate50)
    ) {
        // AI Assistant Top Banner
        Surface(
            color = Color.White,
            border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.linearGradient(
                                colors = listOf(SkyBlue500, Orange500)
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(22.dp)
                    )
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = "AI Rail Travel Guide",
                        fontWeight = FontWeight.Black,
                        fontSize = 15.sp,
                        color = Slate900
                    )
                    Text(
                        text = "IRCTC, NTES & Railway Rules Knowledge Base",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = Slate500
                    )
                }
            }
        }

        // Messages List
        LazyColumn(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(vertical = 14.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(messages) { msg ->
                if (msg.isUser) {
                    UserMessageBubble(msg.text)
                } else {
                    AiMessageBubble(
                        text = msg.text,
                        quickReplies = msg.quickReplies,
                        onQuickReplyClick = handleSendMessage
                    )
                }
            }
        }

        // Input Box
        Surface(
            color = Color.White,
            border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 70.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    placeholder = { Text("Ask anything about Indian Railways...", fontSize = 13.sp) },
                    singleLine = true,
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier.weight(1f)
                )

                IconButton(
                    onClick = { handleSendMessage(inputText) },
                    modifier = Modifier
                        .size(46.dp)
                        .clip(CircleShape)
                        .background(SkyBlue500)
                ) {
                    Icon(
                        imageVector = Icons.Default.Send,
                        contentDescription = "Send",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun UserMessageBubble(text: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.End
    ) {
        Surface(
            shape = RoundedCornerShape(20.dp, 20.dp, 4.dp, 20.dp),
            color = SkyBlue500,
            modifier = Modifier.widthIn(max = 280.dp)
        ) {
            Text(
                text = text,
                color = Color.White,
                fontSize = 13.sp,
                lineHeight = 19.sp,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.padding(14.dp)
            )
        }
    }
}

@Composable
fun AiMessageBubble(
    text: String,
    quickReplies: List<String>,
    onQuickReplyClick: (String) -> Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.Start
    ) {
        Surface(
            shape = RoundedCornerShape(20.dp, 20.dp, 20.dp, 4.dp),
            color = Color.White,
            border = androidx.compose.foundation.BorderStroke(1.dp, Slate200),
            shadowElevation = 1.dp,
            modifier = Modifier.widthIn(max = 320.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = text,
                    color = Slate900,
                    fontSize = 13.sp,
                    lineHeight = 19.sp,
                    fontWeight = FontWeight.Normal
                )
            }
        }

        if (quickReplies.isNotEmpty()) {
            Spacer(modifier = Modifier.height(8.dp))
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(quickReplies) { chip ->
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = SkyBlue50,
                        border = androidx.compose.foundation.BorderStroke(1.dp, SkyBlue200),
                        modifier = Modifier.clickable { onQuickReplyClick(chip) }
                    ) {
                        Text(
                            text = chip,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = SkyBlue600,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}

private fun generateBotResponse(query: String): String {
    val q = query.lowercase()
    return when {
        q.contains("tatkal") -> {
            "⏰ Tatkal Booking Timings & Rules:\n\n• AC Classes (1A, 2A, 3A, 3E, CC, EC): Booking opens at 10:00 AM one day prior to journey date.\n• Non-AC Classes (SL, 2S): Booking opens at 11:00 AM one day prior.\n• Premium Tatkal features dynamic fare pricing based on demand.\n• Confirmed Tatkal tickets have zero cancellation refund."
        }
        q.contains("rac") -> {
            "💺 RAC (Reservation Against Cancellation) Rules:\n\n• RAC tickets allow guaranteed legal boarding onto the train.\n• You share a Side Lower (SL) seat with another passenger.\n• TTEs automatically upgrade RAC tickets to full berths upon any cancellation.\n• In Rajdhani/Shatabdi/Duronto trains, RAC passengers receive complete meals."
        }
        q.contains("tdr") || q.contains("delay") || q.contains("refund") -> {
            "📑 Train Delay & TDR Refund Rules:\n\n• If your train is delayed by >3 hours at your boarding station, you get a 100% full refund with NO cancellation charges.\n• File an online TDR before actual departure of the train from your station.\n• Select Reason: 'Train late by more than three hours and passenger not travelled'."
        }
        q.contains("baggage") || q.contains("luggage") || q.contains("weight") -> {
            "🧳 Free Baggage Allowance:\n\n• AC First Class (1A): 70 kg per passenger\n• AC 2 Tier (2A): 50 kg per passenger\n• AC 3 Tier / 3E / Chair Car (CC): 40 kg per passenger\n• Sleeper Class (SL): 40 kg per passenger"
        }
        q.contains("vande bharat") -> {
            "🚅 Vande Bharat Express Highlights:\n\n• India's premier semi-high speed train capable of 160 km/h.\n• Features 180° rotational seats in Executive Class (EC) and 3x2 in Chair Car (CC).\n• Automated sliding plug doors, touchless sensor bio-toilets, and hot catering."
        }
        else -> {
            "Here is the guidance for your query: Indian Railways operates world-class trains including Vande Bharat, Rajdhani, Shatabdi, and Superfast expresses. Always check your PNR charting status 4 hours before departure (1st chart) and 30 minutes before departure (2nd chart) for confirmed seat allocations!"
        }
    }
}

private fun getNextQuickReplies(query: String): List<String> {
    return listOf(
        "Senior citizen quota rules?",
        "How to order food via e-Catering?",
        "Chart preparation time?"
    )
}
