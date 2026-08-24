import React, { useState } from 'react';
import { Grid, Info } from 'lucide-react';
import { TravelClassCode } from '../types';

export const CoachVisualizer: React.FC = () => {
  const [selectedCoachType, setSelectedCoachType] = useState<TravelClassCode>('3A');
  const [berthInput, setBerthInput] = useState<number>(23);

  // Generate 72 berths for 3A / Sleeper
  const totalBerths = selectedCoachType === '2A' ? 54 : selectedCoachType === '1A' ? 24 : selectedCoachType === 'CC' ? 78 : 72;

  const getBerthType = (berthNo: number, coachType: TravelClassCode): string => {
    if (coachType === '3A' || coachType === '3E' || coachType === 'SL') {
      const mod = berthNo % 8;
      if (mod === 1 || mod === 4) return 'Lower Berth (LB)';
      if (mod === 2 || mod === 5) return 'Middle Berth (MB)';
      if (mod === 3 || mod === 6) return 'Upper Berth (UB)';
      if (mod === 7) return 'Side Lower (SL)';
      if (mod === 0) return 'Side Upper (SU)';
    } else if (coachType === '2A') {
      const mod = berthNo % 6;
      if (mod === 1 || mod === 3) return 'Lower Berth (LB)';
      if (mod === 2 || mod === 4) return 'Upper Berth (UB)';
      if (mod === 5) return 'Side Lower (SL)';
      if (mod === 0) return 'Side Upper (SU)';
    } else if (coachType === 'CC' || coachType === 'EC') {
      const mod = berthNo % 5;
      if (mod === 1 || mod === 5) return 'Window Seat (WS)';
      if (mod === 2 || mod === 4) return 'Aisle Seat (AS)';
      return 'Middle Seat';
    }
    return 'Berth';
  };

  const selectedBerthType = getBerthType(berthInput, selectedCoachType);

  return (
    <div className="space-y-6">
      
      {/* Selector and Search */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Grid className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <span>Interactive Coach Layout & Seat Position Visualizer</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Find your exact seat location, window side, charging sockets, and washroom proximity in standard LHB/ICF coaches.
        </p>

        {/* Coach Type Select */}
        <div className="flex flex-wrap items-center gap-2">
          {(['3A', '2A', '1A', '3E', 'SL', 'CC', 'EC'] as TravelClassCode[]).map(type => (
            <button
              key={type}
              onClick={() => setSelectedCoachType(type)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                selectedCoachType === type
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {type === '3A' ? '3AC (3 Tier)' : type === '2A' ? '2AC (2 Tier)' : type === '1A' ? '1AC (First Class)' : type === '3E' ? '3E (Economy)' : type === 'SL' ? 'SL (Sleeper)' : type === 'CC' ? 'CC (Chair Car)' : 'EC (Executive)'}
            </button>
          ))}
        </div>

        {/* Highlight Berth Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Highlight Seat / Berth #:</span>
            <input
              type="number"
              min={1}
              max={totalBerths}
              value={berthInput}
              onChange={(e) => setBerthInput(Number(e.target.value))}
              className="w-24 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500 font-bold text-center"
            />
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Seat {berthInput}: <strong>{selectedBerthType}</strong></span>
          </div>
        </div>

      </div>

      {/* Visual Coach Floorplan */}
      <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-2xl overflow-x-auto transition-colors duration-200">
        
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
            LHB Coach Model &bull; Total Berths: {totalBerths}
          </span>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300"><span className="w-3 h-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></span> Regular</span>
            <span className="flex items-center gap-1 text-amber-800 dark:text-amber-300"><span className="w-3 h-3 rounded bg-amber-500"></span> Your Seat</span>
          </div>
        </div>

        {/* Coach Box with Entry/Exit Doors & Washrooms */}
        <div className="min-w-[700px] border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-slate-900/60 relative shadow-sm">
          
          {/* Left Door & Restroom */}
          <div className="flex items-center justify-between mb-4 text-[10px] font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span>[DOOR 1 &bull; RESTROOM]</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">DIRECTION OF TRAIN MOVEMENT &rarr;</span>
            <span>[DOOR 2 &bull; RESTROOM]</span>
          </div>

          {/* Grid of Berths */}
          <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
            {Array.from({ length: totalBerths }, (_, i) => i + 1).map((bNo) => {
              const isSelected = bNo === berthInput;
              const type = getBerthType(bNo, selectedCoachType);

              return (
                <div
                  key={bNo}
                  onClick={() => setBerthInput(bNo)}
                  className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-white font-black scale-110 shadow-lg shadow-amber-500/50 z-10'
                      : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-mono font-bold block">{bNo}</span>
                  <span className={`text-[8px] block uppercase font-medium leading-tight ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                    {type.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

