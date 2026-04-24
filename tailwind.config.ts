import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{json,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        ink: "#1A1A1A",
        ocean: {
          DEFAULT: "#0F4C5C",
          deep: "#0A3A47",
          soft: "#1B4B5A"
        },
        coral: {
          DEFAULT: "#E76F51",
          soft: "#ED8973"
        },
        kelp: {
          DEFAULT: "#5A7A5B",
          soft: "#8FA886"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 76, 92, 0.04), 0 8px 24px rgba(15, 76, 92, 0.06)",
        lift: "0 4px 8px rgba(15, 76, 92, 0.08), 0 16px 32px rgba(15, 76, 92, 0.1)"
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 1px 1px, rgba(15,76,92,0.04) 1px, transparent 0)"
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
