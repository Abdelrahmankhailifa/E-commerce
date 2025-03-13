/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenGray: "#859F3D", // Custom green
        greenGrayDarker: "#31511E",
      },
    },
  },
  plugins: [],
};
