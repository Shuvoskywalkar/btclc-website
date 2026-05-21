import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-noto-serif-bengali)", "Noto Serif Bengali", "Playfair Display", "serif"],
      },
      colors: {
        "tea-green": {
          DEFAULT: "#556B2F",
          light: "#6B8139",
          dark: "#3F5022",
        },
        gold: {
          DEFAULT: "#C8A96B",
          light: "#D4BA82",
        },
        charcoal: {
          DEFAULT: "#1F1F1F",
          light: "#3A3A3A",
        },
        cream: {
          DEFAULT: "#F8F4EC",
          dark: "#F0EBE0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
