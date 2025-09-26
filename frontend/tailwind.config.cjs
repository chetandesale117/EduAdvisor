/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3AB0FF",
          DEFAULT: "#0081C9",
          dark: "#005B99",
        },
      },
    },
  },
  plugins: [],
};
