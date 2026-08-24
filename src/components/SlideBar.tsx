import React, { useState } from 'react';
import { 
  X, 
  Sun, 
  Moon, 
  ShieldAlert, 
  PhoneCall, 
  Download, 
  Clock, 
  Compass, 
  Ticket, 
  Search, 
  MapPin, 
  Grid, 
  Bot, 
  Train,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SlideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSos: () => void;
  onOpenInstall: () => void;
  activeTab: 'running' | 'pnr' | 'search' | 'station' | 'coach' | 'ai';
  setActiveTab: (tab: 'running' | 'pnr' | 'search' | 'station' | 'coach' | 'ai') => void;
}

export const SlideBar: React.FC<SlideBarProps> = ({
  isOpen,
  onClose,
  onOpenSos,
  onOpenInstall,
  activeTab,
  setActiveTab
}) => {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  const navItems = [
    { id: 'running', label: 'Live Running Status', icon: Compass, desc: 'GPS & NTES Delay tracking' },
    { id: 'pnr', label: 'PNR Status & Prediction', icon: Ticket, desc: '10-digit IRCTC confirmation' },
    { id: 'search', label: 'Search Trains & Seats', icon: Search, desc: 'Availability & Tatkal booking' },
    { id: 'station', label: 'Live Station Board', icon: MapPin, desc: 'Platforms & live arrivals' },
    { id: 'coach', label: 'Coach & Seat Layout', icon: Grid, desc: 'LHB/ICF Berth visualizer' },
    { id: 'ai', label: 'AI Rail Concierge', icon: Bot, desc: 'Gemini assistant for rules & tips' },
  ] as const;

  const emergencyNumbers = [
    { name: 'RailMadad & Medical Helpline', num: '139' },
    { name: 'RPF Railway Security Helpline', num: '182' },
    { name: 'National Emergency Service', num: '112' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 transition-colors">
        
        {/* Top Header of Slide Bar */}
        <div>
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Train className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">RailApp Menu</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Settings, SOS & Quick Navigation</p>
              </div>
            </div>

            <button
              id="close-slidebar-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-6">
            
            {/* 1. THEME CHANGE OPTION */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDark ? (
                    <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    App Theme Mode
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {isDark ? 'Dark Theme' : 'White Theme'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose between high-contrast White Mode for day lighting or Dark Mode for nighttime viewing.
              </p>

              {/* Theme Selection Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="slidebar-theme-light-btn"
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    !isDark
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm shadow-amber-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>White Mode</span>
                  {!isDark && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" />}
                </button>

                <button
                  id="slidebar-theme-dark-btn"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm shadow-amber-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                  {isDark && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* 2. SOS EMERGENCY OPTION */}
            <div className="bg-rose-50 dark:bg-rose-950/30 rounded-2xl border-2 border-rose-300 dark:border-rose-500/40 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Railway Emergency SOS
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  Direct Line: 139
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Need immediate security, medical aid, or emergency assistance on the train or platform?
              </p>

              <button
                id="slidebar-sos-trigger-btn"
                onClick={() => {
                  onClose();
                  onOpenSos();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm tracking-wide transition-all shadow-md shadow-rose-600/30 active:scale-98"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>OPEN EMERGENCY SOS PANEL</span>
              </button>

              {/* Quick Dial Helplines */}
              <div className="pt-2 border-t border-rose-200 dark:border-rose-900/50 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 block">
                  Quick Helplines:
                </span>
                {emergencyNumbers.map((item) => (
                  <div key={item.num} className="flex items-center justify-between text-xs py-0.5">
                    <span className="text-slate-600 dark:text-slate-300 text-[11px]">{item.name}</span>
                    <a
                      href={`tel:${item.num}`}
                      className="font-mono font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{item.num}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. QUICK FEATURE NAVIGATION */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 block">
                Features & Sections
              </span>
              
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                          : 'bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800/80'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-950/10 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className={`text-[10px] truncate block ${isActive ? 'text-slate-900/80' : 'text-slate-500 dark:text-slate-400'}`}>
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. INSTALL ON PHONE & ANDROID APK */}
            <div className="space-y-2 pt-2">
              <button
                id="slidebar-install-phone-btn"
                onClick={() => {
                  onClose();
                  onOpenInstall();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all font-bold text-xs shadow-md shadow-amber-500/20 active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Install App & Build APK</span>
                </div>
                <span className="text-[10px] font-bold bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
                  Get App / APK
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Footer of Slide Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CRIS / NTES Engine Synced</span>
          </div>
          <span>v2.4.0 Live</span>
        </div>

      </div>
    </div>
  );
};
