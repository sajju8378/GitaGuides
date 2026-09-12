// Sanskrit & English Speech Synthesis helper

class SpeechEngine {
  private isSpeaking: boolean = false;
  private onStateChange: ((speaking: boolean) => void) | null = null;

  public setListener(cb: (speaking: boolean) => void) {
    this.onStateChange = cb;
  }

  public speakSanskrit(devanagariText: string, onComplete?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }

    this.stop();

    // Clean newlines and danda punctuation for natural speech pauses
    const cleanText = devanagariText
      .replace(/॥/g, '।')
      .replace(/।/g, '। ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.82; // Serene, meditative slow pace
    utterance.pitch = 0.95; // Calm, resonant tone

    // Try to find Sanskrit or Hindi voice, or Indian English
    const voices = window.speechSynthesis.getVoices();
    const sanskritOrHindiVoice = voices.find(
      (v) => v.lang.startsWith('sa') || v.lang.startsWith('hi') || v.lang.includes('Devanagari')
    ) || voices.find((v) => v.lang.startsWith('en-IN')) || voices[0];

    if (sanskritOrHindiVoice) {
      utterance.voice = sanskritOrHindiVoice;
      utterance.lang = sanskritOrHindiVoice.lang;
    } else {
      utterance.lang = 'hi-IN';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChange) this.onStateChange(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  public getSpeakingState() {
    return this.isSpeaking;
  }
}

export const speechEngine = new SpeechEngine();
