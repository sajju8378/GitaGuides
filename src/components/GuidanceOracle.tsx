import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, Compass, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { DistressCategory, Shloka, GuidanceResult } from '../types';
import { distressCategories, shlokaDatabase } from '../data/shlokas';
import { ShlokaCard } from './ShlokaCard';

interface GuidanceOracleProps {
  onMeditateWithShloka: (shloka: Shloka) => void;
  savedShlokaIds: string[];
  onToggleSaveShloka: (shloka: Shloka) => void;
}

export const GuidanceOracle: React.FC<GuidanceOracleProps> = ({
  onMeditateWithShloka,
  savedShlokaIds,
  onToggleSaveShloka,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DistressCategory>('anxiety');
  const [userDilemma, setUserDilemma] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guidanceResult, setGuidanceResult] = useState<GuidanceResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeCategoryMeta = distressCategories.find((c) => c.id === selectedCategory) || distressCategories[0];

  const handleSelectSample = (sample: string) => {
    setUserDilemma(sample);
  };

  const handleSeekGuidance = async (dilemmaText: string = userDilemma) => {
    const query = dilemmaText.trim();
    if (!query) {
      setErrorMessage('Please describe what is troubling your heart or mind.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dilemma: query,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      setGuidanceResult(data);
    } catch {
      // Graceful local fallback to client-side database
      const lower = query.toLowerCase();
      const matched =
        shlokaDatabase.find((s) => s.category === selectedCategory) ||
        shlokaDatabase.find((s) => s.tags.some((t) => lower.includes(t))) ||
        shlokaDatabase[0];

      setGuidanceResult({
        seekerDilemma: query,
        shloka: matched,
        relevanceAnalysis: `Sri Krishna's words in Chapter ${matched.chapter}, Verse ${matched.verse} directly address this emotional turbulence with timeless philosophical clarity.`,
        isAiEnhanced: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGuidanceResult(null);
    setUserDilemma('');
  };

  return (
    <div id="guidance-oracle" className="space-y-8">
      {/* Introduction Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          The Kurukshetra of the Mind
        </span>
        <h1 className="font-serif-sacred text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-100 tracking-tight">
          Seek Sri Krishna's Guidance
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
          Just as Arjuna laid his grief, fear, and confusion before the Divine, share your life problem to receive timeless Bhagavad Gita shlokas and practical dharma.
        </p>
      </div>

      {/* Primary Input Card */}
      {!guidanceResult && (
        <div className="rounded-3xl bg-gradient-to-b from-[#101726] to-[#0a0f1c] border border-amber-500/20 p-6 sm:p-8 aura-gold">
          {/* Category Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
              1. Select What Best Describes Your Distress
            </label>
            <div className="flex flex-wrap gap-2">
              {distressCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-chip-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setErrorMessage(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-amber-300/80 mt-2.5 italic">
              {activeCategoryMeta.sanskritTerm} — {activeCategoryMeta.description}
            </p>
          </div>

          {/* Quick Prompt Ideas */}
          <div className="mt-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Tap a common reflection or write your own:
            </label>
            <div className="flex flex-wrap gap-2">
              {activeCategoryMeta.samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-400 hover:text-amber-200 border border-slate-800 hover:border-amber-500/30 transition-all text-left truncate max-w-full"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Dilemma Textarea */}
          <div className="mt-6">
            <label htmlFor="input-dilemma" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              2. Describe Your Situation, Heartache, or Decision
            </label>
            <div className="relative">
              <textarea
                id="input-dilemma"
                rows={4}
                value={userDilemma}
                onChange={(e) => {
                  setUserDilemma(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="E.g. I am anxious about failing my career exam and feel like a burden to my family... or I cannot forgive someone who betrayed me."
                className="w-full rounded-2xl bg-slate-950/70 border border-slate-700/80 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 p-4 text-sm sm:text-base text-slate-100 placeholder-slate-500 resize-none outline-none transition-all"
              />
            </div>

            {errorMessage && (
              <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-500">
              Your inquiry is treated with reverence and matched to authentic Gita verses.
            </span>

            <button
              id="btn-seek-counsel"
              onClick={() => handleSeekGuidance()}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:opacity-95 text-slate-950 flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Seeking Sri Krishna's Counsel...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Receive Sacred Guidance</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Result Display View */}
      {guidanceResult && (
        <div className="space-y-6">
          {/* Seeker's Stated Dilemma Re-statement Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1424] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                Your Question to the Divine:
              </span>
              <p className="text-sm sm:text-base text-slate-200 italic font-medium">
                "{guidanceResult.seekerDilemma}"
              </p>
            </div>

            <button
              id="btn-ask-another"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all shrink-0 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Ask Another Dilemma
            </button>
          </div>

          {/* Shloka Card */}
          <ShlokaCard
            shloka={guidanceResult.shloka}
            relevanceAnalysis={guidanceResult.relevanceAnalysis}
            isAiEnhanced={guidanceResult.isAiEnhanced}
            onMeditateWithShloka={onMeditateWithShloka}
            isSaved={savedShlokaIds.includes(guidanceResult.shloka.id)}
            onToggleSave={onToggleSaveShloka}
          />
        </div>
      )}
    </div>
  );
};
