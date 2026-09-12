import React, { useState } from 'react';
import { Bookmark, Trash2, Edit3, Save, Sparkles, Volume2, BookOpen, Heart } from 'lucide-react';
import { Shloka, SavedReflection } from '../types';
import { speechEngine } from '../utils/speech';

interface ContemplationJournalProps {
  savedReflections: SavedReflection[];
  onDeleteReflection: (id: string) => void;
  onUpdateReflectionNote: (id: string, note: string) => void;
  onMeditateWithShloka: (shloka: Shloka) => void;
  onNavigateToOracle: () => void;
}

export const ContemplationJournal: React.FC<ContemplationJournalProps> = ({
  savedReflections,
  onDeleteReflection,
  onUpdateReflectionNote,
  onMeditateWithShloka,
  onNavigateToOracle,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const startEditing = (reflection: SavedReflection) => {
    setEditingId(reflection.id);
    setEditingText(reflection.reflectionNote || '');
  };

  const handleSaveNote = (id: string) => {
    onUpdateReflectionNote(id, editingText);
    setEditingId(null);
  };

  return (
    <div id="contemplation-journal" className="space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
          <Heart className="w-3.5 h-3.5 text-amber-400" />
          Personal Dharma Journal
        </span>
        <h2 className="font-serif-sacred text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight">
          Saved Wisdom & Contemplations
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Your sanctuary of saved Bhagavad Gita guidance and personal reflection notes.
        </p>
      </div>

      {savedReflections.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-3xl bg-[#0e1424] border border-slate-800 max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="font-serif-sacred text-lg font-bold text-amber-200">
            No Reflections Saved Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            When you seek guidance or browse the sacred library, tap the bookmark icon on any shloka to save it here with your personal notes.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToOracle}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
            >
              Seek Your First Guidance
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {savedReflections.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-gradient-to-b from-[#111726] to-[#0c101c] border border-amber-500/20 p-6 sm:p-7 aura-gold space-y-5"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Gita {item.shloka.chapter}.{item.shloka.verse}
                  </span>
                  <span className="text-xs text-slate-400">
                    Saved on {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speechEngine.speakSanskrit(item.shloka.sanskrit)}
                    title="Recite Sanskrit"
                    className="p-2 rounded-xl bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700 transition-all text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Chant</span>
                  </button>

                  <button
                    onClick={() => onMeditateWithShloka(item.shloka)}
                    title="Meditate with Tanpura"
                    className="p-2 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-xs flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Meditate</span>
                  </button>

                  <button
                    onClick={() => onDeleteReflection(item.id)}
                    title="Remove from saved"
                    className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/30 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Shloka in Devanagari */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                <p className="font-sanskrit text-lg sm:text-xl text-amber-100 font-medium leading-loose whitespace-pre-line">
                  {item.shloka.sanskrit}
                </p>
                <p className="text-xs text-slate-400 italic mt-2">
                  {item.shloka.transliteration}
                </p>
              </div>

              {/* English Translation */}
              <div>
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                  "{item.shloka.translation}"
                </p>
              </div>

              {/* Personal Dilemma if recorded */}
              {item.userDilemma && (
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">Your Life Question / Distress:</strong>
                  <p className="italic text-slate-300/90">{item.userDilemma}</p>
                </div>
              )}

              {/* Personal Reflection Note Section */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    My Contemplation & Action Notes:
                  </span>
                  {editingId !== item.id && (
                    <button
                      onClick={() => startEditing(item)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      {item.reflectionNote ? 'Edit Note' : 'Add Note'}
                    </button>
                  )}
                </div>

                {editingId === item.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      placeholder="Write your personal insights, realization, or how you will apply this dharma today..."
                      className="w-full p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNote(item.id)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : item.reflectionNote ? (
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 italic">
                    "{item.reflectionNote}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    No notes added yet. Click "Add Note" to record your personal realization.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
