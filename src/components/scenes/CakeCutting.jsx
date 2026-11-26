import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate, AnimatePresence, useReducedMotion } from "framer-motion";
import SceneContainer from "../ui/SceneContainer";
import PinkButton from "../ui/PinkButton";
import StickerField from "../decor/StickerField";
import CakeBody from "../decor/CakeBody";
import { triggerConfetti } from "../decor/ConfettiBurst";
import { cuttingContent } from "../../data/content";

let trailId = 0;

export default function CakeCutting({ onContinue }) {
  const [isCut, setIsCut] = useState(false);
  const wrapRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(240);
  const dragX = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [trail, setTrail] = useState([]);

  const crumbs = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        x: (i - 4) * 9 + (Math.random() * 10 - 5),
        size: 3 + Math.random() * 4,
        drop: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.15,
      })),
    []
  );

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setTrackWidth(wrapRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const commitCut = () => {
    if (isCut) return;
    setIsCut(true);
    setTrail([]);
    triggerConfetti({ origin: { y: 0.55 } });
  };

  const handleDrag = () => {
    if (reduceMotion) return;
    const x = dragX.get();
    setTrail((prev) => [...prev.slice(-10), { id: trailId++, x }]);
  };

  const handleDragEnd = () => {
    if (dragX.get() > trackWidth * 0.55) {
      commitCut();
    } else {
      setTrail([]);
      animate(dragX, 0, { type: "spring", stiffness: 420, damping: 32 });
    }
  };

  return (
    <SceneContainer variant="slide-side">
      <StickerField />

      <h2 className="scene-heading font-display text-3xl font-bold text-blush-700 sm:text-4xl">{cuttingContent.heading}</h2>
      <p className="scene-subtext mt-2 text-plum-500">{isCut ? "" : cuttingContent.instruction}</p>

      <div ref={wrapRef} className="relative mt-10 flex flex-col items-center">
        {/* draggable knife + glowing trail, sits above the cake, spans its width */}
        {!isCut && (
          <div className="relative mb-3 h-10 w-full">
            {/* glowing cutting trail */}
            {trail.map((p, i) => (
              <span
                key={p.id}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blush-300"
                style={{
                  left: p.x + 20,
                  opacity: ((i + 1) / trail.length) * 0.7,
                  boxShadow: "0 0 10px 3px rgba(255,153,187,0.65)",
                }}
              />
            ))}

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: Math.max(trackWidth - 48, 40) }}
              dragElastic={0.04}
              dragMomentum={false}
              style={{ x: dragX }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.15, rotate: -18 }}
              className="absolute left-0 top-0 flex h-10 w-10 cursor-grab touch-none items-center justify-center rounded-full bg-white text-2xl shadow-md ring-1 ring-blush-200 active:cursor-grabbing"
              aria-label="Drag to cut the cake"
            >
              🔪
            </motion.div>
          </div>
        )}

        {/* the two halves, overlapping until cut */}
        <div className="relative">
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
            animate={isCut ? { x: -34, rotate: -6, y: 6 } : { x: 0, rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
          >
            <CakeBody />
          </motion.div>
          <motion.div
            style={{ clipPath: "inset(0 0 0 50%)" }}
            animate={isCut ? { x: 34, rotate: 6, y: 6 } : { x: 0, rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
          >
            <CakeBody />
          </motion.div>

          {/* crumbs scattered along the cut line */}
          {isCut && !reduceMotion && (
            <div className="absolute left-1/2 top-[58%] h-0 w-0">
              {crumbs.map((c) => (
                <motion.span
                  key={c.id}
                  className="absolute rounded-sm bg-[#c98a4b]"
                  style={{ width: c.size, height: c.size, left: c.x }}
                  initial={{ opacity: 0, y: -4, rotate: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 1, 0.9], y: c.drop, rotate: c.rotate, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.15 + c.delay }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        {!isCut && (
          <PinkButton onClick={commitCut} variant="secondary">
            {cuttingContent.fallbackButton}
          </PinkButton>
        )}

        <AnimatePresence>
          {isCut && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PinkButton onClick={onContinue}>{cuttingContent.continueLabel}</PinkButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneContainer>
  );
}
