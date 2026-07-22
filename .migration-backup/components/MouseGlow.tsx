"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0;
    let targetX = 0, targetY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate(${x - 240}px, ${y - 240}px)`;
      }
      if (ref2.current) {
        const x2 = x + (targetX - x) * 0.3;
        const y2 = y + (targetY - y) * 0.3;
        ref2.current.style.transform = `translate(${x2 - 120}px, ${y2 - 120}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    const rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="pointer-events-none fixed top-0 left-0 w-[480px] h-[480px] rounded-full z-0 hidden sm:block"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, rgba(139,92,246,0.035) 45%, transparent 70%)",
          willChange: "transform"
        }}
        aria-hidden="true"
      />
      <div
        ref={ref2}
        className="pointer-events-none fixed top-0 left-0 w-[240px] h-[240px] rounded-full z-0 hidden sm:block"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(34,197,94,0.03) 50%, transparent 70%)",
          willChange: "transform"
        }}
        aria-hidden="true"
      />
    </>
  );
}
