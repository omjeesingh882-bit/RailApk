import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { SlideBar } from './components/SlideBar';
import { LiveRunningTracker } from './components/LiveRunningTracker';
import { PnrStatusChecker } from './components/PnrStatusChecker';
import { TrainSearch } from './components/TrainSearch';
import { LiveStationBoard } from './components/LiveStationBoard';
import { CoachVisualizer } from './components/CoachVisualizer';
import { AiAssistant } from './components/AiAssistant';
import { EmergencySosModal } from './components/EmergencySosModal';
import { PhoneInstallModal } from './components/PhoneInstallModal';
import { ShieldCheck, Smartphone } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'running' | 'pnr' | 'search' | 'station' | 'coach' | 'ai'>('running');
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [isSlideBarOpen, setIsSlideBarOpen] = useState<boolean>(false);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* App Header (Top bar with Logo, RailApp, and SlideBar Menu) */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSlideBar={() => setIsSlideBarOpen(true)} 
      />

      {/* Slide Bar / Drawer with Theme Switcher, SOS, and Controls */}
      <SlideBar
        isOpen={isSlideBarOpen}
        onClose={() => setIsSlideBarOpen(false)}
        onOpenSos={() => setIsSosOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'running' && <LiveRunningTracker />}
        {activeTab === 'pnr' && <PnrStatusChecker />}
        {activeTab === 'search' && <TrainSearch />}
        {activeTab === 'station' && <LiveStationBoard />}
        {activeTab === 'coach' && <CoachVisualizer />}
        {activeTab === 'ai' && <AiAssistant />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 py-6 mt-12 text-xs text-slate-500 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>RailApp Companion & Live Tracking Suite &bull; Indian Railways Data Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsInstallOpen(true)}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install on Phone</span>
            </button>
            <a 
              href="/app-debug.apk" 
              download="RailApp-debug.apk" 
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
            >
              <span>Download APK</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Emergency Modal */}
      <EmergencySosModal 
        isOpen={isSosOpen} 
        onClose={() => setIsSosOpen(false)} 
      />

      {/* Phone Install Guide Modal */}
      <PhoneInstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

