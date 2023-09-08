const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
});

