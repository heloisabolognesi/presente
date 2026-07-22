import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { openWhenNotes, type OpenWhenNote } from "@/data/openWhen";
import SectionHeading from "./SectionHeading";

function LetterPaper({ note, onClose }: { note: OpenWhenNote; onClose: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= note.text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(note.text.slice(0, ++i));
    }, 22);
    return () => clearInterval(interval);
  }, [note]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-lg w-full card-premium rounded-2xl p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-teamgreen mb-6 uppercase">
          Abra quando... {note.label}
        </p>
        <p className="font-body text-white/90 text-base sm:text-lg leading-[28px] whitespace-pre-wrap min-h-[140px]">
          {displayed}
          {displayed.length < note.text.length && (
            <span className="animate-blink text-teamgreen">|</span>
          )}
        </p>

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors duration-300"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function OpenWhen() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = openWhenNotes.find((n) => n.id === activeId) ?? null;

  return (
    <section id="open-when" className="relative py-28 px-6 bg-deep">
      <SectionHeading
        eyebrow="Capítulo 03"
        title="Abra quando..."
        subtitle="Pequenas cartas pra momentos específicos. Abra a que combinar com o seu agora."
      />

      <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-3">
        {openWhenNotes.map((note, i) => (
          <motion.button
            key={note.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setActiveId(note.id)}
            className={`group inline-flex items-center gap-2 card-premium rounded-full px-5 py-2.5 text-sm font-body text-white/80 transition-colors duration-300 hover:text-white ${i % 2 === 0 ? "hover:border-teamgreen/50" : "hover:border-teampurple/50"}`}
          >
            <Mail
              className={`w-3.5 h-3.5 text-white/30 transition-colors duration-300 ${i % 2 === 0 ? "group-hover:text-teamgreen" : "group-hover:text-teampurple"}`}
              strokeWidth={1.5}
            />
            {note.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && <LetterPaper note={active} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  );
}
