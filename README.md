# 🚆 RailApp — Indian Railways Companion & Live Train Tracker

[![GitHub Repository](https://img.shields.io/badge/GitHub-omjeesingh882--bit%2FRailApk-blue?logo=github)](https://github.com/omjeesingh882-bit/RailApk)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Certified-FFA000?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, lightning-fast **Indian Railways (IRCTC)** companion app built with React, Vite, TypeScript, and Tailwind CSS. Designed for seamless live train tracking, PNR prediction & status confirmation, interactive seat & coach layout visualizers, live station arrival/departure boards, emergency passenger SOS assistance, and smart AI rail travel concierge powered by Google Gemini.

---

## 🌐 Live Web & Mobile Application

- **Live Web App / PWA**: [https://ais-pre-aigyo2i4to44jeth7p2yoi-59869504496.asia-southeast1.run.app](https://ais-pre-aigyo2i4to44jeth7p2yoi-59869504496.asia-southeast1.run.app)
- **GitHub Repository**: [https://github.com/omjeesingh882-bit/RailApk](https://github.com/omjeesingh882-bit/RailApk)

---

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
| 📍 **Live Train Running Status** | Real-time GPS-simulated train tracking with delay indicators, platform numbers, intermediate stops, and dynamic ETA updates. |
| 🎫 **PNR Status & Confirmation** | Check 10-digit PNR details with passenger berth assignments, coach numbers, booking status, and historical confirmation chances. |
| 🔍 **Train Between Stations** | Search all express, superfast, Vande Bharat, and Rajdhani trains between any two Indian railway stations with class filters (1A, 2A, 3A, SL, CC). |
| 🚉 **Live Station Board** | Real-time arrival and departure board for any station in India with expected platforms and late/on-time status tags. |
| 💺 **Interactive Coach & Seat Visualizer** | Interactive 2D seating layout for Sleeper (SL), 3AC (3A), 2AC (2A), 1AC (1A), and Chair Car (CC) coaches. Highlight your seat number (e.g. Side Lower, Window). |
| 🚨 **Emergency SOS & Helpline** | Quick one-tap dialing for Railway Police (RPF 139), Women Security (182), Medical Emergency, GRP, and RailMadad grievance filing. |
| 🤖 **Gemini AI Rail Assistant** | Context-aware AI assistant answering rules, refund policies, tatkal booking tips, luggage allowances, and route recommendations. |
| 📱 **Full PWA & Offline Support** | Native mobile experience on Android & iOS with service worker caching, home screen installability, and responsive touch controls. |

---

## 📱 Mobile App Installation & APK Generation

### Option 1: Instant PWA Install on Android & iPhone (Recommended)
RailApp is a certified **Progressive Web App (PWA)** that runs in full-screen standalone mode without any browser URL bar:
1. Open the [Live Web App](https://ais-pre-aigyo2i4to44jeth7p2yoi-59869504496.asia-southeast1.run.app) on your phone.
2. **Android (Chrome)**: Tap the three dots (`⋮`) at top right &rarr; tap **"Install App"** (or **"Add to Home screen"**).
3. **iPhone (Safari)**: Tap the **Share** icon &rarr; scroll down and select **"Add to Home Screen"** (`➕`).

---

### Option 2: Build Android APK Locally with Bubblewrap / Android CLI
You can generate a signed native `.apk` using Google's official Bubblewrap CLI:

```bash
# 1. Install Bubblewrap CLI globally
npm install -g @bubblewrap/cli

# 2. Clone and build the web distribution
git clone https://github.com/omjeesingh882-bit/RailApk.git
cd RailApk
npm install
npm run build

# 3. Initialize Bubblewrap with your local web server or deployed URL
bubblewrap init --manifest=http://localhost:3000/manifest.json

# 4. Build the signed APK and Android App Bundle (.aab)
bubblewrap build
```
The output `app-release-signed.apk` can be transferred and installed on any Android device.

---

### Option 3: Build Native Android Project via Gradle
This repository includes a native Gradle configuration under `/app`:

```bash
# On Linux / macOS
./gradlew assembleDebug

# On Windows
gradlew.bat assembleDebug
```
The compiled APK will be located at `app/build/outputs/apk/debug/app-debug.apk`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) with Hot Module Replacement
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) with Dark/Light Theme support
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini API)
- **PWA Capabilities**: Web App Manifest (`manifest.json`), Service Worker (`sw.js`), and responsive mobile touch handlers
- **Android Runtime**: Kotlin / Gradle TWA (Trusted Web Activity) with release & debug signing configurations

---

## 📂 Project Structure

```text
RailApk/
├── app/                        # Android Gradle module & native configs
│   ├── build.gradle.kts        # Android build configuration
│   └── src/                    # Native Android source files
├── public/                     # Static public assets
│   ├── icon-192.png            # Standard 192x192 app icon
│   ├── icon-192-maskable.png   # Maskable 192x192 app icon
│   ├── icon-512.png            # High-res 512x512 app icon
│   ├── icon-512-maskable.png   # High-res maskable icon
│   ├── manifest.json           # Web App Manifest for PWA & APK packaging
│   ├── screenshot-desktop.png  # Desktop app preview screenshot
│   ├── screenshot-mobile.png   # Mobile app preview screenshot
│   └── sw.js                   # Service Worker for offline caching
├── src/                        # React source code
│   ├── components/             # Reusable UI & Feature components
│   │   ├── AiAssistant.tsx         # AI travel concierge powered by Gemini
│   │   ├── CoachVisualizer.tsx     # 2D Seat & Coach layout map
│   │   ├── EmergencySosModal.tsx   # Railway helpline & RPF emergency modal
│   │   ├── Header.tsx              # Navigation bar & search quick-links
│   │   ├── LiveRunningTracker.tsx  # Real-time train tracking engine
│   │   ├── LiveStationBoard.tsx    # Live station arrivals & departures
│   │   ├── MapRouteView.tsx        # Interactive route map visualizer
│   │   ├── PhoneInstallModal.tsx   # Phone install & APK guide modal
│   │   ├── PnrStatusChecker.tsx    # 10-digit PNR confirmation predictor
│   │   ├── SlideBar.tsx            # Left navigation drawer & utilities
│   │   └── TrainSearch.tsx         # Station-to-station train search
│   ├── context/                # React Contexts (ThemeContext)
│   ├── data/                   # Station databases & train timetable data
│   ├── App.tsx                 # Main application coordinator
│   ├── main.tsx                # React entry point & SW registration
│   └── index.css               # Global Tailwind CSS imports
├── build.gradle.kts            # Root Gradle configuration
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the repository
```bash
git clone https://github.com/omjeesingh882-bit/RailApk.git
cd RailApk
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables (Optional)
If using custom Gemini AI capabilities:
```bash
cp .env.example .env
# Add your GEMINI_API_KEY inside .env
```

### 4. Start the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for production
```bash
npm run build
```
The optimized production bundle will be generated inside the `dist/` directory.

---

## 🔒 Security & Privacy

- **No Unauthorized Tracking**: Location access is strictly used locally for station distance calculations when explicitly permitted by the user.
- **Client-Side State**: PNR lookups and recent searches are kept securely within client local state.
- **Strict HTTPS / SSL**: All communication with IRCTC data relays and APIs operates exclusively over encrypted TLS connections.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project (`https://github.com/omjeesingh882-bit/RailApk/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author & Maintainer

**Omjee Singh**  
- GitHub: [@omjeesingh882-bit](https://github.com/omjeesingh882-bit)  
- Email: [omjeesingh882@gmail.com](mailto:omjeesingh882@gmail.com)  
- Repository: [https://github.com/omjeesingh882-bit/RailApk](https://github.com/omjeesingh882-bit/RailApk)
