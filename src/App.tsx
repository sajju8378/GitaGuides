import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { GuidanceOracle } from './components/GuidanceOracle';
import { TanpuraPlayer } from './components/TanpuraPlayer';
import { ShlokaLibrary } from './components/ShlokaLibrary';
import { ContemplationJournal } from './components/ContemplationJournal';
import { Shloka, SavedReflection } from './types';
import { shlokaDatabase } from './data/shlokas';
import { meditativeAudio } from './utils/audio';
import { Volume2, Pause, Play, Sparkles, Heart } from 'lucide-react';

const STORAGE_KEY_REFLECTIONS = 'bhagavad_gita_saved_reflections_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('oracle');
  const [savedReflections, setSavedReflections] = useState<SavedReflection[]>([]);
  const [focusedShloka, setFocusedShloka] = useState<Shloka | null>(null);
  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState(false);
  const [rootKey] = useState('C#');

  // Load saved reflections from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REFLECTIONS);
      if (stored) {
        setSavedReflections(JSON.parse(stored));
      } else {
        // Pre-seed with a meaningful default reflection
        const defaultShloka = shlokaDatabase[0]; // BG 2.47
        const initialItem: SavedReflection = {
          id: 'initial-ref-1',
          shlokaId: defaultShloka.id,
          shloka: defaultShloka,
          userDilemma: 'Anxiety about work results and feeling overwhelmed by deadlines.',
          reflectionNote: 'Remember: my duty is my present craft, not the anxiety of tomorrow’s reaction.',
          createdAt: new Date().toISOString(),
        };
        setSavedReflections([initialItem]);
        localStorage.setItem(STORAGE_KEY_REFLECTIONS, JSON.stringify([initialItem]));
      }
    } catch {
      // Storage error fallback
    }
  }, []);

  // Save to localStorage whenever reflections change
  const persistReflections = (list: SavedReflection[]) => {
    setSavedReflections(list);
    try {
      localStorage.setItem(STORAGE_KEY_REFLECTIONS, JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }
  };

  // Toggle save / bookmark shloka
  const handleToggleSaveShloka = (shloka: Shloka) => {
    const exists = savedReflections.some((r) => r.shlokaId === shloka.id);
    if (exists) {
      const updated = savedReflections.filter((r) => r.shlokaId !== shloka.id);
      persistReflections(updated);
    } else {
      const newReflection: SavedReflection = {
        id: `ref-${Date.now()}`,
        shlokaId: shloka.id,
        shloka,
        userDilemma: '',
        reflectionNote: '',
        createdAt: new Date().toISOString(),
      };
      persistReflections([newReflection, ...savedReflections]);
    }
  };

  const handleDeleteReflection = (id: string) => {
    const updated = savedReflections.filter((r) => r.id !== id);
    persistReflections(updated);
  };

  const handleUpdateReflectionNote = (id: string, note: string) => {
    const updated = savedReflections.map((r) => (r.id === id ? { ...r, reflectionNote: note } : r));
    persistReflections(updated);
  };

  // Action: Meditate with this shloka
  const handleMeditateWithShloka = (shloka: Shloka) => {
    setFocusedShloka(shloka);
    setCurrentTab('tanpura');

    // Start Tanpura if not currently playing
    if (!isTanpuraPlaying) {
      meditativeAudio.start();
      setIsTanpuraPlaying(true);
    }
  };

  // Quick toggle Tanpura from header or floating bar
  const handleToggleTanpura = () => {
    if (isTanpuraPlaying) {
      meditativeAudio.stop();
      setIsTanpuraPlaying(false);
    } else {
      meditativeAudio.start();
      setIsTanpuraPlaying(true);
    }
  };

  const savedShlokaIds = savedReflections.map((r) => r.shlokaId);

  return (
    <div className="min-h-screen flex flex-col bg-[#070a14] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sacred Top Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main App Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        savedCount={savedReflections.length}
        isTanpuraPlaying={isTanpuraPlaying}
        onToggleTanpura={handleToggleTanpura}
        rootKey={rootKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 md:py-10">
        {currentTab === 'oracle' && (
          <GuidanceOracle
            onMeditateWithShloka={handleMeditateWithShloka}
            savedShlokaIds={savedShlokaIds}
            onToggleSaveShloka={handleToggleSaveShloka}
          />
        )}

        {currentTab === 'tanpura' && (
          <TanpuraPlayer
            focusedShloka={focusedShloka}
            onClearFocusedShloka={() => setFocusedShloka(null)}
          />
        )}

        {currentTab === 'library' && (
          <ShlokaLibrary
            onMeditateWithShloka={handleMeditateWithShloka}
            savedShlokaIds={savedShlokaIds}
            onToggleSaveShloka={handleToggleSaveShloka}
          />
        )}

        {currentTab === 'reflections' && (
          <ContemplationJournal
            savedReflections={savedReflections}
            onDeleteReflection={handleDeleteReflection}
            onUpdateReflectionNote={handleUpdateReflectionNote}
            onMeditateWithShloka={handleMeditateWithShloka}
            onNavigateToOracle={() => setCurrentTab('oracle')}
          />
        )}
      </main>

      {/* Floating Mini Player Dock (Appears when Tanpura is playing and user is on another tab) */}
      {isTanpuraPlaying && currentTab !== 'tanpura' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md p-3 rounded-2xl bg-gradient-to-r from-[#111728]/95 to-[#0b101c]/95 backdrop-blur-lg border border-amber-500/30 shadow-2xl shadow-amber-500/20 flex items-center justify-between gap-3 animate-fade-in">
          <div
            className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
            onClick={() => setCurrentTab('tanpura')}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/40">
              <span className="font-sanskrit text-lg font-bold">ॐ</span>
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-amber-200 block truncate">
                {focusedShloka
                  ? `Meditating: Gita ${focusedShloka.chapter}.${focusedShloka.verse}`
                  : 'Tanpura Sanctuary Active'}
              </span>
              <span className="text-[10px] text-slate-400">
                Tap to open drone visualizer & timer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleTanpura}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-semibold"
              title="Pause Tanpura"
            >
              <Pause className="w-4 h-4 fill-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* Sacred Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-[#060810] py-8 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="text-slate-400 font-medium font-serif-sacred">
            यतो धर्मस्ततो जयः — Where there is righteousness and awareness, there is victory.
          </p>
          <p className="text-slate-500 text-[11px]">
            Srimad Bhagavad Gita • Guided by Sri Krishna's eternal wisdom • Meditative Indian Classical Tanpura Synthesizer
          </p>
        </div>
      </footer>
    </div>
  );
}
