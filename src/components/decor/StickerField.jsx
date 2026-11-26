import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import Bow from "./Bow";
import ImageSlot from "./ImageSlot";

// ASSET SLOT (Hello Kitty stickers): drop real PNG/WebP stickers into
// public/stickers/ using the exact file names below — they are picked up
// automatically, zero code changes needed. Until then, each slot falls back
// to a hand-coded bow/heart/star/sparkle icon so the scene never looks empty.
// See public/stickers/README.md.
const ITEMS = [
  { slot: "bow-1", Icon: Bow, top: "8%", left: "6%", size: 46, delay: 0, duration: 6, rotate: -8 },
  { slot: "heart-1", Icon: Heart, top: "14%", left: "86%", size: 28, delay: 0.4, duration: 5, rotate: 10, color: "#ff8fb3" },
  { slot: "sparkle-1", Icon: Sparkles, top: "28%", left: "92%", size: 22, delay: 1.1, duration: 4, rotate: 0, color: "#f4c95d" },
  { slot: "star-1", Icon: Star, top: "80%", left: "10%", size: 24, delay: 0.6, duration: 5.5, rotate: 0, color: "#f4c95d" },
  { slot: "heart-2", Icon: Heart, top: "88%", left: "80%", size: 32, delay: 0.2, duration: 6.5, rotate: -6, color: "#f0427a" },
  { slot: "bow-2", Icon: Bow, top: "60%", left: "4%", size: 30, delay: 0.8, duration: 5, rotate: 14 },
  { slot: "sparkle-2", Icon: Sparkles, top: "6%", left: "40%", size: 20, delay: 1.4, duration: 4.5, rotate: 0, color: "#ff6699" },
];

export default function StickerField({ className = "" }) {
  const reduceMotion = useReducedMotion();

  // Frozen-at-mount jitter so stickers don't sit in identical spots every
  // single time a scene re-mounts (incl. after Replay), without re-jittering
  // on every re-render.
  const jitter = useMemo(
    () => ITEMS.map(() => ({ dx: (Math.random() - 0.5) * 4, dy: (Math.random() - 0.5) * 4, dr: (Math.random() - 0.5) * 10 })),
    []
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {ITEMS.map((item, i) => {
        const { slot, Icon, top, left, size, delay, duration, rotate, color } = item;
        const j = jitter[i];

        return (
          <motion.div
            key={i}
            className="absolute opacity-85"
            style={{ top: `calc(${top} + ${j.dy}px)`, left: `calc(${left} + ${j.dx}px)`, width: size, height: size }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.1 }}
          >
            <div
              className={reduceMotion ? "" : "animate-float"}
              style={{
                width: "100%",
                height: "100%",
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                "--tw-rotate": `${rotate + j.dr}deg`,
              }}
            >
              <ImageSlot
                src={`/stickers/${slot}.png`}
                className="h-full w-full object-contain"
                fallback={<Icon className="h-full w-full" {...(color ? { color, fill: color } : {})} />}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
