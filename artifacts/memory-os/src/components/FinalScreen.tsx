import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StarField from "./StarField";

const LINES = [
  "Obrigado.",
  "Por acreditar em mim.",
  "Por acreditar na nossa equipe.",
  "Por fazer parte da minha história."
];

export default function FinalScreen() {
  const [visible, setVisible] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showLast, setShowLast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 1100);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setShowStars(true), 800);
    const t2 = setTimeout(() => setShowEnd(true), 2400);
    const t3 = setTimeout(() => setShowLast(true), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [started, visible]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-deep overflow-hidden text-center"
    >
      {showStars && <StarField density={120} />}

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          opacity: showStars ? 1 : 0,
          transition: "opacity 2s ease"
        }}
      />

      <div className="relative z-10 space-y-4">
        {LINES.slice(0, visible).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`font-display text-xl sm:text-2xl font-medium ${i === 0 ? "text-gradient-team text-2xl sm:text-3xl" : "text-white/90"}`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {showEnd && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 mt-16 font-mono text-xs tracking-[0.5em] text-teamgreen uppercase"
        >
          End of file
        </motion.p>
      )}

      {showLast && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="relative z-10 mt-6 font-body italic text-teampurple/80 text-sm sm:text-base"
        >
          ...ou talvez apenas o começo
        </motion.p>
      )}
    </section>
  );
}
