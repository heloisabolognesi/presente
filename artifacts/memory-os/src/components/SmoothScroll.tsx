import { useEffect } from "react";

export default function SmoothScroll({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      (window as any).__lenis = null;
    };
  }, [active]);

  return null;
}
