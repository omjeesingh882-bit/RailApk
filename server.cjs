const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Gemini Server-side proxy
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        text: 'IRCTC Rule Information: For ticket bookings, tatkal opens at 10 AM (AC) & 11 AM (Non-AC). Dial 139 for 24/7 RailMadad assistance.'
      });
    }

    // Dynamic import for ES Module @google/genai
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are RailApp AI Travel Concierge, an expert on Indian Railways (IRCTC, CRIS, NTES). Provide helpful, accurate advice regarding trains, tatkal timings, cancellation refund slabs, onboard rules, and route tips concisely.'
      }
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to process AI rail request', details: err.message });
  }
});

// Serve Android APK directly if requested
app.get('/app-debug.apk', (req, res) => {
  const apkPaths = [
    path.join(__dirname, '.build-outputs', 'app-debug.apk'),
    path.join(__dirname, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk')
  ];

  for (const p of apkPaths) {
    if (fs.existsSync(p)) {
      return res.download(p, 'RailApp-debug.apk');
    }
  }

  res.status(404).send('APK not found or still compiling.');
});

// Serve Vite build output
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If dist doesn't exist yet, serve a lightweight status message
  app.get('*', (req, res) => {
    res.send('<!DOCTYPE html><html><body style="background:#0f172a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;"><h1>RailApp Dev Server Ready</h1></body></html>');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RailApp production server running on http://0.0.0.0:${PORT}`);
});
