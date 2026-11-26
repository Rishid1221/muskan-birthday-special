import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ImageSlot from "./ImageSlot";

// Premium flat-illustration bouquet (lilies, tulips, sunflowers) built from
// layered SVG gradients for depth/highlights — not photorealistic, but not
// flat circles either. Each flower sways independently once revealed.
//
// ASSET SLOT: drop a file at public/images/bouquet.png and it automatically
// replaces this whole illustration — no code edits needed. See
// public/images/README.md.

const PETAL = "M50 94 C 18 72, 12 24, 50 3 C 88 24, 82 72, 50 94 Z";

function Tulip({ size }) {
  const uid = useId();
  const gid = `t${uid}`;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd3e6" />
          <stop offset="55%" stopColor="#ff8fb3" />
          <stop offset="100%" stopColor="#e2578a" />
        </linearGradient>
        <radialGradient id={`${gid}h`} cx="35%" cy="22%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={PETAL} transform="rotate(-24 50 92)" fill={`url(#${gid})`} />
      <path d={PETAL} fill={`url(#${gid})`} />
      <path d={PETAL} transform="rotate(24 50 92)" fill={`url(#${gid})`} />
      <path d={PETAL} fill={`url(#${gid}h)`} opacity="0.65" />
    </svg>
  );
}

function Lily({ size }) {
  const uid = useId();
  const gid = `l${uid}`;
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffb3cb" />
          <stop offset="55%" stopColor="#fff6f8" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      {petals.map((r) => (
        <path
          key={r}
          d={PETAL}
          transform={`rotate(${r} 50 50) translate(0 -8)`}
          fill={`url(#${gid})`}
          stroke="#ffd4e2"
          strokeWidth="0.6"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * 2 * Math.PI;
        const x2 = 50 + Math.cos(angle) * 13;
        const y2 = 50 + Math.sin(angle) * 13;
        return (
          <g key={i}>
            <line x1="50" y1="50" x2={x2} y2={y2} stroke="#e8a6c4" strokeWidth="1" />
            <circle cx={x2} cy={y2} r="2" fill="#c9833f" />
          </g>
        );
      })}
    </svg>
  );
}

function Sunflower({ size }) {
  const uid = useId();
  const gid = `s${uid}`;
  const petalCount = 13;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f4a01f" />
          <stop offset="100%" stopColor="#ffe169" />
        </linearGradient>
        <radialGradient id={`${gid}c`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a9702f" />
          <stop offset="70%" stopColor="#6b4420" />
          <stop offset="100%" stopColor="#412c15" />
        </radialGradient>
      </defs>
      {Array.from({ length: petalCount }).map((_, i) => (
        <path
          key={i}
          d="M50 48 C 44 36 44 14 50 2 C 56 14 56 36 50 48 Z"
          transform={`rotate(${(360 / petalCount) * i} 50 50)`}
          fill={`url(#${gid})`}
        />
      ))}
      <circle cx="50" cy="50" r="21" fill={`url(#${gid}c)`} />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * 2 * Math.PI;
        const r = 7 + (i % 3) * 4.5;
        return <circle key={i} cx={50 + Math.cos(a) * r} cy={50 + Math.sin(a) * r} r="1.2" fill="#2f1d0c" opacity="0.55" />;
      })}
    </svg>
  );
}

function Leaf({ size = 30, rotate = 0, flip = false }) {
  const uid = useId();
  const gid = `g${uid}`;
  return (
    <svg
      viewBox="0 0 60 30"
      width={size}
      height={size * 0.5}
      style={{ transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`, overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bdeee0" />
          <stop offset="100%" stopColor="#3f9d6c" />
        </linearGradient>
      </defs>
      <path d="M2 15 C 20 -5 45 -5 58 15 C 45 5 20 5 2 15 Z" fill={`url(#${gid})`} />
      <path d="M4 15 L56 15" stroke="#2f7d55" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function Stem({ height = 70, rotate = 0 }) {
  return (
    <div
      className="w-1 rounded-full bg-gradient-to-b from-emerald-300 to-emerald-600"
      style={{ height, transform: `rotate(${rotate}deg)`, transformOrigin: "top center" }}
    />
  );
}

const STEMS = [
  { Flower: Tulip, size: 46, rotate: -16, lift: 8, sway: 3.2 },
  { Flower: Sunflower, size: 56, rotate: 0, lift: 0, sway: 4 },
  { Flower: Lily, size: 42, rotate: 16, lift: 8, sway: 3.6 },
  { Flower: Tulip, size: 36, rotate: -30, lift: 18, sway: 2.8 },
  { Flower: Sunflower, size: 34, rotate: 30, lift: 18, sway: 3.4 },
];

const SPARKLE_SPOTS = [
  { top: "4%", left: "10%" },
  { top: "0%", left: "80%" },
  { top: "30%", left: "95%" },
  { top: "35%", left: "0%" },
  { top: "-6%", left: "45%" },
];

function CodedBouquet({ sway = true }) {
  const reduceMotion = useReducedMotion();
  const animateSway = sway && !reduceMotion;

  return (
    <div className="relative flex flex-col items-center">
      {/* sparkles */}
      {animateSway &&
        SPARKLE_SPOTS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-gold-400"
            style={{ top: s.top, left: s.left }}
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.1, 0.7] }}
            transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <Sparkles size={14} />
          </motion.div>
        ))}

      {/* leaves peeking out behind the stems */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="absolute -left-10 top-2">
          <Leaf size={34} rotate={-30} />
        </div>
        <div className="absolute -right-10 top-2">
          <Leaf size={34} rotate={30} flip />
        </div>
      </div>

      {/* stems + flowers */}
      <div className="relative flex items-end justify-center" style={{ height: 100 }}>
        {STEMS.map((s, i) => {
          const Flower = s.Flower;
          return (
            <motion.div
              key={i}
              className="relative mx-[-6px] flex flex-col items-center"
              style={{ transform: `translateY(${s.lift}px)` }}
              animate={
                animateSway
                  ? { rotate: [s.rotate - s.sway, s.rotate + s.sway, s.rotate - s.sway] }
                  : { rotate: s.rotate }
              }
              transition={
                animateSway
                  ? { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                  : { duration: 0.3 }
              }
            >
              <Flower size={s.size} />
              <Stem height={70 - s.lift} rotate={0} />
            </motion.div>
          );
        })}
      </div>

      {/* satin ribbon wrap */}
      <div
        className="-mt-2 h-28 w-40 sm:w-48"
        style={{
          clipPath: "polygon(50% 0%, 8% 100%, 92% 100%)",
          background: "linear-gradient(155deg, var(--color-blush-300) 0%, var(--color-blush-500) 60%, var(--color-blush-600) 100%)",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
          }}
        />
      </div>
      <div className="-mt-20 h-3 w-28 rounded-full bg-white/80 shadow-sm sm:w-32" />
      <div className="-mt-[0.95rem] h-4 w-9 rounded-sm bg-gold-400/90" />
    </div>
  );
}

export default function Bouquet({ className = "", sway = true }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <ImageSlot
        src="/images/bouquet.png"
        alt="Your bouquet"
        // Transparent cutout — floats borderless, same footprint as before.
        className="w-40 object-contain drop-shadow-xl sm:w-48"
        fallback={<CodedBouquet sway={sway} />}
      />
    </div>
  );
}
