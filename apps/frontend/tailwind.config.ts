// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode based on the 'dark' class
  theme: {
    extend: {
      colors: {
        // Custom Netflix-like color palette
        netflix: {
          red: '#E50914', // Netflix iconic red
          'red-darker': '#8A0B12', // For disabled button
          'red-secondary': '#B81D24', // For "Create one" link
          dark: {
            DEFAULT: '#141414', // Main dark background (very dark gray)
            light: '#222222',  // Slightly lighter dark for cards/elements
            text: '#E5E5E5',   // Light text on dark background
            border: '#333333', // Dark border for subtle separation
            secondary: '#A0A0A0', // Secondary text/icons on dark
          },
          light: {
            DEFAULT: '#F8F8F8', // Main light background (off-white)
            dark: '#FFFFFF',   // Slightly darker light for cards/elements (pure white)
            text: '#222222',   // Dark text on light background
            border: '#CCCCCC', // Light border for subtle separation
            secondary: '#666666', // Secondary text/icons on light
          },
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Add the plugin here
  ],
};

export default config;
