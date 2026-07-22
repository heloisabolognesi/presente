import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, BookOpen, Camera } from "lucide-react";
import { places, type Place } from "@/data/places";
import SectionHeading from "./SectionHeading";

// Lazy import to avoid SSR-style issues with leaflet
const MapComponent = lazy(() => import("./MapComponent"));

function MapFallback() {
  return (
    <div className="w-full h-[550px] rounded-2xl bg-space flex items-center justify-center border border-white/5 glow-team">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-teampurple border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-mutedgray">Carregando mapa interativo...</p>
      </div>
    </div>
  );
}

export default function PlacesMap() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [selectedPlace]);

  useEffect(() => {
    if (places.length > 0) {
      setSelectedPlace(places[0]);
    }
  }, []);

  return (
    <section id="places" className="relative py-28 px-6 bg-space overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teampurple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-teamgreen/5 rounded-full blur-[100px] pointer-events-none" />

      <SectionHeading
        eyebrow="Capítulo 06"
        title="Mapa de Lugares"
        subtitle="Cada lugar guarda um pedaço da nossa história."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <div className="lg:col-span-8 w-full">
          <Suspense fallback={<MapFallback />}>
            <MapComponent
              places={places}
              selectedPlace={selectedPlace}
              onSelectPlace={(place) => setSelectedPlace(place)}
            />
          </Suspense>
        </div>

        <div className="lg:col-span-4 w-full h-full lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            {selectedPlace ? (
              <motion.div
                key={selectedPlace.order}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card-premium rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/5 bg-space/65 backdrop-blur-md"
              >
                {/* Photo header */}
                <div className="relative w-full h-[200px] bg-deep/80 overflow-hidden group">
                  {!imageError ? (
                    <img
                      src={selectedPlace.photo}
                      alt={selectedPlace.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-space via-deep to-teampurple/20 text-mutedgray px-4 text-center">
                      <Camera className="w-8 h-8 text-teampurple/60 mb-2 animate-pulse" strokeWidth={1.5} />
                      <p className="font-mono text-xs">Foto a caminho...</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />
                </div>

                {/* Detail content */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] tracking-widest text-teamgreen uppercase">
                        #{String(selectedPlace.order).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white leading-snug">
                      {selectedPlace.title}
                    </h3>
                    {selectedPlace.location && (
                      <p className="font-mono text-[11px] text-mutedgray mt-0.5">
                        {selectedPlace.location}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-mutedgray font-body">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teampurple/70 shrink-0" strokeWidth={1.5} />
                      <span>{selectedPlace.city}{selectedPlace.neighborhood ? `, ${selectedPlace.neighborhood}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-teamgreen/70 shrink-0" strokeWidth={1.5} />
                      <span>{selectedPlace.date}</span>
                    </div>
                  </div>

                  {selectedPlace.description && (
                    <div className="flex gap-2 text-sm text-white/70 font-body leading-relaxed border-t border-white/5 pt-4">
                      <BookOpen className="w-4 h-4 text-teampurple/50 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <p>{selectedPlace.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-premium rounded-2xl p-8 text-center flex flex-col items-center gap-4"
              >
                <MapPin className="w-8 h-8 text-teampurple/40" strokeWidth={1.5} />
                <p className="font-mono text-xs text-mutedgray">
                  Clique em um marcador para ver os detalhes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
