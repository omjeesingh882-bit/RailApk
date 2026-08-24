import React, { useState } from 'react';
import { popularStations } from '../data/railData';
import { 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const LiveStationBoard: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string>('NDLS');
  const [windowHours, setWindowHours] = useState<number>(4);
  const [filterType, setFilterType] = useState<'ALL' | 'ARRIVALS' | 'DEPARTURES'>('ALL');

  const departures = [
    { number: '22436', name: 'Vande Bharat Express', to: 'Varanasi Junction (BSB)', schDep: '06:00', expDep: '06:00', delay: 0, pf: '16', status: 'Right Time / Boarding' },
    { number: '12004', name: 'Lucknow Shatabdi Express', to: 'Lucknow Charbagh (LKO)', schDep: '06:10', expDep: '06:10', delay: 0, pf: '1', status: 'Right Time' },
    { number: '12424', name: 'Dibrugarh Town Rajdhani', to: 'Dibrugarh (DBRG)', schDep: '16:20', expDep: '16:20', delay: 0, pf: '14', status: 'On Schedule' },
    { number: '12302', name: 'Howrah Rajdhani Express', to: 'Howrah Junction (HWH)', schDep: '16:50', expDep: '16:50', delay: 0, pf: '9', status: 'On Schedule' },
    { number: '12952', name: 'Mumbai Tejas Rajdhani', to: 'Mumbai CSMT (CSMT)', schDep: '16:55', expDep: '16:55', delay: 0, pf: '3', status: 'On Schedule' },
    { number: '12394', name: 'Sampoorna Kranti Express', to: 'Patna Junction (PNBE)', schDep: '17:30', expDep: '17:30', delay: 0, pf: '16', status: 'On Schedule' },
    { number: '12626', name: 'Kerala Superfast Express', to: 'Chennai Central (MAS)', schDep: '20:10', expDep: '20:10', delay: 0, pf: '4', status: 'On Schedule' },
    { number: '12556', name: 'Gorakhdham Superfast Express', to: 'Gorakhpur Junction (GKP)', schDep: '21:25', expDep: '21:40', delay: 15, pf: '6', status: 'Delayed 15 mins' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Station Selector Header */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>Station Live Departure & Arrival Display Board</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live electronic station indicator board with real-time platform allocations.
            </p>
          </div>

          {/* Station dropdown */}
          <div className="w-full md:w-72">
            <select
              id="live-station-select"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
            >
              {popularStations.map(st => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code}) - {st.platformsCount} Platforms
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Time Windows & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {[2, 4, 8].map(hrs => (
              <button
                key={hrs}
                onClick={() => setWindowHours(hrs)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  windowHours === hrs 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Next {hrs} Hours
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {(['ALL', 'DEPARTURES', 'ARRIVALS'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  filterType === type 
                    ? 'bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border-amber-500/50' 
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Electronic Board Table View */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* LED Style Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
              Live Station Indicator Board &bull; {selectedStation}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">Auto-refresh active</span>
        </div>

        {/* Board rows */}
        <div className="divide-y divide-slate-800/80">
          {departures.map((item) => (
            <div key={item.number} className="p-4 sm:px-6 hover:bg-slate-900/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center font-mono shrink-0">
                  <span className="text-[9px] text-slate-500 uppercase leading-none">PF</span>
                  <span className="text-base font-black text-amber-400 leading-tight">{item.pf}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-400">{item.number}</span>
                    <h3 className="font-bold text-sm sm:text-base text-white">{item.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <span>Towards:</span>
                    <strong className="text-slate-200">{item.to}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pl-13 sm:pl-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Scheduled</span>
                  <span className="font-mono font-bold text-sm text-slate-200">{item.schDep}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Expected</span>
                  <span className={`font-mono font-bold text-sm ${item.delay === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.expDep}
                  </span>
                </div>

                <div className="min-w-28 text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    item.delay === 0
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
