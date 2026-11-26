import { motion, useReducedMotion } from "framer-motion";

// Each scene picks a transition "personality" instead of reusing one
// generic fade — keeps the journey feeling like distinct moments rather
// than six identical pages.
const VARIANTS = {
  "fade-slide": {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease: "easeIn" } },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 1.06, transition: { duration: 0.35, ease: "easeIn" } },
  },
  "slide-side": {
    initial: { opacity: 0, x: 70 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -70, transition: { duration: 0.35, ease: "easeIn" } },
  },
  pop: {
    initial: { opacity: 0, scale: 0.7, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.3 } },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  },
  burst: {
    initial: { opacity: 0, scale: 1.15 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  },
};

const REDUCED = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function SceneContainer({ children, className = "", variant = "fade-slide" }) {
  const reduceMotion = useReducedMotion();
  const v = reduceMotion ? REDUCED : (VARIANTS[variant] ?? VARIANTS["fade-slide"]);

  return (
    <motion.section
      variants={v}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-10 text-center ${className}`}
    >
      {children}
    </motion.section>
  );
}
