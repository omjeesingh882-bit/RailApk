import React, { useState } from 'react';
import { popularStations, allTrains } from '../data/railData';
import { Station, Train, TravelClassCode } from '../types';
import { 
  ArrowRightLeft, 
  Search, 
  Calendar, 
  Filter, 
  Train as TrainIcon, 
  Clock, 
  IndianRupee, 
  Check, 
  Star,
  Utensils
} from 'lucide-react';

export const TrainSearch: React.FC = () => {
  const [fromCode, setFromCode] = useState<string>('NDLS');
  const [toCode, setToCode] = useState<string>('BSB');
  const [travelDate, setTravelDate] = useState<string>('2026-08-28');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedQuota, setSelectedQuota] = useState<string>('GN');

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const filteredTrains = allTrains.filter(t => {
    // Basic match or display all if user wants general results
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Search Filter Box */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <span>Search Trains & Seat Availability Between Stations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* From Station */}
          <div className="md:col-span-4">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block mb-1">From Station</label>
            <select
              id="from-station-select"
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
            >
              {popularStations.map(st => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code}) - {st.city}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              id="swap-stations-btn"
              onClick={handleSwap}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 border border-slate-300 dark:border-slate-700 transition-all hover:scale-110 active:scale-95 shadow-sm"
              title="Swap From and To stations"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Station */}
          <div className="md:col-span-4">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block mb-1">To Station</label>
            <select
              id="to-station-select"
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
            >
              {popularStations.map(st => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code}) - {st.city}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="md:col-span-3">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block mb-1">Journey Date</label>
            <input
              type="date"
              id="journey-date-input"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 font-mono transition-colors"
            />
          </div>

        </div>

        {/* Quota & Class Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Quota:</span>
            {['GN - General', 'TQ - Tatkal', 'PT - Premium Tatkal', 'LD - Ladies', 'SS - Sr. Citizen'].map(q => {
              const code = q.split(' ')[0];
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setSelectedQuota(code)}
                  className={`text-xs px-3 py-1 rounded-lg border whitespace-nowrap transition-all ${
                    selectedQuota === code 
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm' 
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {q}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Train List Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Available Trains ({filteredTrains.length})
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Updated 2m ago</span>
        </div>

        {filteredTrains.map((train) => (
          <div key={train.number} className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            
            {/* Header: Name, Type & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                    {train.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{train.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Runs on: </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">{train.runningDays.join(' ')}</span>
                  {train.pantryAvailable && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 ml-2">
                      <Utensils className="w-3 h-3" /> Pantry
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{train.rating}</span>
              </div>
            </div>

            {/* Timing & Duration Row */}
            <div className="grid grid-cols-3 items-center text-center bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
              <div className="text-left">
                <span className="text-base sm:text-xl font-bold font-mono text-slate-900 dark:text-white block">{train.departureTime}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{train.sourceStation.name} ({train.sourceStation.code})</span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-amber-500 dark:text-amber-400" /> {train.duration}
                </span>
                <div className="w-24 mx-auto my-1 h-0.5 bg-slate-300 dark:bg-slate-700 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 absolute left-1/2 -top-0.5 -translate-x-1/2"></div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono">{train.distanceKm} km</span>
              </div>

              <div className="text-right">
                <span className="text-base sm:text-xl font-bold font-mono text-slate-900 dark:text-white block">{train.arrivalTime}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{train.destStation.name} ({train.destStation.code})</span>
              </div>
            </div>

            {/* Class Cards with Real Fares & Availability */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
              {train.classes.map((cls) => {
                const isAvailable = cls.statusCode === 'AVAILABLE';
                const isRac = cls.statusCode === 'RAC';

                return (
                  <div
                    key={cls.travelClass}
                    className={`p-3 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${
                      isAvailable
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-500'
                        : isRac
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-500/30 hover:border-blue-500'
                        : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/30 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900 dark:text-white font-mono">{cls.travelClass}</span>
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">₹{cls.fare}</span>
                    </div>

                    <div className={`text-xs font-bold font-mono ${
                      isAvailable ? 'text-emerald-700 dark:text-emerald-400' : isRac ? 'text-blue-700 dark:text-blue-400' : 'text-amber-700 dark:text-amber-400'
                    }`}>
                      {cls.status}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span>Chance:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{cls.confirmationChance}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
