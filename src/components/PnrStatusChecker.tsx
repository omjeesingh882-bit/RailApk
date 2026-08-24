import React, { useState } from 'react';
import { samplePnrDatabase } from '../data/railData';
import { PnrDetails } from '../types';
import { 
  Ticket, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

export const PnrStatusChecker: React.FC = () => {
  const [pnrInput, setPnrInput] = useState<string>('2456891023');
  const [pnrData, setPnrData] = useState<PnrDetails | null>(samplePnrDatabase['2456891023']);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pnrInput.trim().replace(/\D/g, '');
    if (samplePnrDatabase[clean]) {
      setPnrData(samplePnrDatabase[clean]);
    } else {
      // Dynamic fallback generator
      setPnrData({
        pnrNumber: clean || '2893849102',
        trainNumber: '12952',
        trainName: 'Mumbai Tejas Rajdhani',
        journeyDate: '29 Aug 2026',
        fromStation: { code: 'NDLS', name: 'New Delhi', city: 'Delhi', state: 'Delhi', platformsCount: 16 },
        toStation: { code: 'CSMT', name: 'Mumbai CSMT', city: 'Mumbai', state: 'Maharashtra', platformsCount: 18 },
        boardingStation: { code: 'NDLS', name: 'New Delhi', city: 'Delhi', state: 'Delhi', platformsCount: 16 },
        travelClass: '3A',
        quota: 'General (GN)',
        chartStatus: 'Chart Not Prepared',
        passengers: [
          { passengerNo: 1, bookingStatus: 'WL 18', currentStatus: 'RAC 4', coach: 'B2', berth: '34', berthType: 'Side Lower (SL)' },
          { passengerNo: 2, bookingStatus: 'WL 19', currentStatus: 'RAC 5', coach: 'B2', berth: '35', berthType: 'Side Upper (SU)' }
        ],
        confirmationProbability: 94,
        coachPosition: 'Engine - B1 - [B2] - B3 - B4 - A1 - A2 - H1 - EOG',
        farePaid: 4250
      });
    }
    setHasSearched(true);
  };

  return (
    <div className="space-y-6">
      
      {/* PNR Search Card */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl transition-colors duration-200">
        <div className="flex items-center gap-2 mb-2">
          <Ticket className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">IRCTC 10-Digit PNR Status & Confirmation Chance</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
          Check real-time booking status, coach position, chart status, and AI confirmation prediction.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              id="pnr-input-field"
              maxLength={10}
              placeholder="Enter 10-digit PNR number (e.g. 2456891023)..."
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 font-mono tracking-widest text-slate-900 dark:text-white text-base focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            id="pnr-submit-button"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Check Status</span>
          </button>
        </form>

        {/* Quick Sample PNR buttons */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Samples:
          </span>
          {Object.keys(samplePnrDatabase).map((pnr) => (
            <button
              key={pnr}
              type="button"
              onClick={() => {
                setPnrInput(pnr);
                setPnrData(samplePnrDatabase[pnr]);
                setHasSearched(true);
              }}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-300 transition-all"
            >
              {pnr}
            </button>
          ))}
        </div>
      </div>

      {/* PNR Results Card */}
      {pnrData && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-white via-white to-amber-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/30 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono tracking-wider uppercase">
                    PNR: {pnrData.pnrNumber}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {pnrData.quota}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {pnrData.trainNumber} - {pnrData.trainName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-right">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Journey Date</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">{pnrData.journeyDate}</span>
                </div>

                <div className={`px-3.5 py-2 rounded-xl border ${
                  pnrData.chartStatus.includes('Prepared') && !pnrData.chartStatus.includes('Not')
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                }`}>
                  <span className="text-[10px] block uppercase font-bold">Chart Status</span>
                  <span className="text-xs font-bold">{pnrData.chartStatus}</span>
                </div>
              </div>
            </div>

            {/* Stations Route summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">From (Source)</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{pnrData.fromStation.name} ({pnrData.fromStation.code})</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">To (Destination)</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{pnrData.toStation.name} ({pnrData.toStation.code})</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Class & Total Fare</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{pnrData.travelClass} &bull; ₹{pnrData.farePaid}</span>
              </div>
            </div>

          </div>

          {/* Passenger List */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm dark:shadow-xl transition-colors duration-200">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Passenger Status & Seat Allocation</span>
            </h4>

            <div className="space-y-3">
              {pnrData.passengers.map((p) => {
                const isConfirmed = p.currentStatus.startsWith('CNF');
                const isRac = p.currentStatus.startsWith('RAC');

                return (
                  <div key={p.passengerNo} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-600 dark:text-amber-400">
                        P{p.passengerNo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">Passenger {p.passengerNo}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Booked: {p.bookingStatus}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                          <span>Coach: <strong className="text-slate-900 dark:text-white font-mono">{p.coach}</strong></span>
                          <span>&bull;</span>
                          <span>Berth: <strong className="text-slate-900 dark:text-white font-mono">{p.berth}</strong></span>
                          <span>&bull;</span>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">{p.berthType}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border ${
                        isConfirmed 
                          ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40' 
                          : isRac 
                          ? 'bg-blue-500/20 text-blue-800 dark:text-blue-300 border-blue-500/40' 
                          : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
                      }`}>
                        {p.currentStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coach Composition Bar */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2 font-semibold">Rake Coach Composition & Position:</span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-nowrap py-1">
                {pnrData.coachPosition}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
