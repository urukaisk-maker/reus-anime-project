let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playClick() {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(880, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, c.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.09);
    osc.connect(gain).connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.1);
  } catch {}
}

export function playOpen() {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(330, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.12);
    gain.gain.setValueAtTime(0.05, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18);
    osc.connect(gain).connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.2);
  } catch {}
}

export function playSuccess() {
  try {
    const c = getCtx();
    [660, 880, 1320].forEach((f, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      const t = c.currentTime + i * 0.07;
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    });
  } catch {}
}
