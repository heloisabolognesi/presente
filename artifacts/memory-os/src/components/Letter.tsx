import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StarField from "./StarField";

const LETTER_TEXT = `Anninha,

Escreva aqui a sua carta pessoal. Ela aparecerá letra por letra, como uma máquina de escrever antiga.

Pode ser longa, pode ser curta — o que importa é que seja verdadeiro.

Com carinho, de quem fez isso com todo o coração.`;

export default function Letter() {
  const [displayed, setDisplayed] = useState("");
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= LETTER_TEXT.length) return;
    const t = setTimeout(() => setDisplayed(LETTER_TEXT.slice(0, displayed.length + 1)), 22);
    return () => clearTimeout(t);
  }, [started, displayed]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-deep overflow-hidden">
      <StarField density={50} />
      <div className="relative max-w-xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] text-teamgreen mb-8 text-center uppercase">
          Capítulo 05 — Carta
        </p>
        <div className="glass rounded-2xl p-8 sm:p-10 min-h-[280px] font-body text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
          {displayed}
          {displayed.length < LETTER_TEXT.length && started && (
            <span className="animate-blink text-teamgreen">|</span>
          )}
        </div>

        {displayed.length >= LETTER_TEXT.length && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 text-right font-display text-xl text-teampurple"
          >
            Com carinho ❤️
          </motion.p>
        )}
      </div>
    </section>
  );
}
