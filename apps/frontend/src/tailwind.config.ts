// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,css,scss}',
    './components/**/*.{js,ts,jsx,tsx,css,scss}',
    './app/**/*.{js,ts,jsx,tsx,css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          dark: {
            DEFAULT: '#141414',
            light: '#222222',
            text: '#E5E5E5',
            border: '#333333',
            secondary: '#A0A0A0',
          },
          light: {
            DEFAULT: '#F8F8F8',
            dark: '#FFFFFF',
            text: '#222222',
            border: '#CCCCCC',
            secondary: '#666666',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-scale': 'fade-in-scale 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
