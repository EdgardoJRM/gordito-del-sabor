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
      colors: {
        warm: {
          DEFAULT: '#FAF8F5',
          linen: '#F2EDE6',
          dark: '#1A1412',
        },
        earth: {
          DEFAULT: '#6B5B4E',
          light: '#9C8B80',
        },
        accent: {
          DEFAULT: '#C4472B',
          hover: '#A8381F',
        },
        border: {
          warm: '#E8E0D8',
          subtle: 'rgba(232, 224, 216, 0.65)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        media: 'var(--shadow-media)',
      },
    },
  },
  plugins: [],
};

export default config;
