import { useEffect, useRef, useState } from "react";

// Drop your music file at: public/audio/bg-music.mp3
// (kept in /public rather than imported, so a missing file never breaks the build)
const BG_MUSIC_URL = "/audio/bg-music.mp3";

// Music never autoplays. Call `start()` once, from a user gesture
// (e.g. the Welcome button), then `toggleMute()` is free to use anytime.
export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio(BG_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const start = () => {
    if (hasStarted || !audioRef.current) return;
    audioRef.current.play().catch(() => {
      // Missing/invalid audio file — fail silently, UI still works.
    });
    setHasStarted(true);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  };

  return { start, isMuted, toggleMute, hasStarted };
}
