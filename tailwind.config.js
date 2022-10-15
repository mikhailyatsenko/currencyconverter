/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: "427px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
