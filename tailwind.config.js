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
        'xs': '375px',
        'sm': '440px',
        'md': '768px',
        'lg': '1024px',
        'lg-max': { max: "1024px" },
        'xl': '1366px',
        '2xl': '1536px',
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

