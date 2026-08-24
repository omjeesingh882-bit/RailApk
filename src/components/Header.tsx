import React from 'react';
import { 
  Train as TrainIcon, 
  Search, 
  Ticket, 
  MapPin, 
  Grid, 
  Bot, 
  Compass,
  Menu
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'running' | 'pnr' | 'search' | 'station' | 'coach' | 'ai';
  setActiveTab: (tab: 'running' | 'pnr' | 'search' | 'station' | 'coach' | 'ai') => void;
  onOpenSlideBar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSlideBar }) => {
  const navItems = [
    { id: 'running', label: 'Live Status', icon: Compass },
    { id: 'pnr', label: 'PNR Status', icon: Ticket },
    { id: 'search', label: 'Search Trains', icon: Search },
    { id: 'station', label: 'Live Station', icon: MapPin },
    { id: 'coach', label: 'Coach & Seat', icon: Grid },
    { id: 'ai', label: 'AI Rail Concierge', icon: Bot },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand: Only RailApp & Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('running')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <TrainIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white font-serif">RailApp</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  IR Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Indian Railways Companion</p>
            </div>
          </div>

          {/* Slide Bar Menu Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              id="open-slidebar-btn"
              onClick={onOpenSlideBar}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Open Menu (Theme, SOS, Settings)"
            >
              <Menu className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Menu & Controls</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-200 dark:border-slate-800/80 -mx-4 px-4 sm:mx-0 sm:px-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


