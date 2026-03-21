import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fade: {
          navy: "#050E20",
          accent: "#5BC9F5",
          canvas: "#F4F7FB",
          muted: "#5B6578",
          pill: "#79D7FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-pangolin)", "cursive", "var(--font-inter)", "sans-serif"],
        name: ["var(--font-pangolin)", "cursive", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
