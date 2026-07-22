import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "SYSTEM STARTING...",
  "",
  "Loading...",
  "",
  "✓ Trust",
  "✓ Teamwork",
  "✓ Memories",
  "✓ Laughter",
  "✓ Friendship",
  "",
  "One special person detected."
];

export default function BootScreen({ onContinue }: { onContinue: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines < LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 380);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  useEffect(() => {
    if (!showWelcome) return;
    const t = setTimeout(() => setShowButton(true), 1200);
    return () => clearTimeout(t);
  }, [showWelcome]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-deep px-6 scanlines">
      <div className="relative z-10 w-full max-w-xl font-mono text-sm sm:text-base text-mutedgray">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("✓")
                ? "text-warmwhite opacity-90"
                : line === "One special person detected."
                ? "text-teampurple mt-2 font-medium"
                : ""
            }
          >
            {line || "\u00A0"}
          </div>
        ))}
        {visibleLines < LINES.length && <span className="animate-blink text-mutedgray">_</span>}

        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 font-display text-2xl sm:text-3xl font-semibold text-gradient-team"
          >
            Welcome, Anninha.
          </motion.div>
        )}

        {showButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            onClick={onContinue}
            className="mt-10 group relative inline-flex items-center gap-2 border border-white/10 rounded-full px-7 py-3 text-white/90 font-body text-sm tracking-wide animate-pulse-border overflow-hidden transition-colors duration-500 hover:text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teamgreen/20 to-teampurple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Continue</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
