import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { photos } from "@/data/photos";
import SectionHeading from "./SectionHeading";

// Subtle, consistent rotations between -5° and +5°
const ROTATIONS = [-3, 2, -1.5, 3.5, -2.5, 1, -4, 2.5];

export default function Gallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openPhoto = photos.find((p) => p.id === openId);

  return (
    <section className="relative py-28 px-4 sm:px-8 bg-space">
      <SectionHeading
        eyebrow="Capítulo 02"
        title="Galeria"
        subtitle="Alguns instantes que guardamos. Clique em qualquer um deles."
      />

      {/* Polaroid grid — uniform card size, balanced spacing */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-10 pb-10">
        {photos.map((photo, i) => {
          const deg = ROTATIONS[i % ROTATIONS.length];
          return (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
              whileHover={{
                scale: 1.06,
                rotate: 0,
                y: -8,
                zIndex: 20,
                transition: { duration: 0.25 }
              }}
              style={{ rotate: `${deg}deg` }}
              onClick={() => setOpenId(photo.id)}
              /* Fixed polaroid dimensions: same on all cards */
              className="relative flex-none bg-[#F8F6F0] shadow-lg hover:shadow-2xl transition-shadow duration-300"
              aria-label={photo.caption}
            >
              {/* Photo area — fixed square, consistent across all cards */}
              <div
                className="bg-[#050508] overflow-hidden"
                style={{ width: "160px", height: "160px" }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.style.background = "#1a1a2e";
                  }}
                />
              </div>

              {/* Caption strip — fixed height, same for every card */}
              <div
                className="flex items-center justify-center px-2"
                style={{ width: "160px", height: "44px" }}
              >
                <p
                  className="font-hand text-lg text-[#1a1a24] text-center leading-tight line-clamp-1 w-full"
                >
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {openPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#F8F6F0] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large photo */}
              <div
                className="bg-[#050508] overflow-hidden"
                style={{ width: "min(480px, 85vw)", height: "min(480px, 85vw)" }}
              >
                <img
                  src={openPhoto.src}
                  alt={openPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <div
                className="flex items-center justify-center px-6"
                style={{ width: "min(480px, 85vw)", height: "64px" }}
              >
                <p className="font-hand text-2xl sm:text-3xl text-[#1a1a24] text-center">
                  {openPhoto.caption}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpenId(null)}
                className="absolute -top-12 right-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
