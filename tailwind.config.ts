import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#72373D",
        primaryLight: "#FFD9DE",
        secondary: "#FFC9D2",
        tertiary: "#E0A2A9",
        accent: "#FD8EC6",
        secondaryLight: "#FFCAD2",
        tertiaryLight: "#FFB1BA",
        highlight: "#FFFF4F6",
      },
    },
  },
  plugins: [],
};
export default config;
