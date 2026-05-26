import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0B1B33",
        brand: {
          DEFAULT: "#1B3E6F",
          50: "#EEF3FA",
          100: "#D7E2F1",
          200: "#AFC5E3",
          300: "#86A8D4",
          400: "#5E8BC6",
          500: "#3A6EB0",
          600: "#1B3E6F",
          700: "#163358",
          800: "#102544",
          900: "#0A1830",
        },
        clinic: {
          red: "#C0392B",
          "red-hover": "#A93226",
        },
        ink: {
          DEFAULT: "#0B1B33",
          muted: "#5B6B82",
          subtle: "#8A97AB",
        },
        surface: {
          DEFAULT: "#F7F9FC",
          alt: "#EEF3FA",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(11, 27, 51, 0.12)",
        glow: "0 20px 60px -20px rgba(27, 62, 111, 0.35)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1B3E6F 0%, #163358 50%, #0A1830 100%)",
        "subtle-grid":
          "linear-gradient(rgba(27,62,111,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,62,111,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
