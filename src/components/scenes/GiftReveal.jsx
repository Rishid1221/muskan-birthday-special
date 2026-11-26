import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import SceneContainer from "../ui/SceneContainer";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import GiftBox from "../decor/GiftBox";
import Bouquet from "../decor/Bouquet";
import { triggerConfetti } from "../decor/ConfettiBurst";
import { giftContent } from "../../data/content";

// closed -> shaking -> unwrapping -> opening -> revealed
const SEQUENCE_DELAYS = { shaking: 550, unwrapping: 500, opening: 600 };

const FLOATING_HEARTS = [
  { top: "4%", left: "6%", size: 16, color: "#ff8fb3", delay: 0.1, duration: 5 },
  { top: "0%", left: "88%", size: 14, color: "#f0427a", delay: 0.5, duration: 4.5 },
  { top: "60%", left: "2%", size: 15, color: "#ff6699", delay: 0.3, duration: 5.5 },
  { top: "55%", left: "92%", size: 13, color: "#ff8fb3", delay: 0.7, duration: 4.8 },
];

export default function GiftReveal({ onContinue }) {
  const [phase, setPhase] = useState("closed");
  const reduceMotion = useReducedMotion();
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const startOpening = () => {
    if (phase !== "closed") return;

    if (reduceMotion) {
      setPhase("revealed");
      triggerConfetti({ origin: { y: 0.5 } });
      return;
    }

    setPhase("shaking");
    timers.current.push(
      setTimeout(() => setPhase("unwrapping"), SEQUENCE_DELAYS.shaking),
      setTimeout(() => setPhase("opening"), SEQUENCE_DELAYS.shaking + SEQUENCE_DELAYS.unwrapping),
      setTimeout(() => {
        setPhase("revealed");
        triggerConfetti({ origin: { y: 0.5 }, particleCount: 80, scalar: 0.8 });
      }, SEQUENCE_DELAYS.shaking + SEQUENCE_DELAYS.unwrapping + SEQUENCE_DELAYS.opening)
    );
  };

  const revealed = phase === "revealed";

  return (
    <SceneContainer variant="pop">
      <StickerField />

      <h2 className="scene-heading font-display text-3xl font-bold text-blush-700 sm:text-4xl">{giftContent.heading}</h2>

      <div className="relative mt-12 flex min-h-[380px] w-full max-w-sm flex-col items-center justify-end sm:min-h-[420px]">
        {revealed && !reduceMotion && (
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            {FLOATING_HEARTS.map(({ top, left, size, color, delay, duration }, i) => (
              <motion.div
                key={i}
                className="animate-float absolute"
                style={{ top, left, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 0.6 + delay, type: "spring", stiffness: 260, damping: 16 }}
              >
                <Heart className="h-full w-full" color={color} fill={color} />
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 40, x: -14 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 170, damping: 15 }}
              className="absolute bottom-[115px] animate-float-slow sm:bottom-[125px]"
            >
              <Bouquet />
            </motion.div>
          )}
        </AnimatePresence>

        <GiftBox phase={phase} />
      </div>

      <div className="mt-8">
        {phase === "closed" && <PinkButton onClick={startOpening}>{giftContent.buttonLabel}</PinkButton>}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 max-w-sm rounded-3xl bg-white/80 px-6 py-5 shadow-md ring-1 ring-blush-200"
          >
            <p className="font-display text-xl font-bold text-blush-600">{giftContent.revealHeading}</p>
            <p className="mt-2 text-plum-500">{giftContent.revealMessage}</p>
            <div className="mt-5">
              <PinkButton onClick={onContinue}>{giftContent.continueLabel}</PinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneContainer>
  );
}
