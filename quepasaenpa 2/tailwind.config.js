/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CC0000',
        secondary: '#002868',
        accent: '#FFD700',
        'bg-main': '#FAFAF8',
        'bg-dark': '#111111',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        baskerville: ['Libre Baskerville', 'serif'],
        source: ['Source Serif 4', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
