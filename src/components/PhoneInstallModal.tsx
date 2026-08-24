import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Check, Share2, PlusSquare, ArrowRight, X, ExternalLink, QrCode } from 'lucide-react';

interface PhoneInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneInstallModal: React.FC<PhoneInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeOs, setActiveOs] = useState<'android' | 'ios' | 'apk'>('android');
  const [appUrl, setAppUrl] = useState<string>('');

  useEffect(() => {
    setAppUrl(window.location.href);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('App URL copied to clipboard! You can send it to your phone via WhatsApp/Telegram or open in Chrome/Safari.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Install RailApp on Your Phone</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Get the full fullscreen app experience on Android & iPhone</p>
          </div>
        </div>

        {/* OS Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveOs('android')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeOs === 'android'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Android (Chrome)
          </button>
          <button
            onClick={() => setActiveOs('ios')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeOs === 'ios'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            iPhone (Safari)
          </button>
          <button
            onClick={() => setActiveOs('apk')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeOs === 'apk'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Android APK File
          </button>
        </div>

        {/* Option 1: Android Chrome Install */}
        {activeOs === 'android' && (
          <div className="space-y-4">
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>One-Click Install RailApp to Home Screen</span>
              </button>
            )}

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
                How to add on Android phone:
              </span>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside">
                <li>Open this link on your phone in <strong>Google Chrome</strong>.</li>
                <li>Tap the <strong>three dots menu (⋮)</strong> at the top right of Chrome.</li>
                <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>RailApp will install instantly and open as a standalone app with no browser address bar!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Option 2: iOS Safari Install */}
        {activeOs === 'ios' && (
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
              How to add on iPhone / iPad:
            </span>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside">
              <li>Open this app on your iPhone using <strong>Safari</strong> browser.</li>
              <li>Tap the <strong>Share icon</strong> (square with arrow pointing up) at the bottom toolbar.</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong> (with the ➕ icon).</li>
              <li>Tap <strong>"Add"</strong> at the top right. RailApp icon will appear on your home screen!</li>
            </ol>
          </div>
        )}

        {/* Option 3: Android Direct APK */}
        {activeOs === 'apk' && (
          <div className="space-y-3">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
                Download Native Android APK package:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You can download the compiled Android package directly to install on your Android device.
              </p>
              <a
                href="/app-debug.apk"
                download="RailApp-debug.apk"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download RailApp.apk (Android Package)</span>
              </a>
            </div>
          </div>
        )}

        {/* QR Code / Share Link */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all"
          >
            <Share2 className="w-4 h-4 text-amber-500" />
            <span>Copy Phone Link to Clipboard</span>
          </button>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Works offline & fullscreen
          </span>
        </div>

      </div>
    </div>
  );
};
