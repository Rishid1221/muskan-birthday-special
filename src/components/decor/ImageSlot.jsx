import { useState } from "react";

// Zero-code asset swap: tries to load a real image from /public; if it's
// missing (404) or not supplied yet, silently renders the coded fallback
// instead. Drop a correctly-named file in `public/...` and it just appears
// next reload — no component edits needed.
export default function ImageSlot({ src, alt = "", className = "", imgStyle, fallback }) {
  const [failed, setFailed] = useState(false);

  if (failed) return fallback ?? null;

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={className}
      style={imgStyle}
      onError={() => setFailed(true)}
    />
  );
}
