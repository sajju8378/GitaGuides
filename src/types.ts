export interface Shloka {
  id: string;
  chapter: number;
  verse: number;
  chapterNameSanskrit: string;
  chapterNameEnglish: string;
  sanskrit: string; // Devanagari text
  transliteration: string; // Roman/IAST phonetic
  wordMeanings: string; // Key Sanskrit words explained
  translation: string; // Complete English translation
  krishnaCounsel: string; // Deep compassionate guidance directly addressing the heart of this struggle
  philosophicalContext: string; // The dialogue setting between Arjuna and Krishna on Kurukshetra
  practicalDharma: string[]; // 3 actionable, tangible habits/mindset shifts for today
  meditativeAffirmation: string; // Short Sanskrit focus phrase for contemplation
  category: DistressCategory;
  tags: string[];
}

export type DistressCategory =
  | 'anxiety'
  | 'anger'
  | 'fear'
  | 'grief'
  | 'burnout'
  | 'indecision'
  | 'loneliness'
  | 'peace';

export interface CategoryMeta {
  id: DistressCategory;
  label: string;
  sanskritTerm: string;
  description: string;
  badgeColor: string;
  samplePrompts: string[];
}

export interface GuidanceResult {
  shloka: Shloka;
  seekerDilemma: string;
  relevanceAnalysis: string;
  krishnaCounselCustom?: string;
  practicalDharmaCustom?: string[];
  isAiEnhanced?: boolean;
}

export interface SavedReflection {
  id: string;
  shlokaId: string;
  shloka: Shloka;
  userDilemma: string;
  reflectionNote: string;
  createdAt: string;
}

export type TanpuraRootKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type TanpuraTuning = 'Pa' | 'Ma' | 'Ni';

export interface TanpuraState {
  isPlaying: boolean;
  rootKey: TanpuraRootKey;
  tuning: TanpuraTuning;
  cycleDuration: number; // in seconds, e.g. 3.2
  volume: number; // 0 to 1
  enableOm: boolean;
  omVolume: number;
  enableBreeze: boolean;
  breezeVolume: number;
  enableBell: boolean;
  activeString: number; // 0, 1, 2, 3 (-1 when idle)
}
