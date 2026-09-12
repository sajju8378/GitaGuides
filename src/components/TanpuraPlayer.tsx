import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wind,
  Bell,
  Clock,
  RotateCcw,
  Sparkles,
  Sliders,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Shloka, TanpuraRootKey, TanpuraTuning } from '../types';
import { meditativeAudio, ROOT_KEY_FREQUENCIES } from '../utils/audio';

interface TanpuraPlayerProps {
  focusedShloka?: Shloka | null;
  onClearFocusedShloka?: () => void;
}

export const TanpuraPlayer: React.FC<TanpuraPlayerProps> = ({
  focusedShloka,
  onClearFocusedShloka,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rootKey, setRootKey] = useState<TanpuraRootKey>('C#');
  const [tuning, setTuning] = useState<TanpuraTuning>('Pa');
  const [cycleDuration, setCycleDuration] = useState(3.4);
  const [volume, setVolume] = useState(0.75);
  const [enableOm, setEnableOm] = useState(true);
  const [omVolume, setOmVolume] = useState(0.35);
  const [enableBreeze, setEnableBreeze] = useState(true);
  const [breezeVolume, setBreezeVolume] = useState(0.25);
  const [enableBell, setEnableBell] = useState(true);
  const [activeString, setActiveString] = useState<number>(-1);

  // Meditation timer state
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null); // null = infinite
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  // Pranayama breath pacer state
  const [enableBreathGuide, setEnableBreathGuide] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathProgress, setBreathProgress] = useState(0);

  // Fullscreen view toggle
  const [isExpanded, setIsExpanded] = useState(false);

  // Register Web Audio pluck callback
  useEffect(() => {
    meditativeAudio.setOnStringPluck((idx) => {
      setActiveString(idx);
    });

    return () => {
      meditativeAudio.setOnStringPluck(() => {});
    };
  }, []);

  // Handle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      meditativeAudio.stop();
      setIsPlaying(false);
      setActiveString(-1);
    } else {
      meditativeAudio.setRootKey(rootKey);
      meditativeAudio.setTuning(tuning);
      meditativeAudio.setCycleDuration(cycleDuration);
      meditativeAudio.setVolume(volume);
      meditativeAudio.setOmEnabled(enableOm);
      meditativeAudio.setOmVolume(omVolume);
      meditativeAudio.setBreezeEnabled(enableBreeze);
      meditativeAudio.setBreezeVolume(breezeVolume);
      meditativeAudio.setBellEnabled(enableBell);

      meditativeAudio.start();
      setIsPlaying(true);
    }
  };

  // Updaters
  const handleKeyChange = (key: TanpuraRootKey) => {
    setRootKey(key);
    meditativeAudio.setRootKey(key);
  };

  const handleTuningChange = (t: TanpuraTuning) => {
    setTuning(t);
    meditativeAudio.setTuning(t);
  };

  const handleCycleDurationChange = (dur: number) => {
    setCycleDuration(dur);
    meditativeAudio.setCycleDuration(dur);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    meditativeAudio.setVolume(vol);
  };

  const handleOmToggle = () => {
    const next = !enableOm;
    setEnableOm(next);
    meditativeAudio.setOmEnabled(next);
  };

  const handleBreezeToggle = () => {
    const next = !enableBreeze;
    setEnableBreeze(next);
    meditativeAudio.setBreezeEnabled(next);
  };

  const handleBellToggle = () => {
    const next = !enableBell;
    setEnableBell(next);
    meditativeAudio.setBellEnabled(next);
  };

  const handleStrikeBell = () => {
    meditativeAudio.triggerBellOnce();
  };

  // Timer logic
  useEffect(() => {
    if (!isPlaying || remainingSeconds === null) return;

    if (remainingSeconds <= 0) {
      // Completed timer!
      meditativeAudio.triggerBellOnce();
      meditativeAudio.stop();
      setIsPlaying(false);
      setRemainingSeconds(null);
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, remainingSeconds]);

  const selectTimer = (mins: number | null) => {
    setTimerMinutes(mins);
    if (mins === null) {
      setRemainingSeconds(null);
    } else {
      setRemainingSeconds(mins * 60);
    }
  };

  // Pranayama 4-4-4-4 Box Breathing cycle
  useEffect(() => {
    if (!isPlaying || !enableBreathGuide) return;

    const phaseDuration = 4000; // 4 seconds per phase
    const totalCycle = phaseDuration * 4;
    const start = Date.now();

    const interval = window.setInterval(() => {
      const elapsed = (Date.now() - start) % totalCycle;
      const progress = (elapsed % phaseDuration) / phaseDuration;
      setBreathProgress(progress);

      if (elapsed < phaseDuration) {
        setBreathPhase('Inhale');
      } else if (elapsed < phaseDuration * 2) {
        setBreathPhase('Hold');
      } else if (elapsed < phaseDuration * 3) {
        setBreathPhase('Exhale');
      } else {
        setBreathPhase('Rest');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, enableBreathGuide]);

  // Format timer
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const stringLabels = [
    tuning === 'Pa' ? 'Pa (5th)' : tuning === 'Ma' ? 'Ma (4th)' : 'Ni (7th)',
    'Tar Sa (Tonic)',
    'Tar Sa (Jodi)',
    'Kharaj Sa (Bass)'
  ];

  return (
    <div
      id="tanpura-sanctuary"
      className={`rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#0e1424] via-[#0a0f1c] to-[#070a14] p-6 sm:p-8 aura-gold transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 overflow-y-auto max-w-5xl mx-auto shadow-2xl bg-[#080d18]' : 'relative'
      }`}
    >
      {/* Sanctuary Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-500/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="font-serif-sacred text-lg sm:text-xl font-bold tracking-wide text-amber-200">
              Meditative Tanpura Sanctuary
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Indian classical harmonic drone & continuous sacred frequency generator
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Exit Fullscreen' : 'Expand Sanctuary'}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-amber-300 border border-slate-700/80 transition-all text-xs flex items-center gap-1"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isExpanded ? 'Normal' : 'Immerse'}</span>
          </button>
        </div>
      </div>

      {/* Optional Focused Contemplation Shloka Banner */}
      {focusedShloka && (
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Contemplation Focus: Gita {focusedShloka.chapter}.{focusedShloka.verse}
            </span>
            <p className="font-sanskrit text-amber-100 text-sm sm:text-base font-medium">
              {focusedShloka.meditativeAffirmation || focusedShloka.sanskrit}
            </p>
          </div>
          {onClearFocusedShloka && (
            <button
              onClick={onClearFocusedShloka}
              className="text-xs text-slate-400 hover:text-slate-200 underline shrink-0"
            >
              Clear Focus
            </button>
          )}
        </div>
      )}

      {/* Main Interactive Stage: Tanpura Strings & Sacred Geometry */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Visual Strings & Sacred Breathing Mandala */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#090d18] border border-amber-500/15 relative overflow-hidden">
          {/* Subtle background glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 transition-opacity duration-1000 pointer-events-none ${
              isPlaying ? 'opacity-100' : 'opacity-20'
            }`}
          />

          {/* Central Sacred Geometric Om / Breath Guide Ring */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
            {/* Outer harmonic resonance ring */}
            <div
              className={`absolute inset-0 rounded-full border border-amber-500/30 transition-all duration-700 ${
                isPlaying ? 'scale-110 opacity-80' : 'scale-95 opacity-30'
              }`}
              style={{
                boxShadow: isPlaying ? '0 0 50px -10px rgba(245, 158, 11, 0.3)' : 'none'
              }}
            />

            {/* Breathing Guide expanding circle */}
            {enableBreathGuide && isPlaying && (
              <div
                className="absolute rounded-full bg-amber-400/10 border border-amber-400/40 transition-all duration-150"
                style={{
                  width:
                    breathPhase === 'Inhale'
                      ? `${60 + breathProgress * 40}%`
                      : breathPhase === 'Hold'
                      ? '100%'
                      : breathPhase === 'Exhale'
                      ? `${100 - breathProgress * 40}%`
                      : '60%',
                  height:
                    breathPhase === 'Inhale'
                      ? `${60 + breathProgress * 40}%`
                      : breathPhase === 'Hold'
                      ? '100%'
                      : breathPhase === 'Exhale'
                      ? `${100 - breathProgress * 40}%`
                      : '60%',
                }}
              />
            )}

            {/* Sacred Om Symbol */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="font-sanskrit text-5xl sm:text-6xl text-amber-300 font-bold select-none drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                ॐ
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-200/90 mt-1">
                {isPlaying
                  ? enableBreathGuide
                    ? `${breathPhase}...`
                    : `${rootKey} (${ROOT_KEY_FREQUENCIES[rootKey]} Hz)`
                  : 'Sacred Silence'}
              </span>
            </div>
          </div>

          {/* 4 Interactive Visual Tanpura Strings */}
          <div className="w-full max-w-md grid grid-cols-4 gap-3 mt-6 relative z-10">
            {[0, 1, 2, 3].map((stringIdx) => {
              const isCurrent = activeString === stringIdx;
              return (
                <div
                  key={stringIdx}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400/80 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-bold text-amber-300/90 mb-1 text-center">
                    String {stringIdx + 1}
                  </span>
                  {/* Vertical vibrating string line */}
                  <div className="w-full flex items-center justify-center h-16 sm:h-20 py-1">
                    <div
                      className={`w-1 rounded-full transition-all duration-200 ${
                        isCurrent
                          ? 'h-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-200 shadow-[0_0_12px_#fbbf24] scale-x-150 animate-pulse'
                          : 'h-4/5 bg-slate-700/80'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 text-center truncate w-full">
                    {stringLabels[stringIdx]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Master Play / Pause Trigger */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              id="btn-tanpura-play-pause"
              onClick={handleTogglePlay}
              className={`px-8 py-3.5 rounded-2xl font-bold tracking-wide text-sm sm:text-base flex items-center gap-3 transition-all shadow-xl ${
                isPlaying
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:opacity-95 shadow-amber-500/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-amber-300" />
                  <span>Pause Sanctuary</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Begin Meditative Drone</span>
                </>
              )}
            </button>

            {/* Quick strike temple bell button */}
            <button
              id="btn-strike-bell"
              onClick={handleStrikeBell}
              title="Strike Tibetan Singing Bowl"
              className="p-3.5 rounded-2xl bg-slate-800/80 text-amber-300 border border-slate-700 hover:bg-slate-700/80 transition-all"
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Soundcraft Controls & Settings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pitch & Root Key Selection */}
          <div className="p-5 rounded-2xl bg-[#0b101c] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Root Key (Sa Pitch)
              </label>
              <span className="text-xs text-amber-400 font-mono font-semibold">
                {rootKey} ({ROOT_KEY_FREQUENCIES[rootKey]} Hz)
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1.5">
              {(['C', 'C#', 'D', 'D#', 'E', 'F', 'G', 'G#', 'A', 'A#', 'B'] as TanpuraRootKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyChange(key)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                    rootKey === key
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Tuning Style & Tempo */}
          <div className="p-5 rounded-2xl bg-[#0b101c] border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Tuning Pattern
                </label>
                <span className="text-xs text-slate-400">
                  {tuning === 'Pa' ? 'Pa-Sa-Sa-Sa (Classic)' : tuning === 'Ma' ? 'Ma-Sa-Sa-Sa (Deep)' : 'Ni-Sa-Sa-Sa (Longing)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Pa', 'Ma', 'Ni'] as TanpuraTuning[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTuningChange(t)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      tuning === t
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {t === 'Pa' ? 'Pancham (Pa)' : t === 'Ma' ? 'Madhyam (Ma)' : 'Nishad (Ni)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pluck Cycle Speed */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-semibold uppercase tracking-wider">Cycle Pace</span>
                <span className="text-amber-400 font-mono">{cycleDuration.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="2.2"
                max="5.0"
                step="0.2"
                value={cycleDuration}
                onChange={(e) => handleCycleDurationChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Fast (2.2s)</span>
                <span>Meditative (3.4s)</span>
                <span>Slow (5.0s)</span>
              </div>
            </div>

            {/* Tanpura Master Volume */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  Tanpura Volume
                </span>
                <span className="text-amber-400 font-mono">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Ambient Soundscape Layer Toggles */}
          <div className="p-5 rounded-2xl bg-[#0b101c] border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Harmonic Atmosphere Layers
            </h4>

            {/* Om Drone */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="font-sanskrit text-base text-amber-300">ॐ</span>
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-200 block">Cosmic Om Drone</span>
                  <span className="text-[10px] text-slate-400">136.1 Hz Sadja vibration</span>
                </div>
              </div>
              <button
                onClick={handleOmToggle}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  enableOm
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {enableOm ? 'Active' : 'Muted'}
              </button>
            </div>

            {/* Tibetan Singing Bowl */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-200 block">Singing Bowl Chime</span>
                  <span className="text-[10px] text-slate-400">Harmonic bell resonance</span>
                </div>
              </div>
              <button
                onClick={handleBellToggle}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  enableBell
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {enableBell ? 'Active' : 'Muted'}
              </button>
            </div>

            {/* Mountain Breeze */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <Wind className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-200 block">Temple Mountain Breeze</span>
                  <span className="text-[10px] text-slate-400">Calming swept noise filter</span>
                </div>
              </div>
              <button
                onClick={handleBreezeToggle}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  enableBreeze
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {enableBreeze ? 'Active' : 'Muted'}
              </button>
            </div>
          </div>

          {/* Meditation Timer & Pranayama Settings */}
          <div className="p-5 rounded-2xl bg-[#0b101c] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Meditation Timer
              </label>
              {remainingSeconds !== null && (
                <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {formatTime(remainingSeconds)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, null].map((mins, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTimer(mins)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                    timerMinutes === mins
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {mins === null ? 'Continuous' : `${mins}m`}
                </button>
              ))}
            </div>

            {/* Pranayama Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-xs font-medium text-slate-300 block">Pranayama Breath Visualizer</span>
                <span className="text-[10px] text-slate-500">Guides rhythmic 4-4-4-4 breathing</span>
              </div>
              <button
                onClick={() => setEnableBreathGuide(!enableBreathGuide)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  enableBreathGuide
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {enableBreathGuide ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
