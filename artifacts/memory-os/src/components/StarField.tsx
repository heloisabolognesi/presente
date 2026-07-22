import { useEffect, useRef } from "react";

export default function StarField({ density = 90 }: { density?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    for (let i = 0; i < density; i++) {
      const star = document.createElement("span");
      const size = Math.random() * 1.6 + 0.5;
      star.style.position = "absolute";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.borderRadius = "9999px";

      const rng = Math.random();
      if (rng > 0.90) {
        star.style.background = "#22C55E";
      } else if (rng > 0.80) {
        star.style.background = "#8B5CF6";
      } else {
        star.style.background = "#FFFFFF";
      }

      star.style.opacity = `${Math.random() * 0.5 + 0.15}`;
      star.style.animation = `twinkle ${3 + Math.random() * 5}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      ref.current.appendChild(star);
    }

    const container = ref.current;
    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.4) return;

      const shoot = document.createElement("span");
      shoot.style.position = "absolute";
      shoot.style.top = `${Math.random() * 50}%`;
      shoot.style.left = `${Math.random() * 70}%`;
      shoot.style.width = "1px";
      shoot.style.height = "1px";
      shoot.style.borderRadius = "9999px";
      shoot.style.background = "#FFFFFF";
      shoot.style.boxShadow = "0 0 4px 1px rgba(139,92,246,0.3)";
      shoot.style.opacity = "0";
      shoot.style.transform = "rotate(-35deg)";
      shoot.style.transition = "none";

      container.appendChild(shoot);

      requestAnimationFrame(() => {
        shoot.style.transition = "all 0.8s ease-out";
        shoot.style.opacity = "0.7";
        shoot.style.width = "60px";
        shoot.style.transform = "rotate(-35deg) translateX(120px)";
        shoot.style.background = "linear-gradient(90deg, rgba(34,197,94,0.6), rgba(139,92,246,0.3), transparent)";
      });

      setTimeout(() => {
        shoot.style.opacity = "0";
        setTimeout(() => shoot.remove(), 500);
      }, 800);
    }, 4000);

    return () => {
      clearInterval(shootingInterval);
    };
  }, [density]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
