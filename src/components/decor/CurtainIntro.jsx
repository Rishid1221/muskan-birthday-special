import { motion } from "framer-motion";
import Bow from "./Bow";

// Pink gingham theatre curtain: two panels that part from the centre.
// `state`: "closed" | "opening" | "open" | "closing"
function Panel({ side }) {
  const isLeft = side === "left";

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: "#fff1f6",
        backgroundImage:
          "linear-gradient(90deg, rgba(214,51,108,0.28) 50%, transparent 50%), linear-gradient(rgba(214,51,108,0.28) 50%, transparent 50%)",
        backgroundSize: "26px 26px",
        backgroundBlendMode: "multiply",
        boxShadow: isLeft
          ? "inset -16px 0 26px -10px rgba(74,42,58,0.4)"
          : "inset 16px 0 26px -10px rgba(74,42,58,0.4)",
      }}
    >
      {/* pleat / fold shading */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: "repeating-linear-gradient(100deg, rgba(0,0,0,0.14) 0 8px, rgba(255,255,255,0.2) 8px 18px)",
        }}
      />
      {/* bottom ruffled valance */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: 28,
          backgroundImage: "radial-gradient(circle at 14px 6px, #fff1f6 12px, transparent 13px)",
          backgroundSize: "28px 28px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          filter: "drop-shadow(0 -2px 4px rgba(168,37,89,0.3))",
        }}
      />
      {/* tieback bow near the inner edge */}
      <div className={`absolute top-[56%] w-14 sm:w-16 ${isLeft ? "right-1" : "left-1"}`}>
        <Bow />
      </div>
    </div>
  );
}

const PANEL_TRANSITION = {
  open: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
  closed: { duration: 0.55, ease: [0.45, 0, 0.55, 1] },
};

export default function CurtainIntro({ state, message }) {
  if (state === "open") return null;

  const parted = state === "opening";

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2"
        animate={{ x: parted ? "-100%" : "0%" }}
        transition={parted ? PANEL_TRANSITION.open : PANEL_TRANSITION.closed}
      >
        <Panel side="left" />
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2"
        animate={{ x: parted ? "100%" : "0%" }}
        transition={parted ? PANEL_TRANSITION.open : PANEL_TRANSITION.closed}
      >
        <Panel side="right" />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-8"
        initial={{ opacity: 1 }}
        animate={{ opacity: state === "closed" ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <p
          className="font-display text-center text-xl font-semibold text-blush-700 sm:text-2xl"
          style={{ textShadow: "0 2px 10px rgba(255,255,255,0.9)" }}
        >
          {message}
        </p>
      </motion.div>
    </div>
  );
}
