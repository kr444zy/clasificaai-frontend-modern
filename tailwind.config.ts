import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1400px" }
      },
      colors: {
        border: "hsl(214 22% 90%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 3.9%)",
        "bg-dark": "hsl(240 10% 3.9%)",
        "fg-dark": "hsl(0 0% 98%)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,.15)"
      }
    },
  },
  plugins: [],
} satisfies Config;
