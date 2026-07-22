import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import StarField from "./StarField";

const CORRECT_KEY = "07/08/2024";

const WRONG_MESSAGES = [
  "Essa memória ainda não desbloqueia nossa história.",
  "Dica: foi quando tudo começou.",
  "As respostas mais importantes não ficam em um calendário. Elas ficam na memória."
];

type Phase = "input" | "accepted" | "decrypting" | "opening";

export default function AuthScreen({ onUnlocked }: { onUnlocked: () => void }) {
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUnlock = () => {
    if (value.trim() === CORRECT_KEY) {
      setErrorIndex(null);
      setPhase("accepted");
      setTimeout(() => setPhase("decrypting"), 1100);
    } else {
      setErrorIndex((i) => (i === null ? 0 : (i + 1) % WRONG_MESSAGES.length));
    }
  };

  useEffect(() => {
    if (phase !== "decrypting") return;
    if (progress >= 100) {
      const t = setTimeout(() => setPhase("opening"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 4)), 45);
    return () => clearTimeout(t);
  }, [phase, progress]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => onUnlocked(), 1400);
    return () => clearTimeout(t);
  }, [phase, onUnlocked]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-deep px-6 overflow-hidden">
      <StarField density={60} />

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md text-center"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <Lock className="w-10 h-10 mx-auto text-teampurple/80" strokeWidth={1.2} />
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-wide mb-3 text-gradient">
              ACCESS REQUIRED
            </h1>
            <p className="text-mutedgray font-body text-sm sm:text-base leading-relaxed mb-8">
              Nem toda senha é feita de números.
              <br />
              Algumas são feitas de lembranças.
            </p>

            <div className="card-premium card-shimmer rounded-2xl p-6 sm:p-8">
              <label className="block text-[11px] font-mono text-teamgreen mb-3 tracking-[0.25em] uppercase">
                MEMORY KEY
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-center font-mono text-lg tracking-widest text-white placeholder:text-white/15 focus:outline-none focus:border-teampurple/50 focus:bg-white/[0.05] transition-all duration-300"
              />
              <button
                onClick={handleUnlock}
                className="mt-5 w-full relative rounded-xl bg-white/[0.03] border border-white/10 py-3.5 font-body text-sm tracking-wide overflow-hidden group transition-colors duration-400"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teamgreen/15 to-teampurple/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative group-hover:text-white transition-colors duration-300">Unlock</span>
              </button>

              <AnimatePresence mode="wait">
                {errorIndex !== null && (
                  <motion.p
                    key={errorIndex}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-xs text-[#F43F5E] font-mono"
                  >
                    {WRONG_MESSAGES[errorIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {phase === "accepted" && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Unlock className="w-10 h-10 mx-auto text-teamgreen" strokeWidth={1.2} />
            </motion.div>
            <p className="font-mono text-teampurple text-lg">
              Memory Key Accepted.
              <br />
              <span className="text-teamgreen">Access Granted.</span>
            </p>
          </motion.div>
        )}

        {(phase === "decrypting" || phase === "opening") && (
          <motion.div
            key="decrypting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-sm text-center font-mono"
          >
            <p className="text-white/90 mb-4">
              {phase === "opening" ? "Opening Memory File..." : "Decrypting Memories..."}
            </p>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100 ease-linear"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #22C55E, #8B5CF6)"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
