"use client";

import { motion } from "framer-motion";
import { Clock, Image as ImageIcon, TerminalSquare, Feather, MapPin } from "lucide-react";
import StarField from "./StarField";
import { scrollToSection } from "@/lib/scrollTo";

const files = [
  { id: "timeline", label: "linha-do-tempo", ext: ".log", icon: Clock },
  { id: "gallery", label: "galeria", ext: ".zip", icon: ImageIcon },
  { id: "open-when", label: "abra-quando", ext: ".txt", icon: Feather },
  { id: "terminal-section", label: "terminal", ext: ".exe", icon: TerminalSquare },
  { id: "places", label: "mapa", ext: ".geo", icon: MapPin }
];

export default function MemoryMenu() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-deep overflow-hidden">
      <StarField density={70} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-14"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teamgreen/40" />
          <p className="font-mono text-[11px] tracking-[0.3em] text-teampurple uppercase">
            Memory Archive
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teamgreen/40" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-gradient">
          Escolha um capítulo
        </h1>
        <p className="text-mutedgray text-sm mt-3 max-w-sm mx-auto">
          Abra na ordem que quiser. Nada aqui precisa ser linear.
        </p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 max-w-2xl w-full">
        {files.map((file, i) => {
          const Icon = file.icon;
          const hoverColor = i % 2 === 0 ? "text-teamgreen" : "text-teampurple";
          const glowColor = i % 2 === 0 ? "bg-teamgreen/10" : "bg-teampurple/10";

          return (
            <motion.button
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => scrollToSection(file.id)}
              className="card-premium rounded-2xl px-4 py-8 flex flex-col items-center gap-3 group transition-all duration-300 hover:glow-team"
            >
              <div className="relative">
                <Icon
                  className={`w-7 h-7 text-mutedgray/70 group-hover:${hoverColor} transition-colors duration-300`}
                  strokeWidth={1.4}
                />
                <div className={`absolute inset-0 ${glowColor} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
              <span className="font-mono text-xs sm:text-[13px] text-white/70 text-center break-all group-hover:text-white/95 transition-colors duration-300">
                {file.label}
                <span className="text-mutedgray/50">{file.ext}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
