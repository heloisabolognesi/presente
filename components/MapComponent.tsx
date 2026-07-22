"use client";

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

  // State to track progress of the journey animation
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(true);

  // Custom icon creator
  const createMarkerIcon = (isActive: boolean) => {
    return L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute inset-0 rounded-full bg-teampurple/20 animate-ping scale-150 ${isActive ? 'bg-teamgreen/30' : ''}"></div>
          <div class="w-4 h-4 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all duration-500 ${
            isActive 
              ? 'bg-teamgreen scale-125 shadow-teamgreen/50' 
              : 'bg-teampurple hover:bg-teamgreen shadow-teampurple/50'
          }">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Start centered at São Paulo
    const map = L.map(mapContainerRef.current, {
      center: [-23.5582, -46.6027],
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });

    // Dark-mode premium tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
    }).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;

    // Create polyline to display path
    const polyline = L.polyline([], {
      color: "#8B5CF6", // teampurple
      weight: 3,
      opacity: 0.7,
      dashArray: "5, 10",
      lineCap: "round",
      lineJoin: "round"
    }).addTo(map);
    polylineRef.current = polyline;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Determine appropriate zoom level for coordinates
  const getZoomForPlace = (place: Place) => {
    if (place.city === "Presidente Epitácio") return 7;
    if (place.city === "Mogi das Cruzes") return 10;
    if (place.city === "Guarulhos") return 11;
    return 13;
  };

  // Interpolate points for smooth drawing animation
  const interpolatePoints = (p1: [number, number], p2: [number, number], steps = 20) => {
    const points: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const lat = p1[0] + (p2[0] - p1[0]) * (i / steps);
      const lng = p1[1] + (p2[1] - p1[1]) * (i / steps);
      points.push([lat, lng]);
    }
    return points;
  };

  // 2. Control the animation loop
  useEffect(() => {
    const map = mapRef.current;
    const polyline = polylineRef.current;
    if (!map || !polyline || !animationPlaying) return;

    let isSubscribed = true;
    let timer: NodeJS.Timeout;

    const animateJourney = async () => {
      // Clear previous elements
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      polyline.setLatLngs([]);

      for (let i = 0; i < places.length; i++) {
        if (!isSubscribed || !animationPlaying) break;

        const place = places[i];
        const coords: [number, number] = [place.lat, place.lng];

        // Draw line from previous place to current place
        if (i > 0) {
          const prevPlace = places[i - 1];
          const prevCoords: [number, number] = [prevPlace.lat, prevPlace.lng];
          const intermediate = interpolatePoints(prevCoords, coords, 15);

          // Animate line segment drawing
          for (let step = 0; step < intermediate.length; step++) {
            if (!isSubscribed || !animationPlaying) break;
            const currentLine = polyline.getLatLngs() as L.LatLng[];
            polyline.setLatLngs([...currentLine, L.latLng(intermediate[step])]);
            await new Promise(resolve => setTimeout(resolve, 35));
          }
        }

        if (!isSubscribed || !animationPlaying) break;

        // Pan/Fly to active pin
        const targetZoom = getZoomForPlace(place);
        map.flyTo(coords, targetZoom, {
          animate: true,
          duration: 1.5
        });

        // Add Marker
        const marker = L.marker(coords, {
          icon: createMarkerIcon(true)
        }).addTo(map);

        // Click handler to select place
        marker.on("click", () => {
          onSelectPlace(place);
          setAnimationPlaying(false);
          // Highlight clicked marker
          markersRef.current.forEach((m, idx) => {
            m.setIcon(createMarkerIcon(places[idx].order === place.order));
          });
        });

        markersRef.current.push(marker);
        onSelectPlace(place);
        setCurrentStep(i);

        // Reset previous marker color to inactive standard purple
        if (i > 0) {
          markersRef.current[i - 1].setIcon(createMarkerIcon(false));
        }

        // Wait at each destination before proceeding
        await new Promise(resolve => {
          timer = setTimeout(resolve, 3200);
        });
      }
    };

    animateJourney();

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, [animationPlaying]);

  // 3. Handle selection from external UI (sync back to map markers)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (selectedPlace) {
      const coords: [number, number] = [selectedPlace.lat, selectedPlace.lng];
      const targetZoom = getZoomForPlace(selectedPlace);
      
      map.flyTo(coords, targetZoom, {
        animate: true,
        duration: 1.2
      });

      // Update all marker icons to highlight the selected one
      markersRef.current.forEach((marker, i) => {
        const isCurrent = places[i].order === selectedPlace.order;
        marker.setIcon(createMarkerIcon(isCurrent));
      });
    }
  }, [selectedPlace, places]);

  const handleRestart = () => {
    setCurrentStep(0);
    onSelectPlace(places[0]);
    setAnimationPlaying(true);
  };

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] rounded-2xl overflow-hidden border border-white/10 glow-team">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Control overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-space/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono tracking-wider text-white hover:bg-teampurple/20 hover:border-teampurple/50 transition-all duration-300 flex items-center gap-2 shadow-lg"
        >
          🔄 Reiniciar Jornada
        </button>

        <button
          onClick={() => setAnimationPlaying(!animationPlaying)}
          className={`px-4 py-2 bg-space/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono tracking-wider text-white transition-all duration-300 flex items-center gap-2 shadow-lg ${
            animationPlaying ? 'hover:bg-amber-500/20 hover:border-amber-500/50' : 'hover:bg-teamgreen/20 hover:border-teamgreen/50'
          }`}
        >
          {animationPlaying ? "⏸ Pausar Autoplay" : "▶ Iniciar Autoplay"}
        </button>
      </div>

      {/* Dynamic current pin tracker indicator */}
      <div className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-space/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg max-w-[280px]">
        <p className="text-[10px] font-mono tracking-widest text-teamgreen uppercase">Progresso</p>
        <h4 className="text-white text-xs font-medium font-display truncate mt-0.5">
          {currentStep + 1} de {places.length}: {places[currentStep]?.title}
        </h4>
      </div>
    </div>
  );
}
