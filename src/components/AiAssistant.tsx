import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Namaste! I am your AI Rail Travel Concierge. Ask me about train routes, tatkal booking tips, cancellation refund rules, alternate trains, or onboard amenities.',
      isUser: false,
      timestamp: Date.now(),
      quickReplies: [
        'How does Tatkal booking work?',
        'What are the IRCTC cancellation charges?',
        'How to file TDR if train is late?',
        'Rules for carrying luggage in 3AC'
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      // Send to server API if available, or smart rule answering
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      }).catch(() => null);

      let reply = '';
      if (res && res.ok) {
        const data = await res.json();
        reply = data.text || data.reply;
      }

      if (!reply) {
        // High quality smart rail knowledge responses
        const lower = text.toLowerCase();
        if (lower.includes('tatkal')) {
          reply = `📌 **IRCTC Tatkal Booking Guidelines:**\n• **AC Classes (1A, 2A, 3A, 3E, CC, EC):** Opens daily at **10:00 AM** IST (one day before journey).\n• **Non-AC Classes (Sleeper, 2S):** Opens daily at **11:00 AM** IST.\n• **Tips for Speed:** Log in 5 minutes early, keep your Master Passenger List pre-saved, use IRCTC e-Wallet or fast UPI for instant checkout.\n• **Refund:** No refund is granted on cancellation of confirmed Tatkal tickets.`;
        } else if (lower.includes('cancel') || lower.includes('refund')) {
          reply = `💰 **IRCTC Cancellation & Refund Rules:**\n• **>48 hrs before departure:** Flat cancellation fee (₹240 for 1A/EC, ₹200 for 2A, ₹180 for 3A/3E, ₹120 for SL, ₹60 for 2S).\n• **12 to 48 hrs before departure:** 25% of ticket fare (subject to minimum flat fee).\n• **4 to 12 hrs before departure:** 50% of ticket fare.\n• **<4 hrs or after chart preparation:** No refund on confirmed tickets. File a TDR if the train is delayed by >3 hours.`;
        } else if (lower.includes('tdr') || lower.includes('late')) {
          reply = `⏱️ **Filing TDR for Train Delays:**\n• If your train is delayed by **more than 3 hours** at your boarding station, you can cancel your ticket and file a **TDR (Ticket Deposit Receipt)** before the train's actual departure to claim a **100% full refund** without any deduction.`;
        } else if (lower.includes('luggage')) {
          reply = `🧳 **Free Luggage Allowance in Indian Railways:**\n• **AC First Class (1A):** 70 kg per passenger (Marginal: 15 kg)\n• **AC 2 Tier (2A):** 50 kg per passenger (Marginal: 10 kg)\n• **AC 3 Tier / 3E / Chair Car:** 40 kg per passenger (Marginal: 10 kg)\n• **Sleeper Class (SL):** 40 kg per passenger\n• **Second Seating (2S):** 35 kg per passenger`;
        } else {
          reply = `🚆 **RailApp Smart Concierge:**\nRegarding **"${text}"**:\n• For real-time updates, you can use our **Live Status** and **Live Station** tabs directly.\n• For bookings and PNR monitoring, IRCTC charts are typically finalized 4 hours prior to train origination (and 2 hours prior for early morning departures).\n• Dial **139 (RailMadad)** for 24/7 onboard assistance or security issues.`;
        }
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: reply,
        isUser: false,
        timestamp: Date.now(),
        quickReplies: ['Check Tatkal Timings', 'Cancellation Charges', 'File TDR', 'Helpline 139']
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      // Fallback
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'IRCTC information retrieved: Dial 139 for 24x7 all-in-one railway grievance or security support.',
        isUser: false,
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl flex flex-col h-[650px] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>AI Rail Assistant & Travel Concierge</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Gemini Powered &bull; Indian Railways Knowledge Base</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            {!msg.isUser && (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
              msg.isUser
                ? 'bg-amber-500 text-slate-950 font-medium shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Quick Replies */}
              {msg.quickReplies && msg.quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                  {msg.quickReplies.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-500/40 transition-all font-medium shadow-xs"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.isUser && (
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-slate-500 dark:text-slate-400 text-xs italic">
            <Bot className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin" />
            <span>AI Concierge is analyzing railway guidelines...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
        <input
          type="text"
          id="ai-prompt-input"
          placeholder="Ask anything (e.g. Can I change boarding station online? What if chart is prepared?)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
        />
        <button
          type="submit"
          id="ai-send-button"
          disabled={!inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
