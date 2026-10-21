/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#1A2235',
          border: '#2A3441',
        },
        brand: {
          blue: '#3B82F6',
          green: '#10B981',
          red: '#EF4444',
          yellow: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
