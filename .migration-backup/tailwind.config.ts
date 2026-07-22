import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: "#050508", // Black
        space: "#0a0c14", // Dark base
        teamgreen: "#22C55E", // Green robotics
        teampurple: "#8B5CF6", // Purple robotics
        mutedgray: "#9CA3AF",
        warmwhite: "#F5F5F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        hand: ["var(--font-hand)", "cursive"]
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        twinkle: {
          "0%,100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" }
        },
        "pulse-border": {
          "0%,100%": { borderColor: "rgba(139,92,246,0.15)" },
          "50%": { borderColor: "rgba(34,197,94,0.4)" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        blink: "blink 1s step-end infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "pulse-border": "pulse-border 2.5s ease-in-out infinite",
        scan: "scan 8s linear infinite"
      }
    }
  },
  plugins: []
};
export default config;
