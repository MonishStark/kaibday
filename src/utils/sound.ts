// Web Audio API Synthesizer & Audio Engine for Kai's Birthday Website

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingBgm: boolean = false;
  private bgmInterval: number | null = null;

  // Birthday Song HTMLAudioElement
  private songAudio: HTMLAudioElement | null = null;
  private isSongPlaying: boolean = false;
  private songEndCallbacks: Array<() => void> = [];
  private timeUpdateCallbacks: Array<(currentTime: number) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  public initAudioElement() {
    if (this.songAudio) return;

    let el = document.getElementById('kai-birthday-song-audio') as HTMLAudioElement;
    if (!el) {
      el = new Audio('/song/Happy Birthday, Kai.mp3');
      el.id = 'kai-birthday-song-audio';
      el.preload = 'auto';
      el.setAttribute('playsinline', 'true');
      el.setAttribute('autoplay', 'true');
    }

    this.songAudio = el;

    this.songAudio.addEventListener('ended', () => {
      this.isSongPlaying = false;
      this.songEndCallbacks.forEach(cb => cb());
    });

    this.songAudio.addEventListener('timeupdate', () => {
      if (this.songAudio) {
        const t = this.songAudio.currentTime;
        this.timeUpdateCallbacks.forEach(cb => cb(t));
      }
    });

    // Attempt instant unmuted play immediately
    this.playBirthdaySong();
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.songAudio) {
      this.songAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play Birthday Song immediately
  public playBirthdaySong() {
    if (!this.songAudio) return;
    this.stopBGM();
    this.initCtx();

    this.songAudio.muted = this.isMuted;
    const playPromise = this.songAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isSongPlaying = true;
      }).catch((err) => {
        console.warn('Initial autoplay notice:', err);
        // Fallback: retry with play() immediately
        if (this.songAudio) {
          this.songAudio.play().then(() => {
            this.isSongPlaying = true;
          }).catch(() => {});
        }
      });
    }
  }

  // Restart Birthday Song explicitly from 0.0s (replay button)
  public restartBirthdaySong() {
    if (!this.songAudio) return;
    this.stopBGM();
    this.initCtx();

    this.songAudio.currentTime = 0;
    this.songAudio.muted = this.isMuted;
    const playPromise = this.songAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isSongPlaying = true;
      }).catch(() => {
        if (this.songAudio) {
          this.songAudio.play().then(() => {
            this.isSongPlaying = true;
          }).catch(() => {});
        }
      });
    }
  }

  public stopBirthdaySong() {
    if (!this.songAudio) return;
    this.songAudio.pause();
    this.songAudio.currentTime = 0;
    this.isSongPlaying = false;
  }

  public pauseBirthdaySong() {
    if (!this.songAudio) return;
    this.songAudio.pause();
    this.isSongPlaying = false;
  }

  public getBirthdaySongCurrentTime(): number {
    return this.songAudio ? this.songAudio.currentTime : 0;
  }

  public isBirthdaySongActive(): boolean {
    return this.isSongPlaying;
  }

  public onSongEnded(cb: () => void) {
    this.songEndCallbacks.push(cb);
  }

  public onTimeUpdate(cb: (t: number) => void) {
    this.timeUpdateCallbacks.push(cb);
  }

  public removeTimeUpdateListener(cb: (t: number) => void) {
    this.timeUpdateCallbacks = this.timeUpdateCallbacks.filter(c => c !== cb);
  }

  // Soft UI click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Coffee Steam sound
  public playSteam() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Meow Sound Easter Egg
  public playMeow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(850, now + 0.15);
    osc.frequency.linearRampToValueAtTime(500, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Woof Sound Easter Egg
  public playWoof() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Candle Blow wind sound + Fanfare
  public playBlowCandles() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50];
      chimeNotes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        const t = this.ctx!.currentTime + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

        osc.connect(g);
        g.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.8);
      });
    }, 600);
  }

  // Ambient BGM loop using soft warm piano chords
  public toggleBGM(): boolean {
    if (this.isSongPlaying) {
      if (this.songAudio) {
        if (this.songAudio.paused) {
          this.songAudio.play();
          this.isSongPlaying = true;
          return true;
        } else {
          this.songAudio.pause();
          this.isSongPlaying = false;
          return false;
        }
      }
      return false;
    }

    this.initCtx();
    if (this.isPlayingBgm) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public startBGM() {
    if (this.isPlayingBgm || this.isSongPlaying) return;
    this.initCtx();
    this.isPlayingBgm = true;

    const chords = [
      [261.63, 329.63, 392.00, 493.88],
      [220.00, 261.63, 329.63, 392.00],
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 349.23]
    ];

    let step = 0;
    const playChord = () => {
      if (!this.isPlayingBgm || this.isMuted || !this.ctx || this.isSongPlaying) return;
      const currentChord = chords[step % chords.length];
      step++;

      currentChord.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const now = this.ctx!.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 1.0);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 3.8);
      });
    };

    playChord();
    this.bgmInterval = window.setInterval(playChord, 4000);
  }

  public stopBGM() {
    this.isPlayingBgm = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public getIsPlayingBgm() {
    return this.isPlayingBgm || this.isSongPlaying;
  }
}

export const soundFx = new SoundManager();
