import React from 'react';
import { Compass, Music, BookOpen, Bookmark, Volume2, Pause, Play } from 'lucide-react';

export type NavTab = 'oracle' | 'tanpura' | 'library' | 'reflections';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedCount: number;
  isTanpuraPlaying: boolean;
  onToggleTanpura: () => void;
  rootKey: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  isTanpuraPlaying,
  onToggleTanpura,
  rootKey,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#080c15]/90 border-b border-amber-500/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <button
              onClick={() => onSelectTab('oracle')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <span className="font-sanskrit text-2xl font-bold text-slate-950 select-none">ॐ</span>
              </div>
              <div>
                <span className="font-serif-sacred font-bold text-base sm:text-lg text-amber-100 tracking-wide block leading-tight">
                  Bhagavad Gita Wisdom
                </span>
                <span className="text-[10px] text-amber-300/75 uppercase tracking-widest block">
                  Guidance & Meditative Tanpura
                </span>
              </div>
            </button>

            {/* Quick Tanpura toggle button for mobile */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onToggleTanpura}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  isTanpuraPlaying
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25'
                    : 'bg-slate-900 text-amber-200 border-slate-800'
                }`}
              >
                {isTanpuraPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTanpuraPlaying ? 'Tanpura On' : 'Tanpura'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 w-full md:w-auto justify-center overflow-x-auto py-1">
            <button
              id="tab-oracle"
              onClick={() => onSelectTab('oracle')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                currentTab === 'oracle'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Seek Guidance</span>
            </button>

            <button
              id="tab-tanpura"
              onClick={() => onSelectTab('tanpura')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 relative ${
                currentTab === 'tanpura'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Tanpura Sanctuary</span>
              {isTanpuraPlaying && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            <button
              id="tab-library"
              onClick={() => onSelectTab('library')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                currentTab === 'library'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Gita Library</span>
            </button>

            <button
              id="tab-reflections"
              onClick={() => onSelectTab('reflections')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                currentTab === 'reflections'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Reflections</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Desktop Persistent Tanpura Mini Bar Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-quick-tanpura"
              onClick={onToggleTanpura}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                isTanpuraPlaying
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 text-amber-300/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isTanpuraPlaying ? 'animate-pulse' : ''}`} />
              <span>{isTanpuraPlaying ? `Tanpura Drone (${rootKey})` : 'Play Tanpura'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
