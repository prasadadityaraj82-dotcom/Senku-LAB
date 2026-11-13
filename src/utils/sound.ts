let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
  delay = 0
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

export function playLabSound(
  kind: 'click' | 'craft' | 'eraUnlock' | 'correct' | 'wrong' | 'locked',
  muted: boolean
) {
  if (muted) return;
  try {
    switch (kind) {
      case 'click':
        playTone(540, 0.07, 'triangle', 0.05);
        break;
      case 'locked':
        playTone(180, 0.12, 'sawtooth', 0.04);
        playTone(140, 0.14, 'sawtooth', 0.04, 0.08);
        break;
      case 'craft':
        playTone(523.25, 0.14, 'triangle', 0.08, 0);
        playTone(659.25, 0.14, 'triangle', 0.08, 0.09);
        playTone(783.99, 0.22, 'triangle', 0.09, 0.18);
        break;
      case 'eraUnlock':
        playTone(440, 0.12, 'triangle', 0.08, 0);
        playTone(554.37, 0.12, 'triangle', 0.08, 0.1);
        playTone(659.25, 0.14, 'triangle', 0.09, 0.2);
        playTone(880, 0.35, 'triangle', 0.1, 0.32);
        break;
      case 'correct':
        playTone(587.33, 0.1, 'sine', 0.07, 0);
        playTone(880, 0.18, 'sine', 0.08, 0.08);
        break;
      case 'wrong':
        playTone(240, 0.14, 'sawtooth', 0.05, 0);
        playTone(190, 0.18, 'sawtooth', 0.05, 0.11);
        break;
    }
  } catch {
    // Ignore audio context restrictions
  }
}
