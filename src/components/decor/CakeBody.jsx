import ImageSlot from "./ImageSlot";
import Bow from "./Bow";

// Barbie-inspired 3-tier cake, hand-coded in CSS (scalloped piped frosting,
// pearl beading, ribbon band, gold trim, bow topper, soft plate shadow).
// Used by both the candle scene and the cutting scene so the cake looks
// identical throughout.
//
// ASSET SLOT: drop a file at public/images/barbie-cake.png and it
// automatically replaces this whole illustration — no code edits needed.
// See public/images/README.md.

function FrostingEdge({ color = "#fff", bump = 9 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 right-0"
      style={{
        top: -bump * 0.6,
        height: bump * 1.3,
        backgroundImage: `radial-gradient(circle at ${bump}px ${bump * 0.6}px, ${color} ${bump * 0.56}px, transparent ${bump * 0.58}px)`,
        backgroundSize: `${bump * 2}px ${bump * 1.3}px`,
        backgroundRepeat: "repeat-x",
        filter: "drop-shadow(0 1px 1px rgba(168,37,89,0.18))",
      }}
    />
  );
}

function RibbonBow({ size = 26 }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: size }}>
      <Bow color="var(--color-gold-400)" />
    </div>
  );
}

function CodedCake() {
  return (
    <div className="relative flex origin-bottom scale-150 flex-col items-center">
      {/* bow topper */}
      <div className="relative z-10 mb-[-4px] w-9 drop-shadow-sm sm:w-10">
        <Bow />
      </div>

      {/* top tier */}
      <div
        className="relative z-[3] h-16 w-28 rounded-[22px] shadow-inner sm:h-[4.6rem] sm:w-32"
        style={{ background: "linear-gradient(150deg, var(--color-blush-200) 0%, var(--color-blush-400) 100%)" }}
      >
        <FrostingEdge bump={7} />
        <div className="absolute inset-x-0 top-2 flex justify-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{ width: 5, height: 5, background: "radial-gradient(circle at 32% 30%, #fff, #ffb3cb)" }}
            />
          ))}
        </div>
      </div>

      {/* gold trim */}
      <div className="relative z-[2] h-[3px] w-32 bg-gold-400 sm:w-36" />

      {/* middle tier */}
      <div
        className="relative z-[2] -mt-[1px] h-16 w-40 rounded-[24px] shadow-inner sm:h-20 sm:w-48"
        style={{ background: "linear-gradient(150deg, var(--color-blush-300) 0%, var(--color-blush-500) 100%)" }}
      >
        <FrostingEdge bump={8} />
        <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{ width: 6, height: 6, background: "radial-gradient(circle at 32% 30%, #fff, #ffe3ef, #ff8fb3)" }}
            />
          ))}
        </div>
        <RibbonBow size={22} />
      </div>

      {/* gold trim */}
      <div className="relative z-[1] h-[3px] w-48 bg-gold-400 sm:w-56" />

      {/* bottom tier */}
      <div
        className="relative z-[1] -mt-[1px] h-20 w-56 rounded-[28px] shadow-lg sm:h-24 sm:w-64"
        style={{ background: "linear-gradient(150deg, var(--color-blush-400) 0%, var(--color-blush-600) 100%)" }}
      >
        <FrostingEdge bump={9} />
        <div className="absolute inset-x-0 top-3 flex justify-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{ width: 7, height: 7, background: "radial-gradient(circle at 32% 30%, #fff, #ffe3ef, #ff6699)" }}
            />
          ))}
        </div>
        {/* vertical ribbon band */}
        <div
          className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.55))" }}
        />
      </div>

      {/* plate shadow + plate */}
      <div
        className="-mt-3 h-5 w-[19rem] rounded-full sm:w-80"
        style={{ filter: "blur(4px)", background: "radial-gradient(ellipse, rgba(74,42,58,0.35) 0%, transparent 72%)" }}
      />
      <div className="-mt-6 h-4 w-72 rounded-full bg-white shadow-md ring-1 ring-blush-200 sm:w-80" />
    </div>
  );
}

export default function CakeBody({ className = "" }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <ImageSlot
        src="/images/barbie-cake.png"
        // ~55% bigger than the original 256px/288px, per reference sizing request
        className="w-[24rem] object-contain sm:w-[28rem]"
        fallback={<CodedCake />}
      />
    </div>
  );
}
