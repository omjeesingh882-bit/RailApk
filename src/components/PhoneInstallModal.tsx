import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Download, 
  Check, 
  Share2, 
  X, 
  ExternalLink, 
  QrCode, 
  Globe, 
  Package, 
  Store,
  Layers,
  Copy
} from 'lucide-react';

interface PhoneInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneInstallModal: React.FC<PhoneInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'publish' | 'qr'>('pwa');
  const [appUrl, setAppUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Current live URL of the application
    const currentUrl = window.location.origin || window.location.href;
    setAppUrl(currentUrl);

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
    } else {
      alert('To install on your phone:\n\n1. Open this URL in Chrome (Android) or Safari (iOS)\n2. Tap the browser menu (⋮ or Share)\n3. Select "Install App" or "Add to Home Screen"');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(appUrl || window.location.origin)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(appUrl || window.location.href)}&color=0f172a&bgcolor=ffffff&qzone=2`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Get RailApp on Your Phone & APK</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Install directly as a Native App, Build an APK, or Publish to Play Store</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'pwa'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📱 Phone App
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'apk'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📦 Build APK
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'publish'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🚀 Play Store
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'qr'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📷 Scan QR
          </button>
        </div>

        {/* TAB 1: Instant Native Phone Installation */}
        {activeTab === 'pwa' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs">
              <strong>✨ Recommended Fast Method:</strong> You do not need to manually sign or install unsafe APK files! RailApp is a certified Progressive Web App (PWA) with offline caching and native app behavior.
            </div>

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-98"
              >
                <Download className="w-5 h-5" />
                <span>Tap Here to Install RailApp on Phone</span>
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Android Instructions */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Android (Chrome / Brave / Edge)
                </span>
                <ol className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
                  <li>Open the URL on your phone's browser.</li>
                  <li>Tap the <strong>three dots (⋮)</strong> at top right.</li>
                  <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>RailApp will appear as an app icon with standalone full screen.</li>
                </ol>
              </div>

              {/* iPhone Instructions */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  iPhone & iPad (Safari)
                </span>
                <ol className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
                  <li>Open this URL in <strong>Safari</strong>.</li>
                  <li>Tap the <strong>Share</strong> button (square with arrow).</li>
                  <li>Scroll down and select <strong>"Add to Home Screen"</strong> (➕).</li>
                  <li>Tap <strong>Add</strong>. The RailApp icon appears on your home screen.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Generate Real Android APK with PWABuilder */}
        {activeTab === 'apk' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  1-Click Android APK & AAB Generator (PWABuilder)
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                PWABuilder (created by Microsoft) takes your live RailApp URL, bundles all icons & manifest, and builds a signed <strong>.apk</strong> (for testing/sideloading) and <strong>.aab</strong> (for Google Play Store).
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href={pwaBuilderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Signed APK on PWABuilder &rarr;</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                  Click the button above &rarr; Click <strong>"Package for Android"</strong> &rarr; Download your <strong>RailApp.apk</strong> package.
                </p>
              </div>
            </div>

            {/* Alternative: Capacitor/Android Studio */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-900 dark:text-white block">
                Method 2: Native Android Studio Build
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                You can export the project source code as a ZIP (from top Settings menu) and run <code className="bg-white dark:bg-slate-900 px-1 py-0.5 rounded font-mono">npx @bubblewrap/cli build</code> or Capacitor to output an APK in Android Studio.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Publishing to Google Play Store */}
        {activeTab === 'publish' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Publishing RailApp to Google Play Store
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Generate the Android App Bundle (.aab):</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Use PWABuilder or Bubblewrap to package the app as a Trusted Web Activity (TWA).</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Create Google Play Developer Account:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Sign in to <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 underline">Google Play Console</a>.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Upload .aab & Digital Asset Links:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Upload your signed bundle, configure store listing details (RailApp, Screenshots, Train Tracker), and submit for review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Instant Phone Scan via QR Code */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center justify-center p-4 space-y-4 text-center">
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-slate-200">
              <img
                src={qrCodeUrl}
                alt="Scan RailApp QR Code"
                className="w-52 h-52 object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                Point your Phone Camera at this QR Code
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Open your phone's camera app &bull; Scan the QR code &bull; Tap the link to open and install RailApp instantly.
              </p>
            </div>
          </div>
        )}

        {/* Footer & Share Bar */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-500" />
                <span>Copy App URL Link</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            PWA Standalone &bull; Offline Ready
          </span>
        </div>

      </div>
    </div>
  );
};

