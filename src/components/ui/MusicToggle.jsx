import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicToggle({ isMuted, onToggle, hasStarted }) {
  if (!hasStarted) return null;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      aria-pressed={isMuted}
      className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-blush-600 shadow-md ring-1 ring-blush-200 backdrop-blur-sm"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </motion.button>
  );
}
