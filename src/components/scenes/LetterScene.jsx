import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import SceneContainer from "../ui/SceneContainer";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import { letterContent } from "../../data/content";

function Envelope({ opened, onOpen }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 260, height: 170, perspective: 800 }}
      onClick={() => !opened && onOpen()}
      role="button"
      tabIndex={0}
      aria-label="Open the letter"
    >
      {/* pocket */}
      <div className="absolute inset-0 rounded-xl bg-blush-200 shadow-md" />
      <div
        className="absolute inset-x-0 bottom-0 h-full rounded-xl bg-blush-300"
        style={{ clipPath: "polygon(0 35%, 50% 85%, 100% 35%, 100% 100%, 0 100%)" }}
      />

      {/* flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[70%] origin-top rounded-t-xl bg-blush-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 68%)", transformStyle: "preserve-3d" }}
        animate={{ rotateX: opened ? -170 : 0 }}
        transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
      />

      {!opened && (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center">
          <span className="font-display rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blush-700 shadow-sm">
            tap to open
          </span>
        </div>
      )}
    </div>
  );
}

const FLOATERS = [
  { Icon: Heart, top: "-6%", left: "-4%", size: 20, color: "#ff8fb3", delay: 0.2 },
  { Icon: Sparkles, top: "-8%", left: "90%", size: 18, color: "#f4c95d", delay: 0.5 },
  { Icon: Heart, top: "88%", left: "94%", size: 18, color: "#f0427a", delay: 0.8 },
  { Icon: Sparkles, top: "92%", left: "0%", size: 16, color: "#ff6699", delay: 1.1 },
];

export default function LetterScene({ onContinue }) {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();

  const paragraphs = useMemo(
    () => letterContent.letterBody.split(/\n\n+/).filter(Boolean),
    []
  );

  return (
    <SceneContainer variant="fade">
      <StickerField />

      <h2 className="scene-heading font-display text-3xl font-bold text-blush-700 sm:text-4xl">{letterContent.heading}</h2>
      {!opened && <p className="scene-subtext mt-2 text-plum-500">{letterContent.instruction}</p>}

      <div className="relative mt-8 w-full max-w-md" style={{ minHeight: 300 }}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Envelope opened={opened} onOpen={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scaleY: 0.18 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ transformOrigin: "bottom center" }}
              className="relative mx-auto max-h-[55svh] w-full overflow-y-auto rounded-2xl bg-cream-50 p-6 text-left shadow-xl ring-1 ring-blush-200 sm:p-8"
            >
              {!reduceMotion &&
                FLOATERS.map(({ Icon, top, left, size, color, delay }, i) => (
                  <motion.div
                    key={i}
                    className="animate-float pointer-events-none absolute"
                    style={{ top, left, width: size, height: size, animationDelay: `${delay}s` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    transition={{ delay: 1 + delay, type: "spring", stiffness: 260, damping: 16 }}
                  >
                    <Icon className="h-full w-full" color={color} fill={color} />
                  </motion.div>
                ))}

              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.32, duration: 0.5 }}
                  className="font-hand mb-4 whitespace-pre-line text-xl leading-relaxed text-plum-700 last:mb-0 sm:text-2xl"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + paragraphs.length * 0.32 }}
            className="mt-8"
          >
            <PinkButton onClick={onContinue}>Continue</PinkButton>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneContainer>
  );
}
