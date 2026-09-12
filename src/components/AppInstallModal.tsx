import React from 'react';
import { Smartphone, Download, CheckCircle, ExternalLink, X, Globe, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AppInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppInstallModal: React.FC<AppInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sajju8378.github.io/GitaGuides/';
  const pwaBuilderUrl = `https://www.pwabuilder.com/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="apk-download-modal"
        className="w-full max-w-lg bg-[#0c121e] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold text-2xl">
            ॐ
          </div>
          <div>
            <h3 className="font-serif-sacred text-lg sm:text-xl font-bold text-amber-100">
              Install App & Get APK
            </h3>
            <p className="text-xs text-amber-300/75">
              Bhagavad Gita Wisdom on your Android or Mobile Device
            </p>
          </div>
        </div>

        {isInstalled ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 mb-5 flex items-center gap-3 text-emerald-300">
            <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" />
            <div>
              <p className="text-sm font-semibold">App Already Installed</p>
              <p className="text-xs text-emerald-200/80">You are running the installed application.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Method 1: Instant 1-Click Install */}
            {isInstallable && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Option 1: Direct Android Install (No file needed)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Installs directly to your phone screen with an app icon, offline support, and fullscreen mode.
                </p>
                <button
                  onClick={async () => {
                    await install();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-md hover:from-amber-400 hover:to-yellow-400 transition flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Install App on Device Now
                </button>
              </div>
            )}

            {/* Method 2: Browser Menu (Android Chrome) */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-200 text-sm font-semibold">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>On Android Phone (Chrome / Brave / Edge)</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Open this website on your Android browser.</li>
                <li>Tap the <strong>three dots (⋮)</strong> at the top right of Chrome.</li>
                <li>Tap <strong>&ldquo;Install app&rdquo;</strong> or <strong>&ldquo;Add to Home screen&rdquo;</strong>.</li>
                <li>The app icon will appear in your phone&apos;s app drawer and home screen!</li>
              </ol>
            </div>

            {/* Method 3: Download standalone APK via PWABuilder */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-200 text-sm font-semibold">
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Standalone .APK File</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You can generate and download a signed Android <strong>.apk</strong> or <strong>.aab</strong> package for free using Microsoft PWABuilder:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-400 break-all">
                {currentUrl}
              </div>
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-500/30 font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <span>Generate & Download APK on PWABuilder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] text-slate-400">
                PWABuilder checks the app manifest and produces a ready-to-install Android APK in under 2 minutes.
              </p>
            </div>

            {/* Method 4: iOS Guide */}
            {isIOS && (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-amber-200">On iPhone / iPad (Safari)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tap the <strong>Share</strong> button (box with arrow) in Safari, scroll down and select <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
