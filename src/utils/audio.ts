// High-fidelity Web Audio API automotive sound generator
// Synthesizes twin-turbo V8 engine roar, starter motor ignition, turbo spool blow-off, and exhaust crackles
class EngineAudioSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private isIgnitionOn: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public getIsIgnitionOn(): boolean {
    return this.isIgnitionOn;
  }

  public toggleMute(): boolean {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
      this.isIgnitionOn = false;
    } else {
      this.startIgnitionSequence();
    }
    return !this.isMuted;
  }

  public getIsActive(): boolean {
    return !this.isMuted && this.isRunning;
  }

  // Realistic starter ignition: crank-crank-crank -> V8 ignition flare -> idle rumble
  public startIgnitionSequence(): Promise<void> {
    return new Promise((resolve) => {
      this.initContext();
      if (!this.ctx || !this.masterGain) return resolve();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isMuted = false;
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(0.25, now);

      // 1. Starter motor crank bursts
      const crankCount = 3;
      for (let i = 0; i < crankCount; i++) {
        const crankTime = now + i * 0.16;
        const crankOsc = this.ctx.createOscillator();
        const crankGain = this.ctx.createGain();
        crankOsc.type = 'sawtooth';
        crankOsc.frequency.setValueAtTime(110 + i * 15, crankTime);
        crankOsc.frequency.exponentialRampToValueAtTime(70, crankTime + 0.12);

        crankGain.gain.setValueAtTime(0.2, crankTime);
        crankGain.gain.exponentialRampToValueAtTime(0.01, crankTime + 0.12);

        crankOsc.connect(crankGain);
        crankGain.connect(this.masterGain);

        crankOsc.start(crankTime);
        crankOsc.stop(crankTime + 0.13);
      }

      // 2. Big V8 ignition flare after crank
      const fireTime = now + 0.52;
      setTimeout(() => {
        this.startEngineAudioNodes();
        this.isIgnitionOn = true;
        // Rev flare on start
        this.revEngine(0.9);
        resolve();
      }, 500);
    });
  }

  private startEngineAudioNodes() {
    if (!this.ctx || !this.masterGain || this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(340, now);

      // Low sub bass rumble
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'sawtooth';
      this.oscSub.frequency.setValueAtTime(46, now);

      // Mid V8 combustion cylinder pulse
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'triangle';
      this.osc1.frequency.setValueAtTime(92, now);

      // Mechanical cam harmonic
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sawtooth';
      this.osc2.frequency.setValueAtTime(138, now);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.2, now);

      this.oscSub.connect(this.filter);
      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(oscGain);
      oscGain.connect(this.masterGain);

      this.oscSub.start(now);
      this.osc1.start(now);
      this.osc2.start(now);

      this.masterGain.gain.setTargetAtTime(0.24, now, 0.1);
      this.isRunning = true;
    } catch {
      // Audio safety
    }
  }

  public revEngine(intensity: number = 0.8) {
    if (this.isMuted) return;
    this.initContext();
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.isRunning) {
      this.startEngineAudioNodes();
      this.isIgnitionOn = true;
    }
    if (!this.ctx || !this.filter || !this.oscSub || !this.osc1 || !this.osc2 || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const targetFreqSub = 46 + intensity * 75;
    const targetFreq1 = 92 + intensity * 165;
    const targetFreq2 = 138 + intensity * 240;
    const filterFreq = 340 + intensity * 1400;

    this.oscSub.frequency.setTargetAtTime(targetFreqSub, now, 0.06);
    this.osc1.frequency.setTargetAtTime(targetFreq1, now, 0.06);
    this.osc2.frequency.setTargetAtTime(targetFreq2, now, 0.06);
    this.filter.frequency.setTargetAtTime(filterFreq, now, 0.06);
    this.masterGain.gain.setTargetAtTime(0.32, now, 0.04);

    // Twin-turbo spool whistle hiss
    this.triggerTurboBlowOff(now, intensity);

    // Fall back to idle
    setTimeout(() => {
      if (this.ctx && this.oscSub && this.osc1 && this.osc2 && this.filter && this.masterGain) {
        const fallTime = this.ctx.currentTime;
        this.oscSub.frequency.setTargetAtTime(46, fallTime, 0.35);
        this.osc1.frequency.setTargetAtTime(92, fallTime, 0.35);
        this.osc2.frequency.setTargetAtTime(138, fallTime, 0.35);
        this.filter.frequency.setTargetAtTime(340, fallTime, 0.35);
        this.masterGain.gain.setTargetAtTime(0.2, fallTime, 0.25);
      }
    }, 480);
  }

  // Turbo blow-off valve hiss / exhaust pop
  private triggerTurboBlowOff(time: number, intensity: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2400 + intensity * 1000, time);
      bandpass.Q.setValueAtTime(4, time);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08 * intensity, time + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(time + 0.15);
      whiteNoise.stop(time + 0.38);
    } catch {
      // Noise buffer fallback
    }
  }

  public updateThrottleBySpeed(speedRatio: number) {
    if (this.isMuted || !this.isRunning || !this.ctx || !this.filter || !this.oscSub || !this.osc1 || !this.osc2) return;
    const clamped = Math.max(0, Math.min(1, speedRatio));
    const now = this.ctx.currentTime;
    this.oscSub.frequency.setTargetAtTime(46 + clamped * 65, now, 0.08);
    this.osc1.frequency.setTargetAtTime(92 + clamped * 135, now, 0.08);
    this.osc2.frequency.setTargetAtTime(138 + clamped * 210, now, 0.08);
    this.filter.frequency.setTargetAtTime(340 + clamped * 950, now, 0.08);
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(0, now, 0.1);
    setTimeout(() => {
      try {
        this.oscSub?.stop();
        this.osc1?.stop();
        this.osc2?.stop();
        this.oscSub?.disconnect();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.isRunning = false;
      this.isIgnitionOn = false;
    }, 120);
  }
}

export const engineAudio = new EngineAudioSynth();
