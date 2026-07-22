import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import AuthScreen from "@/components/AuthScreen";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import Terminal from "@/components/Terminal";
import OpenWhen from "@/components/OpenWhen";
import PlacesMap from "@/components/PlacesMap";
import FinalScreen from "@/components/FinalScreen";
import SmoothScroll from "@/components/SmoothScroll";
import MouseGlow from "@/components/MouseGlow";
import MemoryMenu from "@/components/MemoryMenu";
import Letter from "@/components/Letter";

type Stage = "boot" | "auth" | "unlocked";

export default function App() {
  const [stage, setStage] = useState<Stage>("boot");

  return (
    <main>
      <SmoothScroll active={stage === "unlocked"} />
      {stage === "unlocked" && <MouseGlow />}

      <AnimatePresence mode="wait">
        {stage === "boot" && (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <BootScreen onContinue={() => setStage("auth")} />
          </motion.div>
        )}

        {stage === "auth" && (
          <motion.div key="auth" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <AuthScreen onUnlocked={() => setStage("unlocked")} />
          </motion.div>
        )}

        {stage === "unlocked" && (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <MemoryMenu />

            <div className="section-divider" />
            <div id="timeline">
              <Timeline />
            </div>

            <div className="section-divider" />
            <div id="gallery">
              <Gallery />
            </div>

            <div className="section-divider" />
            <OpenWhen />

            <div className="section-divider" />
            <Terminal />

            <div className="section-divider" />
            <Letter />

            <div className="section-divider" />
            <PlacesMap />

            <div className="section-divider" />
            <FinalScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
