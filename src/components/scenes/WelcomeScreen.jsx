import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SceneContainer from "../ui/SceneContainer";
import StaggerText from "../ui/StaggerText";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import Bow from "../decor/Bow";
import ImageSlot from "../decor/ImageSlot";
import CurtainIntro from "../decor/CurtainIntro";
import { useParticleBurst, ParticleBurstLayer } from "../decor/ParticleBurst";
import { welcomeContent } from "../../data/content";

const CLOSED_HOLD_MS = 1100;
const OPEN_DURATION_MS = 1100;
const CLOSE_DURATION_MS = 550;

export default function WelcomeScreen({ onStart }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(reduceMotion ? "open" : "closed"); // closed -> opening -> open -> closing
  const { bursts, fire } = useParticleBurst();

  useEffect(() => {
    if (reduceMotion) return;
    const t1 = setTimeout(() => setPhase("opening"), CLOSED_HOLD_MS);
    const t2 = setTimeout(() => setPhase("open"), CLOSED_HOLD_MS + OPEN_DURATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduceMotion]);

  const handleClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    fire(x, y, ["💗", "🎀", "✨"]);

    if (reduceMotion) {
      onStart();
      return;
    }
    setPhase("closing");
    setTimeout(onStart, CLOSE_DURATION_MS);
  };

  const contentVisible = phase === "opening" || phase === "open" || phase === "closing";

  return (
    <SceneContainer variant="zoom">
      <CurtainIntro state={phase} message="A little surprise is about to begin..." />

      {contentVisible && (
        <>
          <StickerField />
          <ParticleBurstLayer bursts={bursts} />

          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
            className="mb-4 w-24 sm:w-28"
          >
            <ImageSlot src="/stickers/hero-bow.png" className="h-full w-full object-contain" fallback={<Bow />} />
          </motion.div>

          <StaggerText
            text={welcomeContent.greeting}
            as="h1"
            delay={0.15}
            className="scene-heading font-display text-4xl font-extrabold text-blush-700 sm:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="scene-subtext mx-auto mt-5 max-w-sm text-base text-plum-500 sm:max-w-md sm:text-lg"
          >
            {welcomeContent.message}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-10"
          >
            <PinkButton onClick={handleClick}>{welcomeContent.buttonLabel}</PinkButton>
          </motion.div>
        </>
      )}
    </SceneContainer>
  );
}
