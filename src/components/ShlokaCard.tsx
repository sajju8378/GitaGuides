import React, { useState } from 'react';
import { Volume2, VolumeX, Bookmark, BookmarkCheck, Copy, Check, Sparkles, Feather, Compass, Eye, EyeOff } from 'lucide-react';
import { Shloka } from '../types';
import { speechEngine } from '../utils/speech';

interface ShlokaCardProps {
  shloka: Shloka;
  relevanceAnalysis?: string;
  isAiEnhanced?: boolean;
  onMeditateWithShloka?: (shloka: Shloka) => void;
  isSaved?: boolean;
  onToggleSave?: (shloka: Shloka) => void;
}

export const ShlokaCard: React.FC<ShlokaCardProps> = ({
  shloka,
  relevanceAnalysis,
  isAiEnhanced,
  onMeditateWithShloka,
  isSaved = false,
  onToggleSave,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showWordMeanings, setShowWordMeanings] = useState(false);

  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      speechEngine.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechEngine.speakSanskrit(shloka.sanskrit, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleCopy = async () => {
    const textToCopy = `Bhagavad Gita ${shloka.chapter}.${shloka.verse} (${shloka.chapterNameEnglish})\n\n${shloka.sanskrit}\n\n${shloka.transliteration}\n\nTranslation:\n${shloka.translation}\n\nKrishna's Counsel:\n${shloka.krishnaCounsel}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      id={`shloka-card-${shloka.id}`}
      className="relative rounded-2xl bg-gradient-to-b from-[#111726] to-[#0c101c] border border-amber-500/20 p-6 md:p-8 aura-gold transition-all duration-300"
    >
      {/* Top Header & Chapter Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-amber-500/15">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Chapter {shloka.chapter}, Verse {shloka.verse}
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            {shloka.chapterNameSanskrit} • {shloka.chapterNameEnglish}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isAiEnhanced && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Tailored Guidance
            </span>
          )}

          {/* Sanskrit Audio Recitation */}
          <button
            id={`btn-audio-${shloka.id}`}
            onClick={handleAudioToggle}
            title={isPlayingAudio ? 'Stop Recitation' : 'Listen to Sanskrit Chanting'}
            className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
              isPlayingAudio
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold shadow-md shadow-amber-500/25'
                : 'bg-slate-800/80 text-amber-200/90 border-slate-700/80 hover:bg-slate-700/80 hover:border-amber-500/30'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isPlayingAudio ? 'Chanting...' : 'Recite'}</span>
          </button>

          {/* Bookmark Toggle */}
          {onToggleSave && (
            <button
              id={`btn-save-${shloka.id}`}
              onClick={() => onToggleSave(shloka)}
              title={isSaved ? 'Saved in Reflections' : 'Save Shloka'}
              className={`p-2 rounded-xl text-xs transition-all border ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            </button>
          )}

          {/* Copy */}
          <button
            id={`btn-copy-${shloka.id}`}
            onClick={handleCopy}
            title="Copy Shloka & Meaning"
            className="p-2 rounded-xl text-xs bg-slate-800/80 text-slate-400 border border-slate-700/80 hover:text-slate-200 hover:border-slate-600 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Optional Relevance Analysis from AI/Context */}
      {relevanceAnalysis && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
          <Compass className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 font-semibold">Spiritual Insight: </strong>
            {relevanceAnalysis}
          </p>
        </div>
      )}

      {/* Sanskrit Shloka in Devanagari */}
      <div className="mt-6 text-center px-2 py-4 rounded-xl bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 border border-amber-500/15">
        <p className="font-sanskrit text-xl sm:text-2xl md:text-3xl text-amber-100 font-medium leading-loose tracking-wide whitespace-pre-line drop-shadow-sm">
          {shloka.sanskrit}
        </p>
      </div>

      {/* Transliteration and Word Meanings toggles */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <button
          onClick={() => setShowTransliteration(!showTransliteration)}
          className="hover:text-amber-300 transition-colors flex items-center gap-1 py-1"
        >
          {showTransliteration ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration (IAST)'}
        </button>

        <button
          onClick={() => setShowWordMeanings(!showWordMeanings)}
          className="hover:text-amber-300 transition-colors flex items-center gap-1 py-1"
        >
          {showWordMeanings ? 'Hide Word Breakdown' : 'Show Word Breakdown (Anvaya)'}
        </button>
      </div>

      {showTransliteration && (
        <div className="mt-2 text-center text-xs sm:text-sm text-slate-300/90 italic font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800">
          <p className="whitespace-pre-line leading-relaxed">{shloka.transliteration}</p>
        </div>
      )}

      {showWordMeanings && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-amber-300 block mb-1">Word-by-Word Meaning (पदच्छेद):</span>
          <p className="text-slate-300/90">{shloka.wordMeanings}</p>
        </div>
      )}

      {/* English Translation */}
      <div className="mt-6">
        <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Translation</h4>
        <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          "{shloka.translation}"
        </p>
      </div>

      {/* Sri Krishna's Personal Counsel */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-900/80 border-l-4 border-amber-400 border-t border-r border-b border-slate-800/80">
        <div className="flex items-center gap-2 mb-2">
          <Feather className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
            Sri Krishna's Counsel to You
          </h4>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
          {shloka.krishnaCounsel}
        </p>
      </div>

      {/* Practical Dharma / Actionable Steps */}
      {shloka.practicalDharma && shloka.practicalDharma.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Practical Dharma for Today
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {shloka.practicalDharma.map((action, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meditative Affirmation & Footer Actions */}
      <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {shloka.meditativeAffirmation && (
          <div className="flex-1 bg-amber-500/10 px-3.5 py-2.5 rounded-xl border border-amber-500/20">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
              Focus Mantra (Dhyāna):
            </span>
            <span className="text-xs sm:text-sm text-amber-100 font-medium">
              {shloka.meditativeAffirmation}
            </span>
          </div>
        )}

        {onMeditateWithShloka && (
          <button
            id={`btn-meditate-shloka-${shloka.id}`}
            onClick={() => onMeditateWithShloka(shloka)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            Meditate with Tanpura
          </button>
        )}
      </div>
    </div>
  );
};
