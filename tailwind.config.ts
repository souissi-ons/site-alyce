/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#5E2E34",
          DEFAULT: "#72373D",
          light: "#FFD9DE",
        },
        secondary: {
          DEFAULT: "#FFC9D2",
          light: "#FFE5E9",
        },
        accent: {
          DEFAULT: "#FD8EC6",
          dark: "#E86FA9",
        },
        neutral: {
          light: "#F9F5F6",
          DEFAULT: "#E0A2A9",
          dark: "#3D2B2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(94, 46, 52, 0.1)",
        hover: "0 8px 30px rgba(94, 46, 52, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
};
