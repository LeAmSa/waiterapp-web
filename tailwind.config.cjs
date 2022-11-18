/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      red: {
        light: "#FFABAD",
        DEFAULT: "#D73035",
        dark: "#8A1114",
      },
      gray: {
        0: "#FFFFFF",
        100: "#F2F2F2",
        200: "#CCCCCC",
        300: "#999999",
        400: "#666666",
        500: "#333333",
      },
      black: {
        DEFAULT: "#000000",
      },
    },
  },
  plugins: [],
};
