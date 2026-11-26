import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Flower2, Sparkles } from "lucide-react";
import SceneContainer from "../ui/SceneContainer";
import StaggerText from "../ui/StaggerText";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import Bow from "../decor/Bow";
import { triggerConfetti, triggerConfettiBurstFromSides } from "../decor/ConfettiBurst";
import { finalContent, siteMeta } from "../../data/content";

const RISING_ICONS = [Heart, Bow, Flower2, Sparkles];
const RISING_COLORS = ["#ff8fb3", "#f0427a", "#f4c95d", "#ff6699"];

function RisingDecor() {
  const reduceMotion = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 16 + Math.random() * 18,
        delay: Math.random() * 10,
        duration: 9 + Math.random() * 6,
        Icon: RISING_ICONS[i % RISING_ICONS.length],
        color: RISING_COLORS[i % RISING_COLORS.length],
      })),
    []
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map(({ id, left, size, delay, duration, Icon, color }) => (
        <div
          key={id}
          className="animate-drift absolute opacity-70"
          style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
        >
          {Icon === Bow ? <Bow color={color} /> : <Icon className="h-full w-full" color={color} fill={color} />}
        </div>
      ))}
    </div>
  );
}

export default function FinalCelebration({ onReplay }) {
  useEffect(() => {
    triggerConfetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    const t1 = setTimeout(triggerConfettiBurstFromSides, 300);
    const t2 = setTimeout(() => triggerConfetti({ particleCount: 90, spread: 120, origin: { y: 0.3 }, scalar: 0.9 }), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <SceneContainer variant="burst">
      <StickerField />
      <RisingDecor />

      <motion.div
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
        className="mb-4 flex gap-4"
      >
        <div className="w-14 sm:w-16">
          <Bow />
        </div>
        <div className="w-14 rotate-12 sm:w-16">
          <Bow />
        </div>
      </motion.div>

      <StaggerText
        text={finalContent.heading}
        as="h1"
        delay={0.15}
        className="scene-heading font-display text-4xl font-extrabold text-blush-700 sm:text-6xl"
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="scene-subtext mt-4 text-lg text-plum-500 sm:text-xl"
      >
        {finalContent.subheading}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10"
      >
        <PinkButton onClick={onReplay}>{finalContent.replayLabel}</PinkButton>
      </motion.div>

      <p className="mt-6 text-sm text-blush-400">
        {siteMeta.accentEmoji} made with love, for {siteMeta.recipientName} {siteMeta.accentEmoji}
      </p>
    </SceneContainer>
  );
}
