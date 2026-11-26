import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

let idCounter = 0;

// Small imperative-style particle burst (hearts/sparkles) fired from a point
// on screen. Usage: const { bursts, fire } = useParticleBurst(); then render
// <ParticleBurstLayer bursts={bursts} /> once near the root of a scene, and
// call fire(xFraction, yFraction, glyphs) from a click handler.
export function useParticleBurst() {
  const [bursts, setBursts] = useState([]);

  const fire = (x = 0.5, y = 0.5, glyphs) => {
    const id = idCounter++;
    setBursts((prev) => [...prev, { id, x, y, glyphs }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1000);
  };

  return { bursts, fire };
}

const DEFAULT_GLYPHS = ["💗", "✨", "💕"];

export function ParticleBurstLayer({ bursts, count = 9 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((burst) => (
          <Burst key={burst.id} burst={burst} count={count} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Burst({ burst, count }) {
  const glyphs = burst.glyphs ?? DEFAULT_GLYPHS;
  const particles = Array.from({ length: count }, (_, i) => i);

  return particles.map((i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 50 + Math.random() * 70;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 50;
    const glyph = glyphs[i % glyphs.length];

    return (
      <motion.span
        key={i}
        initial={{ opacity: 1, scale: 0.3, left: `${burst.x * 100}%`, top: `${burst.y * 100}%` }}
        animate={{ opacity: 0, scale: 1.1, left: `calc(${burst.x * 100}% + ${dx}px)`, top: `calc(${burst.y * 100}% + ${dy}px)` }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.85 + Math.random() * 0.3, ease: "easeOut" }}
        style={{ position: "absolute", fontSize: 16 + Math.random() * 10 }}
      >
        {glyph}
      </motion.span>
    );
  });
}
