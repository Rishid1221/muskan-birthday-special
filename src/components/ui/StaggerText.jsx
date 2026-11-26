import { motion, useReducedMotion } from "framer-motion";

const word = {
  hidden: { opacity: 0, y: 20, scale: 0.8, rotate: -4 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 16 } },
};

// Splits text into words and staggers them in. Falls back to a plain
// instant render when the user prefers reduced motion.
export default function StaggerText({ text, as: Tag = "span", className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08, delayChildren: delay }}
        style={{ display: "inline-block" }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} style={{ display: "inline-block" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
