// Tiny synthesized sound effects (no audio files). Only ever called from user gestures.
let ctx = null;
let enabled = true;

export function setSoundEnabled(v) {
  enabled = v;
}
export function isSoundEnabled() {
  return enabled;
}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function tone({ freq = 440, to = null, type = "sine", dur = 0.15, vol = 0.12, delay = 0 }) {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const sfx = {
  tap: () => tone({ freq: 520, to: 380, dur: 0.09, vol: 0.08 }),
  pop: () => tone({ freq: 700, to: 300, type: "triangle", dur: 0.12, vol: 0.12 }),
  boing: () => tone({ freq: 180, to: 420, type: "sine", dur: 0.28, vol: 0.14 }),
  open: () => {
    tone({ freq: 300, to: 700, type: "triangle", dur: 0.18, vol: 0.12 });
    [660, 880, 1175].forEach((f, i) =>
      tone({ freq: f, dur: 0.3, vol: 0.08, delay: 0.14 + i * 0.07 })
    );
  },
  chime: () =>
    [784, 988, 1175, 1568].forEach((f, i) =>
      tone({ freq: f, dur: 0.5, vol: 0.08, delay: i * 0.1 })
    ),
  quack: () => {
    tone({ freq: 380, to: 220, type: "sawtooth", dur: 0.13, vol: 0.07 });
    tone({ freq: 360, to: 200, type: "sawtooth", dur: 0.13, vol: 0.07, delay: 0.16 });
  },
  whoosh: () => tone({ freq: 200, to: 900, type: "sine", dur: 0.25, vol: 0.06 }),
  tada: () =>
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, type: "triangle", dur: 0.35, vol: 0.1, delay: i * 0.09 })
    ),
};
