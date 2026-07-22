"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, BookOpen, Camera } from "lucide-react";
import { places, Place } from "@/data/places";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

// Dynamically import the MapComponent to avoid Next.js SSR document reference errors
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] rounded-2xl bg-space flex items-center justify-center border border-white/5 glow-team">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-teampurple border-t-transparent rounded-full animate-spin"></div>
        <p className="font-mono text-xs text-mutedgray">Carregando mapa interativo...</p>
      </div>
    </div>
  )
});

export default function PlacesMap() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [imageError, setImageError] = useState(false);

  // Reset image error state when selected place changes
  useEffect(() => {
    setImageError(false);
  }, [selectedPlace]);

  // Handle auto-select of the first place on mount
  useEffect(() => {
    if (places.length > 0) {
      setSelectedPlace(places[0]);
    }
  }, []);

  return (
    <section id="places" className="relative py-28 px-6 bg-space overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teampurple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-teamgreen/5 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        eyebrow="Capítulo 05"
        title="Mapa de Lugares"
        subtitle="Cada lugar guarda um pedaço da nossa história."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Interactive Map Area */}
        <div className="lg:col-span-8 w-full">
          <MapComponent
            places={places}
            selectedPlace={selectedPlace}
            onSelectPlace={(place) => setSelectedPlace(place)}
          />
        </div>

        {/* Floating Detail Card Area */}
        <div className="lg:col-span-4 w-full h-full lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            {selectedPlace ? (
              <motion.div
                key={selectedPlace.order}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card-premium rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[550px] border border-white/5 bg-space/65 backdrop-blur-md"
              >
                {/* Photo Header */}
                <div className="relative w-full h-[200px] bg-deep/80 overflow-hidden group">
                  {!imageError ? (
                    <Image
                      src={selectedPlace.photo}
                      alt={selectedPlace.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-space via-deep to-teampurple/20 text-mutedgray px-4 text-center">
                      <Camera className="w-8 h-8 text-teampurple/60 mb-2 animate-pulse" strokeWidth={1.5} />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">{selectedPlace.location || selectedPlace.city}</span>
                      <span className="font-hand text-lg mt-1 text-teampurple/90">{selectedPlace.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category / Order Tag */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-teampurple/90 border border-white/10 rounded-full text-[9px] font-mono tracking-widest text-white shadow-md">
                    MARCO #{String(selectedPlace.order).padStart(2, "0")}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-gradient mb-4 leading-snug">
                      {selectedPlace.title}
                    </h3>

                    {/* Meta information */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-teamgreen shrink-0 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="text-xs font-semibold text-white/90">
                            {selectedPlace.location || "Local não especificado"}
                          </p>
                          <p className="text-[11px] text-mutedgray leading-none mt-0.5">
                            {selectedPlace.city}
                            {selectedPlace.neighborhood ? ` — ${selectedPlace.neighborhood}` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-teampurple shrink-0" strokeWidth={2} />
                        <p className="text-xs text-white/80 font-mono">
                          {selectedPlace.date}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/5 w-full my-4" />

                    {/* Description */}
                    <div className="flex gap-3">
                      <BookOpen className="w-4 h-4 text-teampurple shrink-0 mt-1" strokeWidth={1.5} />
                      <p className="text-sm text-mutedgray leading-relaxed font-body">
                        {selectedPlace.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <button className="w-full py-3 bg-gradient-to-r from-teampurple to-teamgreen text-white font-mono text-xs tracking-wider rounded-xl hover:shadow-lg hover:shadow-teampurple/20 hover:brightness-110 active:scale-[0.98] transition-all duration-300 uppercase">
                      📖 Ver história
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-[550px] bg-space/40 backdrop-blur-md rounded-2xl border border-white/5 flex items-center justify-center p-6 text-center">
                <p className="font-mono text-xs text-mutedgray leading-relaxed">
                  Selecione ou aguarde o autoplay do mapa para revelar as memórias desse local.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
