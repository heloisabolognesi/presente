import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "@/data/places";

interface MapComponentProps {
  places: Place[];
  onSelectPlace: (place: Place | null) => void;
  selectedPlace: Place | null;
}

export default function MapComponent({ places, onSelectPlace, selectedPlace }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(true);

  const createMarkerIcon = (isActive: boolean) => {
    return L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;inset:0;border-radius:50%;background:${isActive ? 'rgba(34,197,94,0.3)' : 'rgba(139,92,246,0.2)'};animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;transform:scale(1.5);"></div>
          <div style="width:14px;height:14px;border-radius:50%;border:2px solid white;background:${isActive ? '#22C55E' : '#8B5CF6'};box-shadow:0 0 8px ${isActive ? 'rgba(34,197,94,0.5)' : 'rgba(139,92,246,0.5)'};transition:all 0.4s;${isActive ? 'transform:scale(1.25);' : ''}">
            <div style="width:5px;height:5px;border-radius:50%;background:white;margin:auto;margin-top:2.5px;"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-23.5582, -46.6027],
      zoom: 12,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add markers
    const newMarkers: L.Marker[] = [];
    places.forEach((place, i) => {
      const isActive = i === 0;
      const marker = L.marker([place.lat, place.lng], {
        icon: createMarkerIcon(isActive)
      }).addTo(map);

      marker.on("click", () => {
        onSelectPlace(place);
        setCurrentStep(i);
      });

      newMarkers.push(marker);
    });
    markersRef.current = newMarkers;

    // Draw polyline between all points
    const coords: [number, number][] = places.map(p => [p.lat, p.lng]);
    const line = L.polyline(coords, {
      color: "#8B5CF6",
      weight: 2,
      opacity: 0.4,
      dashArray: "6,8"
    }).addTo(map);
    polylineRef.current = line;

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay animation
  useEffect(() => {
    if (!animationPlaying || !mapRef.current) return;
    let isSubscribed = true;

    const timer = setTimeout(() => {
      if (!isSubscribed) return;
      const nextStep = (currentStep + 1) % places.length;
      setCurrentStep(nextStep);
      onSelectPlace(places[nextStep]);
    }, 3500);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, [animationPlaying, currentStep, places, onSelectPlace]);

  // Sync map to selected place
  useEffect(() => {
    if (!mapRef.current || !selectedPlace) return;
    const map = mapRef.current;

    const coords: [number, number] = [selectedPlace.lat, selectedPlace.lng];
    map.flyTo(coords, 13, { animate: true, duration: 1.2 });

    markersRef.current.forEach((marker, i) => {
      const isCurrent = places[i].order === selectedPlace.order;
      marker.setIcon(createMarkerIcon(isCurrent));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace, places]);

  const handleRestart = () => {
    setCurrentStep(0);
    onSelectPlace(places[0]);
    setAnimationPlaying(true);
  };

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] rounded-2xl overflow-hidden border border-white/10 glow-team">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-space/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono tracking-wider text-white hover:bg-teampurple/20 hover:border-teampurple/50 transition-all duration-300 flex items-center gap-2 shadow-lg"
        >
          🔄 Reiniciar Jornada
        </button>
        <button
          onClick={() => setAnimationPlaying(!animationPlaying)}
          className={`px-4 py-2 bg-space/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-lg ${
            animationPlaying ? "hover:bg-amber-500/20 hover:border-amber-500/50" : "hover:bg-teamgreen/20 hover:border-teamgreen/50"
          }`}
        >
          {animationPlaying ? "⏸ Pausar Autoplay" : "▶ Iniciar Autoplay"}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-space/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg max-w-[280px]">
        <p className="text-[10px] font-mono tracking-widest text-teamgreen uppercase">Progresso</p>
        <h4 className="text-white text-xs font-medium font-display truncate mt-0.5">
          {currentStep + 1} de {places.length}: {places[currentStep]?.title}
        </h4>
      </div>
    </div>
  );
}
