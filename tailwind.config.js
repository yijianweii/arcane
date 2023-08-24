/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 用到tailwind的地方
  ],
  darkMode: "class", 
  theme: {
    extend: {},
  },
  plugins: [],
}