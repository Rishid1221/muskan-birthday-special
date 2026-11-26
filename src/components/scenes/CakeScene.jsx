import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SceneContainer from "../ui/SceneContainer";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import CakeBody from "../decor/CakeBody";
import CandleAtmosphere from "../decor/CandleAtmosphere";
import Bow from "../decor/Bow";
import { useParticleBurst, ParticleBurstLayer } from "../decor/ParticleBurst";
import { triggerConfetti } from "../decor/ConfettiBurst";
import { cakeContent } from "../../data/content";

const CANDLE_COUNT = 5;

// Time for every candle to finish falling/bouncing into place, used to gate
// the "Light the Candles" button so lighting can't start mid-landing.
const LANDING_DELAY_STEP = 0.15;
const LANDING_SETTLE_TIME = 700;
const ALL_LANDED_MS = Math.round((CANDLE_COUNT - 1) * LANDING_DELAY_STEP * 1000 + LANDING_SETTLE_TIME);

// Traced from the reference image you supplied (public/images/candle-reference.png):
// a hand-drawn red curve at the base of the cake. Re-anchored against the
// actual barbie-cake.png canvas by profiling its alpha-channel silhouette
// row by row: the cake's widest point — the rose-trimmed bottom tier the
// curve was drawn along — sits at y≈75–81% of the canvas (x 16.2%–83.6%
// wide there), clearly narrower above it (bow tier) and narrower again
// below it (the stand's pedestal column). Expressed as % of the cake's own
// rendered box so it stays correct at any size/screen — each value is
// where a candle's BASE sits, evenly spaced left-to-right with the shallow
// centre-up arc the reference curve traces.
const CANDLE_POSITIONS = [
  { x: 16, y: 79 },
  { x: 33, y: 77 },
  { x: 50, y: 75 },
  { x: 67, y: 77 },
  { x: 84, y: 79 },
];

function Flame() {
  return (
    <span className="relative block" style={{ width: 22, height: 30 }}>
      {/* soft ambient halo, separate from the flame shape itself */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 64,
          height: 64,
          background:
            "radial-gradient(circle, rgba(244,201,93,0.6) 0%, rgba(244,201,93,0.22) 45%, transparent 72%)",
        }}
      />
      {/* teardrop flame silhouette */}
      <span
        className="animate-flame absolute inset-0"
        style={{
          clipPath: "polygon(50% 0%, 82% 40%, 68% 100%, 32% 100%, 18% 40%)",
          background: "linear-gradient(180deg, #fff6c9 0%, #f9b93f 45%, #e8651c 100%)",
          boxShadow: "0 0 10px 2px rgba(244,167,61,0.7)",
        }}
      />
      {/* inner blue-white core */}
      <span
        className="absolute left-1/2 top-[40%] -translate-x-1/2 rounded-full"
        style={{
          width: 9,
          height: 13,
          background: "radial-gradient(circle, #fffdf3 0%, #ffe9a8 65%, transparent 100%)",
        }}
      />
    </span>
  );
}

// Bright hot-pink + white spiral stripes (not pastel) so candles read clearly
// against the pink cake, with a glossy wax highlight and a visible gold base.
function CandleStick() {
  return (
    <div
      className="relative h-12 w-3.5 overflow-hidden rounded-sm sm:h-14 sm:w-4"
      style={{
        backgroundImage: "repeating-linear-gradient(35deg, #ff2d78 0 4px, #ffffff 4px 9px)",
        boxShadow: "1px 3px 5px rgba(74,42,58,0.4)",
      }}
    >
      <div className="absolute inset-y-0 left-0.5 w-[2px] bg-white/70" />
      <div
        className="absolute inset-x-0 bottom-0 h-2.5"
        style={{ background: "linear-gradient(180deg, #ffe08a 0%, #f4b942 55%, #c98a1f 100%)" }}
      />
    </div>
  );
}

function LandingSparkle({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 text-gold-400"
          initial={{ opacity: 0, scale: 0.2, y: -4 }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 1.3, 1], y: -10 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Sparkles size={16} />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function Candle({ index, lit, onBlow }) {
  const showBow = index % 2 === 0;
  const reduceMotion = useReducedMotion();
  const [justLanded, setJustLanded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => lit && onBlow(index)}
      initial={reduceMotion ? false : { opacity: 0, y: -130, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : { type: "spring", stiffness: 260, damping: 11, delay: index * LANDING_DELAY_STEP }
      }
      onAnimationComplete={() => {
        if (!reduceMotion) {
          setJustLanded(true);
          setTimeout(() => setJustLanded(false), 650);
        }
      }}
      className="relative flex flex-col items-center"
      style={{ cursor: lit ? "pointer" : "default" }}
      aria-label={lit ? `Blow out candle ${index + 1}` : `Candle ${index + 1}`}
    >
      <LandingSparkle show={justLanded} />

      <AnimatePresence>
        {lit && (
          <motion.span
            key="flame"
            initial={{ opacity: 0, scale: 0, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -6 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="mb-[-2px]"
          >
            <Flame />
          </motion.span>
        )}
      </AnimatePresence>

      {showBow && (
        <div className="absolute z-10 w-3.5" style={{ top: 12 }}>
          <Bow color="var(--color-gold-400)" />
        </div>
      )}
      <CandleStick />
      <span
        className="-mt-px h-1.5 w-5 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(74,42,58,0.35) 0%, transparent 75%)" }}
      />
    </motion.button>
  );
}

function Cake({ candlesLit, candlesBlownOut, showCandles, onBlowCandle }) {
  return (
    <div className="relative mx-auto mt-6 inline-block">
      <CakeBody />

      {showCandles && (
        <div className="absolute inset-0 z-10">
          {CANDLE_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -100%)" }}
            >
              <Candle
                index={i}
                lit={candlesLit && !candlesBlownOut.has(i)}
                onBlow={onBlowCandle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CakeScene({ onContinue }) {
  const [stage, setStage] = useState("no-candles"); // no-candles -> placed -> lit -> blown -> granted
  const [blownOut, setBlownOut] = useState(new Set());
  const [candlesLanded, setCandlesLanded] = useState(false);
  const { bursts, fire } = useParticleBurst();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (stage === "granted") {
      triggerConfetti({ origin: { y: 0.5 } });
      fire(0.5, 0.42, ["✨", "💖", "⭐"]);
    }
  }, [stage]);

  const handleCakeTap = () => {
    if (stage !== "no-candles") return;
    setStage("placed");
    // Lighting can't start until every candle has finished falling/bouncing in.
    setTimeout(() => setCandlesLanded(true), reduceMotion ? 0 : ALL_LANDED_MS);
  };

  const lightCandles = () => setStage("lit");

  const blowCandle = (index) => {
    setBlownOut((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === CANDLE_COUNT) setStage("blown");
      return next;
    });
  };

  const blowAll = () => {
    setBlownOut(new Set(Array.from({ length: CANDLE_COUNT }, (_, i) => i)));
    setStage("blown");
  };

  const makeWish = () => setStage("granted");

  const subheading =
    stage === "no-candles"
      ? cakeContent.subheadingNoCandles
      : stage === "placed"
        ? cakeContent.dimmingMessage
        : stage === "lit"
          ? cakeContent.subheadingLit
          : stage === "blown"
            ? cakeContent.wishPrompt
            : "";

  return (
    <SceneContainer>
      <StickerField />
      <CandleAtmosphere stage={stage} />
      <ParticleBurstLayer bursts={bursts} />

      <div className="relative z-10 flex w-full flex-col items-center">
        <h2 className="scene-heading font-display text-3xl font-bold text-blush-700 sm:text-4xl">{cakeContent.heading}</h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={subheading}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="scene-subtext mt-2 min-h-[1.5em] text-plum-500"
          >
            {subheading}
          </motion.p>
        </AnimatePresence>

        <div onClick={handleCakeTap} className={stage === "no-candles" ? "cursor-pointer" : ""}>
          <Cake
            candlesLit={stage === "lit"}
            candlesBlownOut={blownOut}
            showCandles={stage !== "no-candles"}
            onBlowCandle={blowCandle}
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          {stage === "placed" && candlesLanded && (
            <PinkButton onClick={lightCandles}>Light the Candles 🕯️</PinkButton>
          )}

          {stage === "lit" && (
            <PinkButton onClick={blowAll} variant="secondary">
              Blow Out Candles 💨
            </PinkButton>
          )}

          {stage === "blown" && <PinkButton onClick={makeWish}>Make a Wish ✨</PinkButton>}

          <AnimatePresence>
            {stage === "granted" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mt-2 max-w-sm rounded-3xl bg-white/80 px-6 py-5 shadow-md ring-1 ring-blush-200"
              >
                <p className="font-display text-2xl font-bold text-blush-600">{cakeContent.wishGrantedHeading}</p>
                <p className="mt-2 text-plum-500">{cakeContent.wishGrantedMessage}</p>
                <div className="mt-5">
                  <PinkButton onClick={onContinue}>{cakeContent.continueLabel}</PinkButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneContainer>
  );
}
