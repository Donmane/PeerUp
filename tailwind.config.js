/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brand:{
          bg: '#1a1612',
          card: '#242018',
          amber: '#f59e0b',
          orange: '#ea580c',
          text: '#faf7f2',
          muted: '#a89f94',
          error: '#ef4444',
        }
      }

    },
  },
  plugins: [],
}