'use client';

let audioCtx: AudioContext | null = null;
// Sound is opt-in by default so visitors are never surprised by unexpected audio.
let soundEnabled = false;

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playTactileClick('click');
  }
  return soundEnabled;
}

export type SoundType = 'thock' | 'click' | 'spark' | 'key' | 'combo' | 'hit';

export function playTactileClick(type: SoundType = 'thock') {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Procedural pitch micro-jitter (±18Hz) for authentic mechanical acoustics
    const jitter = (Math.random() - 0.5) * 36;

    if (type === 'thock') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130 + jitter, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.045);
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === 'spark') {
      // High resonant electric spark for Zap particle burst
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600 + jitter * 2, t);
      osc.frequency.exponentialRampToValueAtTime(3200, t + 0.05);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.065);
    } else if (type === 'key') {
      // Light mechanical keyboard click for terminal typing
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540 + jitter, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.025);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } else if (type === 'combo') {
      // Ascending arcade chime for game combos
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587 + jitter, t);
      osc.frequency.setValueAtTime(880 + jitter, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(1174, t + 0.09);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.13);
    } else if (type === 'hit') {
      // Punchy 80Hz bass kick for game feel impact
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.06);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950 + jitter, t);
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    }
  } catch {}
}
