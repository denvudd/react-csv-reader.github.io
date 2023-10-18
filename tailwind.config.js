/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0.75rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {},
  },
  plugins: [],
};
