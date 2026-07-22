import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { photos } from "@/data/photos";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openPhoto = photos.find((p) => p.id === openId);

  const getRotation = (i: number) => {
    const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
    return rotations[i % rotations.length];
  };

  return (
    <section className="relative py-28 px-6 bg-space">
      <SectionHeading
        eyebrow="Capítulo 02"
        title="Galeria"
        subtitle="Alguns instantes que guardamos. Clique em qualquer um deles."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 pb-10">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            whileHover={{ scale: 1.05, y: -10, zIndex: 10 }}
            onClick={() => setOpenId(photo.id)}
            className={`relative bg-[#FAFAFA] p-3 pb-12 sm:p-4 sm:pb-16 shadow-xl hover:shadow-2xl transition-all duration-300 ${getRotation(i)}`}
          >
            <div className="relative w-full aspect-square bg-[#050508] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = "#111";
                }}
              />
            </div>
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-4">
              <p className="font-hand text-xl sm:text-2xl text-[#1a1a24] truncate">
                {photo.caption}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-xl w-full bg-[#FAFAFA] p-4 pb-20 sm:p-6 sm:pb-24 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-square bg-[#050508] overflow-hidden">
                <img
                  src={openPhoto.src}
                  alt={openPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-0 right-0 text-center px-6">
                <p className="font-hand text-3xl sm:text-4xl text-[#1a1a24]">
                  {openPhoto.caption}
                </p>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="absolute -top-12 right-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors duration-300"
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
