import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { timelineEvents } from "@/data/timeline";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    const cardWidth = el.firstElementChild?.clientWidth || 1;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, timelineEvents.length - 1));
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="relative py-28 bg-deep overflow-hidden">
      <div className="px-6">
        <SectionHeading
          eyebrow="Capítulo 01"
          title="Linha do Tempo"
          subtitle="Cada treino, cada risada, cada conquista — arraste para reviver, na ordem em que viraram nossa história."
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="px-6 mb-8 flex items-center gap-2 max-w-md mx-auto">
          {timelineEvents.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 rounded-full transition-all duration-500"
              style={{
                background: i <= activeIndex
                  ? "linear-gradient(90deg, #22C55E, #8B5CF6)"
                  : "rgba(255,255,255,0.06)"
              }}
            />
          ))}
        </div>

        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 sm:px-[calc((100%-380px)/2)] pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {timelineEvents.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className="snap-center shrink-0 w-[300px] sm:w-[340px] card-premium rounded-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] bg-space">
                <img
                  src={event.photo}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <span className="absolute top-3 left-3 font-mono text-[11px] tracking-widest text-warmwhite bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/[0.06]">
                  {String(i + 1).padStart(2, "0")} · {event.date}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-medium text-white mb-2">{event.title}</h3>
                <p className="text-mutedgray text-sm leading-relaxed">{event.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="hidden sm:flex justify-center gap-3 mt-4">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-teamgreen hover:border-teamgreen/40 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-teampurple hover:border-teampurple/40 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
