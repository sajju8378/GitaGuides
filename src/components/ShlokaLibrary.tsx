import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Shloka, DistressCategory } from '../types';
import { shlokaDatabase, distressCategories } from '../data/shlokas';
import { ShlokaCard } from './ShlokaCard';

interface ShlokaLibraryProps {
  onMeditateWithShloka: (shloka: Shloka) => void;
  savedShlokaIds: string[];
  onToggleSaveShloka: (shloka: Shloka) => void;
}

export const ShlokaLibrary: React.FC<ShlokaLibraryProps> = ({
  onMeditateWithShloka,
  savedShlokaIds,
  onToggleSaveShloka,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DistressCategory | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');

  // Filter shlokas
  const filteredShlokas = useMemo(() => {
    return shlokaDatabase.filter((shloka) => {
      // Category filter
      if (activeCategory !== 'all' && shloka.category !== activeCategory) {
        return false;
      }

      // Chapter filter
      if (selectedChapter !== 'all' && shloka.chapter !== selectedChapter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSanskrit = shloka.sanskrit.toLowerCase().includes(query);
        const matchesTranslit = shloka.transliteration.toLowerCase().includes(query);
        const matchesTranslation = shloka.translation.toLowerCase().includes(query);
        const matchesCounsel = shloka.krishnaCounsel.toLowerCase().includes(query);
        const matchesTags = shloka.tags.some((t) => t.toLowerCase().includes(query));
        const matchesVerse = `${shloka.chapter}.${shloka.verse}`.includes(query);

        return matchesSanskrit || matchesTranslit || matchesTranslation || matchesCounsel || matchesTags || matchesVerse;
      }

      return true;
    });
  }, [searchQuery, activeCategory, selectedChapter]);

  // Unique chapters present in database
  const availableChapters = Array.from(new Set(shlokaDatabase.map((s) => s.chapter))).sort((a, b) => a - b);

  return (
    <div id="shloka-library" className="space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          The Eternal Dialogue
        </span>
        <h2 className="font-serif-sacred text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight">
          Sacred Shloka Repository
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Explore key verses of the Srimad Bhagavad Gita with full word-by-word meanings, audio recitation, and practical life applications.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-[#0b101c] border border-slate-800 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="input-library-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, concept (e.g. 'duty', 'grief', 'anger', 'karma'), or verse (e.g. 2.47)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Emotion Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            Distress:
          </span>

          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            All Themes ({shlokaDatabase.length})
          </button>

          {distressCategories.map((cat) => {
            const count = shlokaDatabase.filter((s) => s.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Chapter filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Chapter:
          </span>

          <button
            onClick={() => setSelectedChapter('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedChapter === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>

          {availableChapters.map((chap) => (
            <button
              key={chap}
              onClick={() => setSelectedChapter(chap)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedChapter === chap ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ch. {chap}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>Showing {filteredShlokas.length} verses</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-amber-400 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Shlokas List */}
      <div className="space-y-6">
        {filteredShlokas.length > 0 ? (
          filteredShlokas.map((shloka) => (
            <ShlokaCard
              key={shloka.id}
              shloka={shloka}
              onMeditateWithShloka={onMeditateWithShloka}
              isSaved={savedShlokaIds.includes(shloka.id)}
              onToggleSave={onToggleSaveShloka}
            />
          ))
        ) : (
          <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-sm text-slate-400">
              No verses matched your search. Try another keyword or clear filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
