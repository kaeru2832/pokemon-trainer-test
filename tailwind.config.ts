import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pokered: "#CC0000",
        pokegold: "#B8A038",
        pokebg: "#F8F4EC",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
