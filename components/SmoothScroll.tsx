"use client";

import { useEffect } from "react";

/**
 * Ativa o smooth scroll (Lenis) apenas depois que o site é desbloqueado,
 * para não interferir nas transições de tela cheia do boot/auth.
 */
export default function SmoothScroll({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    let lenis: any;
    let rafId: number;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      (window as any).__lenis = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      (window as any).__lenis = null;
    };
  }, [active]);

  return null;
}
