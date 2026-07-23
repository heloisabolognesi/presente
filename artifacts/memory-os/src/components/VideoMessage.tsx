import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function VideoMessage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="video-message" className="relative py-28 px-6 bg-deep">
      <SectionHeading
        eyebrow="Capítulo 03"
        title="Um recado pra você"
        subtitle="Aperte play. Esse é pra você."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto"
      >
        {/* Glow ring */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-teamgreen/30 via-teampurple/20 to-transparent">
          <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0f]">
            {/* Video element */}
            <video
              ref={videoRef}
              src="/photos/recado.mp4"
              className="w-full aspect-video object-cover"
              onEnded={() => setPlaying(false)}
              playsInline
            />

            {/* Overlay — shown before first play */}
            {!started && (
              <motion.div
                initial={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full border border-teamgreen/40 bg-teamgreen/10 flex items-center justify-center cursor-pointer"
                  onClick={toggle}
                >
                  <Play className="w-6 h-6 text-teamgreen fill-teamgreen/80 ml-1" strokeWidth={1.5} />
                </motion.div>
                <p className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">
                  pressione play
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4 px-1">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            {playing
              ? <Pause className="w-4 h-4" strokeWidth={1.5} />
              : <Play className="w-4 h-4 ml-0.5" strokeWidth={1.5} />
            }
          </button>

          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            {muted
              ? <VolumeX className="w-4 h-4" strokeWidth={1.5} />
              : <Volume2 className="w-4 h-4" strokeWidth={1.5} />
            }
          </button>

          <div className="flex-1 h-px bg-white/[0.06]" />

          <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
            recado.mp4
          </span>
        </div>
      </motion.div>
    </section>
  );
}
