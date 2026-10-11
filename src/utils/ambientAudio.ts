/**
 * Gentle Ambient Melodic Synthesizer
 * Uses native Web Audio API to create warm, calming acoustic piano/music box chimes
 * without external audio file dependencies.
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;

  // Romantic warm pentatonic scale frequencies (C major / A minor pentatonic: C4, D4, E4, G4, A4, C5, D5, E5)
  private notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playGentleChime(freq: number, duration: number = 3.5) {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine wave with subtle triangle harmonic for bell/piano tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Filter to soften the high end
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    // Envelope: soft attack, long decaying release
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    // Pattern generator that plays gentle arpeggiated romantic chords
    const step = () => {
      if (!this.isPlaying) return;

      // Play 1 or 2 harmonious notes
      const randomNote = this.notes[Math.floor(Math.random() * this.notes.length)];
      this.playGentleChime(randomNote, 4.0);

      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (!this.isPlaying) return;
          const harmonyNote = this.notes[Math.floor(Math.random() * this.notes.length)];
          this.playGentleChime(harmonyNote, 3.5);
        }, 600);
      }

      // Next chord interval between 2.2s and 4.0s
      const nextDelay = 2200 + Math.random() * 1800;
      this.timer = window.setTimeout(step, nextDelay);
    };

    step();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientMusicEngine();
