import React, { useState } from 'react';
import { liveTrackingDataMap, allTrains } from '../data/railData';
import { TrainLiveRunningStatus } from '../types';
import { MapRouteView } from './MapRouteView';
import { 
  Search, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Navigation, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const LiveRunningTracker: React.FC = () => {
  const [selectedTrainNo, setSelectedTrainNo] = useState<string>('22436');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const status: TrainLiveRunningStatus = liveTrackingDataMap[selectedTrainNo] || liveTrackingDataMap['22436'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredTrains = allTrains.filter(t => 
    t.number.includes(searchQuery) || t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Bar for Live Train */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm dark:shadow-xl transition-colors duration-200">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              id="live-train-search-input"
              placeholder="Enter Train Number or Name (e.g. 22436, 12302, Rajdhani, Vande Bharat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 text-sm transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-amber-500 dark:text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick select pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Quick:
          </span>
          {allTrains.slice(0, 4).map((train) => (
            <button
              key={train.number}
              onClick={() => setSelectedTrainNo(train.number)}
              className={`text-xs px-3 py-1 rounded-lg border whitespace-nowrap transition-all ${
                selectedTrainNo === train.number
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/50 font-bold'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {train.number} - {train.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Status Banner */}
      <div className={`p-4 sm:p-6 rounded-2xl border shadow-sm dark:shadow-xl transition-all ${
        status.delayMinutes === 0 
          ? 'bg-gradient-to-r from-emerald-500/10 via-white to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-500/30' 
          : 'bg-gradient-to-r from-amber-500/10 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border-amber-500/30'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500 text-slate-950 shadow-sm">
                {status.trainNumber}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{status.trainName}</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span>{status.sourceStation}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{status.destStation}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
              status.delayMinutes === 0
                ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30'
            }`}>
              {status.delayMinutes === 0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {status.delayMinutes === 0 ? 'Right Time (On Time)' : `Late by ${status.delayMinutes} Mins`}
                </span>
                <span className="text-[11px] opacity-80">{status.statusMessage}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Map & Corridor Overview */}
      <MapRouteView status={status} />

      {/* Detailed Halt Schedule Timeline */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl transition-colors duration-200">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Station Halts & Live Arrival Timeline</span>
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {status.halts.map((halt) => {
            const isDeparted = halt.isDeparted;
            const isCurrent = halt.isCurrent;

            return (
              <div key={halt.stationCode} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/90 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                {/* Timeline Bullet */}
                <div className={`absolute -left-[27px] sm:-left-[31px] top-4 w-4 h-4 rounded-full border-2 ${
                  isCurrent
                    ? 'bg-amber-500 border-white dark:border-white shadow-md shadow-amber-500'
                    : isDeparted
                    ? 'bg-emerald-500 border-emerald-300'
                    : 'bg-slate-300 dark:bg-slate-900 border-slate-400 dark:border-slate-700'
                }`}></div>

                {/* Station Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">{halt.stationCode}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{halt.stationName}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        Current Halt
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Platform {halt.platformNo} &bull; Halt: {halt.haltMinutes}m &bull; {halt.distanceKm} km
                  </p>
                </div>

                {/* Times & Delay */}
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Scheduled</span>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200">
                      {halt.scheduledArrival} - {halt.scheduledDeparture}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Actual / Expected</span>
                    <span className={`text-xs font-mono font-bold ${
                      halt.delayMinutes === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {halt.actualArrival} - {halt.actualDeparture}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
