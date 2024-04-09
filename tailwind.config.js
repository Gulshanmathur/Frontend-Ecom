/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "bungee_spice_regular": ["Bungee Spice","sans-serif"]
      },
    },
  },
  plugins: [ require('@tailwindcss/forms'),require('@tailwindcss/aspect-ratio')],
}