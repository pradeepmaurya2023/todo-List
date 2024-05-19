/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        balooBhaijaan : ["Baloo Bhaijaan 2", "sans-serif"]
      }
    },
  },
  plugins: [],
}