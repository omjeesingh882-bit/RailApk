import React from 'react';
import { TrainLiveRunningStatus } from '../types';
import { Compass, Gauge, Mountain, Sun } from 'lucide-react';

interface MapRouteViewProps {
  status: TrainLiveRunningStatus;
}

export const MapRouteView: React.FC<MapRouteViewProps> = ({ status }) => {
  const currentStationIndex = status.halts.findIndex(h => h.isCurrent) !== -1 
    ? status.halts.findIndex(h => h.isCurrent) 
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-6 transition-colors duration-200">
      
      {/* Top Map Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{status.trainNumber} - {status.trainName}</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {status.sourceStation} &rarr; {status.destStation}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Gauge className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{status.currentSpeedKmH}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">km/h</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Mountain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                {status.halts[currentStationIndex]?.elevationMeters || 120}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">m Alt</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Interactive Rail Route Map with Terrain & Stations */}
      <div className="relative w-full h-64 sm:h-80 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between p-4 transition-colors duration-200">
        
        {/* Map Grid and Terrain Graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
        
        {/* Indian Railway Corridor Overlay */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-400 bg-white/90 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Northern & Eastern Railway Trunk Corridor</span>
          </div>
          <div className="text-amber-600 dark:text-amber-400 font-mono">GPS Signal: Strong (10 Sats)</div>
        </div>

        {/* Dynamic Route SVG */}
        <div className="relative z-10 my-auto w-full px-4 sm:px-8">
          <div className="relative w-full h-12 flex items-center">
            {/* Background Track Line */}
            <div className="absolute left-0 right-0 h-2 bg-slate-300 dark:bg-slate-800 rounded-full"></div>
            
            {/* Covered Track Line */}
            <div 
              className="absolute left-0 h-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (status.coveredDistanceKm / status.totalDistanceKm) * 100)}%` }}
            ></div>

            {/* Station nodes */}
            <div className="relative w-full flex items-center justify-between">
              {status.halts.map((halt) => {
                const isPassed = halt.isDeparted;
                const isNow = halt.isCurrent;

                return (
                  <div key={halt.stationCode} className="flex flex-col items-center group relative cursor-pointer">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 dark:bg-slate-800 border border-slate-700 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap z-20 shadow-lg">
                      {halt.stationName} (PF {halt.platformNo}) &bull; {halt.weatherTempC}°C {halt.weatherDesc}
                    </div>

                    {/* Node Dot */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isNow 
                        ? 'bg-amber-500 border-white shadow-lg shadow-amber-500/50 scale-125' 
                        : isPassed 
                        ? 'bg-emerald-500 border-emerald-300' 
                        : 'bg-slate-200 dark:bg-slate-900 border-slate-400 dark:border-slate-700'
                    }`}>
                      {isNow && <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>}
                    </div>

                    {/* Station Code Label */}
                    <span className={`text-[10px] font-bold mt-2 ${
                      isNow ? 'text-amber-600 dark:text-amber-400 font-mono text-xs' : isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-500'
                    }`}>
                      {halt.stationCode}
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 hidden sm:block">
                      {halt.scheduledArrival === 'Source' ? halt.scheduledDeparture : halt.scheduledArrival}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Elevation Profile Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Current Halt</span>
            <span className="font-bold text-slate-900 dark:text-white">{status.currentStationName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Next Station</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">{status.nextStationName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Distance Covered</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{status.coveredDistanceKm} / {status.totalDistanceKm} km</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Station Weather</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              {status.halts[currentStationIndex]?.weatherTempC || 28}°C {status.halts[currentStationIndex]?.weatherDesc || 'Clear'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

