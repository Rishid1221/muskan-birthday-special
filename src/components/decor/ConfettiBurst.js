import confetti from "canvas-confetti";

const PALETTE = ["#ff8fb3", "#ffb3cb", "#f4c95d", "#ffffff", "#bdeee0"];

export function triggerConfetti(options = {}) {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: PALETTE,
    scalar: 1,
    ...options,
  });
}

export function triggerConfettiBurstFromSides() {
  const end = Date.now() + 700;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: PALETTE });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: PALETTE });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
