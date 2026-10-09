// Minimal event bus so any component can fire confetti.
const listeners = new Set();
export function fireConfetti(opts = {}) {
  listeners.forEach((l) => l(opts));
}
export function subscribeConfetti(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
