import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Real Hello Kitty pink gift-box artwork (your supplied gift-box.png,
// extracted into three layers: closed / base / lid — see
// public/images/README.md for how these were cut from the sprite sheet).
// Driven by a `phase`: "closed" -> "shaking" -> "unwrapping" -> "opening" -> "revealed"
//
// The closed box and the open base+lid come from two separate individual
// renders (slightly different camera angle), so rather than pretend they're
// one continuous object, we crossfade from the closed shot to the base+lid
// stack right as the shake ends — then the lid (a real separate layer) lifts
// off with its own spring bounce while the base stays put underneath.
export default function GiftBox({ phase }) {
  const reduceMotion = useReducedMotion();
  const shaking = phase === "shaking" && !reduceMotion;
  const showClosed = phase === "closed" || phase === "shaking";
  const opened = phase === "opening" || phase === "revealed";

  return (
    <div className="relative flex flex-col items-center" style={{ minHeight: 230 }}>
      <AnimatePresence mode="wait">
        {showClosed ? (
          <motion.img
            key="closed"
            src="/images/gift-box-closed.png"
            alt="Wrapped gift box"
            className="w-52 object-contain drop-shadow-xl sm:w-64"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              shaking
                ? { opacity: 1, scale: 1, rotate: [0, -4, 4, -3, 3, -1, 1, 0], y: [0, -3, 0, -3, 0, -1, 0, 0] }
                : { opacity: 1, scale: 1, rotate: 0, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={shaking ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.3 }}
          />
        ) : (
          <motion.div
            key="open"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              src="/images/gift-box-lid.png"
              alt=""
              className="relative z-20 w-56 object-contain sm:w-64"
              style={{ marginBottom: "-22%" }}
              initial={{ y: 0, x: 0, rotate: -2, opacity: 1, scale: 1 }}
              animate={
                opened
                  ? { y: -115, x: 34, rotate: -32, opacity: 0, scale: 0.8 }
                  : { y: 0, x: 0, rotate: -2, opacity: 1, scale: 1 }
              }
              transition={
                reduceMotion
                  ? { duration: 0.25 }
                  : opened
                    ? { type: "spring", stiffness: 170, damping: 9 } // natural bounce on lift-off
                    : { type: "spring", stiffness: 300, damping: 16 }
              }
            />
            <img
              src="/images/gift-box-base.png"
              alt="Open gift box"
              className="relative z-0 w-52 object-contain drop-shadow-xl sm:w-64"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* grounding shadow */}
      <div
        className="-mt-2 h-3 w-36 rounded-full sm:w-44"
        style={{ background: "radial-gradient(ellipse, rgba(74,20,48,0.28) 0%, transparent 72%)" }}
      />
    </div>
  );
}
