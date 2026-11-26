import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

let smokeId = 0;

const WISH_STARS = [
  { top: "20%", left: "20%" },
  { top: "15%", left: "75%" },
  { top: "35%", left: "85%" },
  { top: "65%", left: "12%" },
  { top: "58%", left: "90%" },
  { top: "30%", left: "50%" },
];

// Cinematic room-lighting layer for the candle ceremony. Two background
// washes sit BEHIND the scene content (z-[1], blended with multiply/screen
// so the photo backdrop tints through instead of looking like a flat dark
// filter); foreground effects (smoke, air-wave, wish stars) sit ABOVE the
// content (z-[20]) so they're never hidden behind the cake. Driven entirely
// off the existing `stage` state machine, so it resets for free whenever
// CakeScene remounts (e.g. via Replay).
export default function CandleAtmosphere({ stage }) {
  const reduceMotion = useReducedMotion();
  const dim = stage !== "no-candles" && stage !== "granted";
  const glow = stage === "lit";
  const wishing = stage === "blown";

  const [smoke, setSmoke] = useState([]);
  const [airWaveKey, setAirWaveKey] = useState(0);
  const prevStage = useRef(stage);

  useEffect(() => {
    if (prevStage.current !== "blown" && stage === "blown") {
      if (!reduceMotion) {
        setSmoke(
          Array.from({ length: 5 }, (_, i) => ({ id: smokeId++, x: (i - 2) * 14 + (Math.random() * 6 - 3) }))
        );
        setAirWaveKey((k) => k + 1);
      }
      const t = setTimeout(() => setSmoke([]), 1400);
      prevStage.current = stage;
      return () => clearTimeout(t);
    }
    prevStage.current = stage;
  }, [stage, reduceMotion]);

  return (
    <>
      {/* layered dim wash — radial room vignette + a soft top/bottom gradient,
          multiply-blended so the backdrop's own colour/detail tints through
          instead of a flat grey filter */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 46%, transparent 0%, transparent 28%, rgba(120,35,75,0.5) 72%, rgba(70,18,45,0.62) 100%), linear-gradient(180deg, rgba(70,18,45,0.22) 0%, transparent 32%, transparent 68%, rgba(70,18,45,0.28) 100%)",
          mixBlendMode: "multiply",
        }}
        animate={{ opacity: dim ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.25 : 2, ease: "easeInOut" }}
      />

      {/* warm candlelight glow — screen-blended so it genuinely brightens
          the area around the cake rather than painting a gold disc over it */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 56%, rgba(244,201,93,0.65) 0%, rgba(244,201,93,0.3) 24%, transparent 58%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: glow ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: "easeInOut" }}
      >
        {glow && !reduceMotion && <div className="h-full w-full animate-glow-flicker" />}
      </motion.div>

      {/* warm reflection directly on the cake surface — tighter, soft-light
          blended, sits above the content so it visibly tints the cake */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[20]"
        style={{
          background: "radial-gradient(ellipse 36% 22% at 50% 62%, rgba(255,214,138,0.55) 0%, transparent 70%)",
          mixBlendMode: "soft-light",
        }}
        animate={{ opacity: glow ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: "easeInOut" }}
      />

      {/* one-shot air-wave ring when blowing out */}
      <AnimatePresence>
        {airWaveKey > 0 && !reduceMotion && (
          <motion.div
            key={airWaveKey}
            className="pointer-events-none absolute left-1/2 top-[44%] z-[20] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"
            initial={{ width: 20, height: 20, opacity: 0.6 }}
            animate={{ width: 260, height: 180, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* rising smoke puffs */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] z-[20] -translate-x-1/2">
        <AnimatePresence>
          {smoke.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-white/50"
              style={{ left: p.x, width: 10, height: 10, filter: "blur(2px)" }}
              initial={{ opacity: 0.55, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* wish-moment twinkling stars */}
      {wishing && !reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-[20]" aria-hidden="true">
          {WISH_STARS.map((s, i) => (
            <motion.div
              key={i}
              className="absolute text-gold-400"
              style={{ top: s.top, left: s.left }}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            >
              {i % 2 === 0 ? <Star size={14} fill="currentColor" /> : <Sparkles size={14} />}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
