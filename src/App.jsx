import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import MusicToggle from "./components/ui/MusicToggle";
import WelcomeScreen from "./components/scenes/WelcomeScreen";
import CakeScene from "./components/scenes/CakeScene";
import CakeCutting from "./components/scenes/CakeCutting";
import GiftReveal from "./components/scenes/GiftReveal";
import LetterScene from "./components/scenes/LetterScene";
import FinalCelebration from "./components/scenes/FinalCelebration";

const SCENES = ["welcome", "cake", "cutting", "gift", "letter", "final"];

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const music = useBackgroundMusic();

  const goNext = () => setSceneIndex((i) => Math.min(i + 1, SCENES.length - 1));
  const replay = () => setSceneIndex(0);

  const scene = SCENES[sceneIndex];

  return (
    <main className="relative min-h-[100svh] w-full">
      {/* ASSET SLOT: drop public/images/birthday-background.png (desktop/wide
          screens) and public/images/birthday-background-mobile.png (narrow
          portrait screens, a dedicated full-height crop so nothing letterboxes
          or gets stretched — see app-bg-image / app-bg-image-mobile in
          index.css for the breakpoint). Falls back to the plain gradient if
          either file is missing.

          NOTE: this div intentionally has no opaque sibling/ancestor
          background competing with it — `<main>` must stay background-free.
          Because this is `position: fixed` and `<main>` doesn't establish
          fixed-position containment (no transform/filter), it escapes to
          the viewport-level stacking context; if `<main>` ever gets its own
          opaque background back, that background will paint ON TOP of this
          regardless of z-index, hiding the photo. */}
      <div className="app-bg fixed inset-0 -z-10 bg-center bg-no-repeat" aria-hidden="true" />

      <MusicToggle isMuted={music.isMuted} onToggle={music.toggleMute} hasStarted={music.hasStarted} />

      <AnimatePresence mode="wait">
        {scene === "welcome" && (
          <WelcomeScreen
            key="welcome"
            onStart={() => {
              music.start();
              goNext();
            }}
          />
        )}
        {scene === "cake" && <CakeScene key="cake" onContinue={goNext} />}
        {scene === "cutting" && <CakeCutting key="cutting" onContinue={goNext} />}
        {scene === "gift" && <GiftReveal key="gift" onContinue={goNext} />}
        {scene === "letter" && <LetterScene key="letter" onContinue={goNext} />}
        {scene === "final" && <FinalCelebration key="final" onReplay={replay} />}
      </AnimatePresence>
    </main>
  );
}

export default App;
