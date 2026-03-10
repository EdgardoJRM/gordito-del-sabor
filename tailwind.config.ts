import type { Config } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        montserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
        lora: ['var(--font-lora)'],
      },
    },
  },
  plugins: [],
};

export default config;
