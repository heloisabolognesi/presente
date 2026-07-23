import { motion } from "framer-motion";
import { Clock, Image as ImageIcon, TerminalSquare, Video, MapPin } from "lucide-react";
import StarField from "./StarField";
import { scrollToSection } from "@/lib/scrollTo";

const files = [
  { id: "timeline", label: "linha-do-tempo", ext: ".log", icon: Clock },
  { id: "gallery", label: "galeria", ext: ".zip", icon: ImageIcon },
  { id: "video-message", label: "recado", ext: ".mp4", icon: Video },
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
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teamgreen/50" />
          <p className="font-mono text-[11px] tracking-[0.3em] text-mutedgray uppercase">
            MEMORIES OS v1.0
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teampurple/50" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient mb-4">
          Arquivo de Memórias
        </h1>
        <p className="text-mutedgray font-body text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Selecione um capítulo para começar a explorar.
        </p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        {files.map((file, i) => {
          const Icon = file.icon;
          return (
            <motion.button
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => scrollToSection(file.id)}
              className="card-premium rounded-xl p-5 flex flex-col items-center gap-3 text-center group hover:border-teampurple/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-teampurple/10 transition-colors duration-300">
                <Icon className="w-5 h-5 text-white/50 group-hover:text-teampurple transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-mono text-xs text-white/80 group-hover:text-white transition-colors duration-300 truncate max-w-[120px]">
                  {file.label}
                  <span className="text-mutedgray">{file.ext}</span>
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
