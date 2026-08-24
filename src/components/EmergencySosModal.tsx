import React, { useState } from 'react';
import { emergencyHelplines } from '../data/railData';
import { 
  ShieldAlert, 
  X, 
  PhoneCall, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({ isOpen, onClose }) => {
  const [sosSent, setSosSent] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('GPS Active (Kanpur - Prayagraj Section)');

  if (!isOpen) return null;

  const handleTriggerSos = () => {
    setSosSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-2 border-rose-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 transition-colors duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 dark:text-rose-400">
            <ShieldAlert className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Railway Emergency SOS & Helplines</h2>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Indian Railways Security & Medical Assistance</p>
          </div>
        </div>

        {/* Emergency Alert Action */}
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">Instant RailMadad SOS</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{locationStatus}</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300">
            Pressing SOS will broadcast your current train position and coach info to the on-duty Train Superintendent (TTE), RPF Escort, and next station master.
          </p>

          <button
            onClick={handleTriggerSos}
            disabled={sosSent}
            className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              sosSent
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 active:scale-95'
            }`}
          >
            {sosSent ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>SOS Alert Transmitted to RPF & TTE</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                <span>BROADCAST EMERGENCY SOS (139 / RPF)</span>
              </>
            )}
          </button>
        </div>

        {/* Helplines List */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Direct Dial Emergency Numbers:</span>
          {emergencyHelplines.map((line) => (
            <div
              key={line.number}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">{line.service}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{line.desc}</span>
              </div>

              <a
                href={`tel:${line.number.split(' ')[0]}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs shrink-0 transition-all shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{line.number}</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
