"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { openWhenNotes, type OpenWhenNote } from "@/data/openWhen";
import SectionHeading from "./SectionHeading";

function LetterPaper({ note, onClose }: { note: OpenWhenNote; onClose: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
  }, [note.id]);

  useEffect(() => {
    if (displayed.length >= note.text.length) return;
    const t = setTimeout(() => setDisplayed(note.text.slice(0, displayed.length + 1)), 24);
    return () => clearTimeout(t);
  }, [displayed, note.text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/88 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1.5, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotate: -0.5, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-xl card-premium"
      >
        <div
          className="px-8 py-10 sm:px-10 sm:py-12"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(255,255,255,0.06) 28px)"
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-3.5 h-3.5 text-teampurple/60" strokeWidth={1.5} />
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
              Abra quando... {note.label.toLowerCase()}
            </p>
          </div>
          <p className="font-body text-white/90 text-base sm:text-lg leading-[28px] whitespace-pre-wrap min-h-[140px]">
            {displayed}
            {displayed.length < note.text.length && <span className="animate-blink text-teamgreen">|</span>}
          </p>
        </div>

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
            <Mail className={`w-3.5 h-3.5 text-white/30 transition-colors duration-300 ${i % 2 === 0 ? "group-hover:text-teamgreen" : "group-hover:text-teampurple"}`} strokeWidth={1.5} />
            {note.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>{active && <LetterPaper note={active} onClose={() => setActiveId(null)} />}</AnimatePresence>
    </section>
  );
}
