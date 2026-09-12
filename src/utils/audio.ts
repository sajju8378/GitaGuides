// Web Audio API Tanpura & Meditative Sound Synthesizer

import { TanpuraRootKey, TanpuraTuning } from '../types';

export const ROOT_KEY_FREQUENCIES: Record<TanpuraRootKey, number> = {
  'C': 130.81,
  'C#': 138.59,
  'D': 146.83,
  'D#': 155.56,
  'E': 164.81,
  'F': 174.61,
  'G': 196.00,
  'G#': 207.65,
  'A': 220.00,
  'A#': 233.08,
  'B': 246.94
};

class MeditativeAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private tanpuraGain: GainNode | null = null;
  private omGain: GainNode | null = null;
  private breezeGain: GainNode | null = null;

  private isRunning: boolean = false;
  private rootKey: TanpuraRootKey = 'C#';
  private tuning: TanpuraTuning = 'Pa';
  private cycleDuration: number = 3.4; // seconds for full 4-string cycle
  private tanpuraVolume: number = 0.75;
  private omVolume: number = 0.35;
  private breezeVolume: number = 0.25;
  private enableOm: boolean = true;
  private enableBreeze: boolean = true;
  private enableBell: boolean = true;

  private cycleTimer: number | null = null;
  private bellTimer: number | null = null;
  private currentStringIndex: number = 0;
  private onStringPluckCallback: ((stringIndex: number) => void) | null = null;

  // Nodes for ambient layers
  private omOsc1: OscillatorNode | null = null;
  private omOsc2: OscillatorNode | null = null;
  private breezeSource: AudioNode | null = null;

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Tanpura bus with gentle compression
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      compressor.ratio.setValueAtTime(3, this.ctx.currentTime);
      compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      compressor.release.setValueAtTime(0.3, this.ctx.currentTime);
      compressor.connect(this.masterGain);

      this.tanpuraGain = this.ctx.createGain();
      this.tanpuraGain.gain.setValueAtTime(this.tanpuraVolume, this.ctx.currentTime);
      this.tanpuraGain.connect(compressor);

      // Om bus
      this.omGain = this.ctx.createGain();
      this.omGain.gain.setValueAtTime(this.enableOm ? this.omVolume : 0, this.ctx.currentTime);
      this.omGain.connect(this.masterGain);

      // Breeze bus
      this.breezeGain = this.ctx.createGain();
      this.breezeGain.gain.setValueAtTime(this.enableBreeze ? this.breezeVolume : 0, this.ctx.currentTime);
      this.breezeGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    return this.ctx;
  }

  public setOnStringPluck(callback: (stringIndex: number) => void) {
    this.onStringPluckCallback = callback;
  }

  public start() {
    if (this.isRunning) return;
    const ctx = this.initContext();
    this.isRunning = true;
    this.currentStringIndex = 0;

    // Start ambient continuous drone (OM 136.1 Hz + fifth)
    this.startOmDrone(ctx);

    // Start mountain breeze
    this.startBreezeNoise(ctx);

    // Start cyclical 4-string plucking
    this.scheduleNextPluck();

    // Start occasional temple bell chime (every ~20s)
    this.scheduleTempleBell();
  }

  public stop() {
    this.isRunning = false;

    if (this.cycleTimer !== null) {
      window.clearTimeout(this.cycleTimer);
      this.cycleTimer = null;
    }

    if (this.bellTimer !== null) {
      window.clearTimeout(this.bellTimer);
      this.bellTimer = null;
    }

    // Stop Om
    try {
      if (this.omOsc1) {
        this.omOsc1.stop();
        this.omOsc1.disconnect();
        this.omOsc1 = null;
      }
      if (this.omOsc2) {
        this.omOsc2.stop();
        this.omOsc2.disconnect();
        this.omOsc2 = null;
      }
    } catch {
      // Ignored
    }

    // Stop Breeze
    try {
      if (this.breezeSource) {
        this.breezeSource.disconnect();
        this.breezeSource = null;
      }
    } catch {
      // Ignored
    }

    if (this.onStringPluckCallback) {
      this.onStringPluckCallback(-1);
    }
  }

  public setRootKey(key: TanpuraRootKey) {
    this.rootKey = key;
    if (this.isRunning && this.ctx) {
      // Update running Om drone pitch too
      const baseFreq = ROOT_KEY_FREQUENCIES[key];
      if (this.omOsc1 && this.omOsc2) {
        this.omOsc1.frequency.setTargetAtTime(baseFreq * 0.5, this.ctx.currentTime, 0.4);
        this.omOsc2.frequency.setTargetAtTime(baseFreq * 0.75, this.ctx.currentTime, 0.4);
      }
    }
  }

  public setTuning(tuning: TanpuraTuning) {
    this.tuning = tuning;
  }

  public setCycleDuration(duration: number) {
    this.cycleDuration = Math.max(2.0, Math.min(6.0, duration));
  }

  public setVolume(vol: number) {
    this.tanpuraVolume = Math.max(0, Math.min(1, vol));
    if (this.tanpuraGain && this.ctx) {
      this.tanpuraGain.gain.setTargetAtTime(this.tanpuraVolume, this.ctx.currentTime, 0.1);
    }
  }

  public setOmEnabled(enabled: boolean) {
    this.enableOm = enabled;
    if (this.omGain && this.ctx) {
      this.omGain.gain.setTargetAtTime(enabled ? this.omVolume : 0, this.ctx.currentTime, 0.3);
    }
  }

  public setOmVolume(vol: number) {
    this.omVolume = vol;
    if (this.omGain && this.ctx && this.enableOm) {
      this.omGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  public setBreezeEnabled(enabled: boolean) {
    this.enableBreeze = enabled;
    if (this.breezeGain && this.ctx) {
      this.breezeGain.gain.setTargetAtTime(enabled ? this.breezeVolume : 0, this.ctx.currentTime, 0.5);
    }
  }

  public setBreezeVolume(vol: number) {
    this.breezeVolume = vol;
    if (this.breezeGain && this.ctx && this.enableBreeze) {
      this.breezeGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  public setBellEnabled(enabled: boolean) {
    this.enableBell = enabled;
  }

  public triggerBellOnce() {
    if (this.ctx) {
      this.playSingingBowl(this.ctx);
    } else {
      const ctx = this.initContext();
      this.playSingingBowl(ctx);
    }
  }

  private scheduleNextPluck() {
    if (!this.isRunning || !this.ctx) return;

    const stringIdx = this.currentStringIndex;
    this.pluckString(stringIdx);

    if (this.onStringPluckCallback) {
      this.onStringPluckCallback(stringIdx);
    }

    // Move to next string in the 4-string cycle
    this.currentStringIndex = (this.currentStringIndex + 1) % 4;

    // Time between plucks is cycleDuration / 4
    const intervalMs = (this.cycleDuration / 4) * 1000;
    this.cycleTimer = window.setTimeout(() => {
      this.scheduleNextPluck();
    }, intervalMs);
  }

  /**
   * Synthesize a single realistic Indian Tanpura string pluck with Jawari resonance.
   * String 0: First string (Pa: 1.5x, Ma: 1.333x, Ni: 1.875x)
   * String 1: Jodi 1 (Tar Sa: 2.0x base, middle octave)
   * String 2: Jodi 2 (Tar Sa: 2.0x base + 0.9Hz subtle acoustic detuning shimmer)
   * String 3: Kharaj (Mandra Sa: 1.0x base, deep bass foundation)
   */
  private pluckString(stringIndex: number) {
    if (!this.ctx || !this.tanpuraGain) return;
    const now = this.ctx.currentTime;
    const baseSa = ROOT_KEY_FREQUENCIES[this.rootKey];

    let freq = baseSa;
    let detune = 0;

    if (stringIndex === 0) {
      // First string: Pa, Ma, or Ni
      if (this.tuning === 'Pa') {
        freq = baseSa * 1.5; // Pancham (Perfect 5th)
      } else if (this.tuning === 'Ma') {
        freq = baseSa * (4 / 3); // Madhyam (Perfect 4th)
      } else {
        freq = baseSa * (15 / 8); // Nishad (Major 7th)
      }
    } else if (stringIndex === 1) {
      // Jodi 1 (Tar Sa)
      freq = baseSa * 2;
    } else if (stringIndex === 2) {
      // Jodi 2 (Tar Sa with slight natural acoustic detune +1.1 Hz)
      freq = baseSa * 2;
      detune = 8; // cents detune creates classic Tanpura shimmer
    } else if (stringIndex === 3) {
      // Kharaj (Mandra Sa, deep bass)
      freq = baseSa;
    }

    // Decay duration for each pluck: string sings for 3.5 to 5.0 seconds
    const stringDecay = 4.2;

    // String master envelope
    const stringGain = this.ctx.createGain();
    stringGain.gain.setValueAtTime(0.0001, now);
    // Quick, soft metallic attack (15ms)
    stringGain.gain.exponentialRampToValueAtTime(0.9, now + 0.015);
    // Initial pluck transient settlement
    stringGain.gain.exponentialRampToValueAtTime(0.45, now + 0.25);
    // Long lingering decay of rich overtones
    stringGain.gain.exponentialRampToValueAtTime(0.0001, now + stringDecay);

    // Jawari resonance filter (bandpass filter centered around 1400Hz-2200Hz simulates cotton thread buzz)
    const jawariFilter = this.ctx.createBiquadFilter();
    jawariFilter.type = 'bandpass';
    jawariFilter.frequency.setValueAtTime(stringIndex === 3 ? 1100 : 1800, now);
    jawariFilter.Q.setValueAtTime(2.2, now);

    // Highpass to clean sub-rumble below 60Hz
    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(65, now);

    // Connect filter chain to tanpura bus
    stringGain.connect(hpFilter);
    hpFilter.connect(this.tanpuraGain);

    // Harmonic overtone series (Indian Tanpura has rich partials up to 8th harmonic)
    const harmonics = [
      { mult: 1, gain: 0.8, type: 'triangle' as OscillatorType },
      { mult: 2, gain: 0.5, type: 'sine' as OscillatorType },
      { mult: 3, gain: 0.35, type: 'triangle' as OscillatorType },
      { mult: 4, gain: 0.22, type: 'sine' as OscillatorType },
      { mult: 5, gain: 0.15, type: 'sine' as OscillatorType },
      { mult: 6, gain: 0.08, type: 'sine' as OscillatorType },
      { mult: 7, gain: 0.04, type: 'sine' as OscillatorType }
    ];

    harmonics.forEach((h) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = h.type;
      osc.frequency.setValueAtTime(freq * h.mult, now);
      if (detune !== 0) {
        osc.detune.setValueAtTime(detune, now);
      }

      // Subtle frequency micro-vibrato on higher harmonics creates organic warmth
      if (h.mult >= 3) {
        osc.frequency.setTargetAtTime(freq * h.mult * 1.001, now + 0.5, 1.2);
      }

      const hGain = this.ctx.createGain();
      // Higher harmonics decay slightly faster than fundamental
      const hDecay = stringDecay * (1.1 - (h.mult * 0.08));
      hGain.gain.setValueAtTime(h.gain * 0.3, now);
      hGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(1.0, hDecay));

      osc.connect(hGain);
      hGain.connect(stringGain);

      // Connect an extra feed to the Jawari filter for authentic buzz
      if (h.mult >= 2 && h.mult <= 5) {
        hGain.connect(jawariFilter);
      }

      osc.start(now);
      osc.stop(now + stringDecay + 0.1);
    });

    // Connect jawari shimmer
    const jawariGain = this.ctx.createGain();
    jawariGain.gain.setValueAtTime(0.18, now);
    jawariGain.gain.exponentialRampToValueAtTime(0.0001, now + stringDecay * 0.8);
    jawariFilter.connect(jawariGain);
    jawariGain.connect(hpFilter);
  }

  /**
   * Continuous Sacred Om Drone (136.1 Hz Sadja resonance + warm undertone)
   */
  private startOmDrone(ctx: AudioContext) {
    if (!this.omGain) return;
    const now = ctx.currentTime;

    const baseFreq = ROOT_KEY_FREQUENCIES[this.rootKey] * 0.5; // low octave

    this.omOsc1 = ctx.createOscillator();
    this.omOsc1.type = 'sine';
    this.omOsc1.frequency.setValueAtTime(baseFreq, now);

    this.omOsc2 = ctx.createOscillator();
    this.omOsc2.type = 'sine';
    this.omOsc2.frequency.setValueAtTime(baseFreq * 1.5, now); // 5th harmonic

    // Subtle breathing LFO modulation on Om
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now); // slow 12-second breath cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.15, now);
    lfo.connect(lfoGain.gain);

    const omSubGain = ctx.createGain();
    omSubGain.gain.setValueAtTime(0.25, now);

    this.omOsc1.connect(omSubGain);
    this.omOsc2.connect(omSubGain);
    omSubGain.connect(this.omGain);

    this.omOsc1.start(now);
    this.omOsc2.start(now);
    lfo.start(now);
  }

  /**
   * Soft temple mountain breeze (pink noise with slow swept filter)
   */
  private startBreezeNoise(ctx: AudioContext) {
    if (!this.breezeGain) return;
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate smooth pink noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);

    // Undulate the breeze filter slowly
    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.setValueAtTime(0.06, ctx.currentTime);
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.setValueAtTime(120, ctx.currentTime);
    filterLfo.connect(filter.frequency);
    filterLfo.start();

    noiseSource.connect(filter);
    filter.connect(this.breezeGain);
    noiseSource.start();

    this.breezeSource = noiseSource;
  }

  /**
   * Periodic singing bowl / bell chime
   */
  private scheduleTempleBell() {
    if (!this.isRunning) return;
    // Bell strikes roughly every 24-32 seconds
    const delay = 24000 + Math.random() * 10000;
    this.bellTimer = window.setTimeout(() => {
      if (this.isRunning && this.enableBell && this.ctx) {
        this.playSingingBowl(this.ctx);
      }
      this.scheduleTempleBell();
    }, delay);
  }

  /**
   * Pure acoustic Tibetan singing bowl resonance
   */
  private playSingingBowl(ctx: AudioContext) {
    if (!this.masterGain) return;
    const now = ctx.currentTime;
    const fundamental = ROOT_KEY_FREQUENCIES[this.rootKey] * 2.0;

    // Singing bowl harmonic partials (non-integer ratios)
    const partials = [
      { ratio: 1.0, gain: 0.35, decay: 7.0 },
      { ratio: 2.76, gain: 0.18, decay: 5.5 },
      { ratio: 5.4, gain: 0.09, decay: 3.5 },
      { ratio: 8.9, gain: 0.04, decay: 2.0 }
    ];

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * p.ratio, now);

      // Subtle frequency beating
      osc.frequency.linearRampToValueAtTime(fundamental * p.ratio + 0.6, now + p.decay);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Bell strike attack
      gain.gain.exponentialRampToValueAtTime(p.gain, now + 0.02);
      // Gentle singing ring decay
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }
}

export const meditativeAudio = new MeditativeAudioEngine();
