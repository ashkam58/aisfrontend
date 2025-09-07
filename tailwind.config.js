/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cartoonYellow: '#FFE066',
        cartoonBlue: '#5BC0EB',
        cartoonPink: '#FDE2E4',
        cartoonGreen: '#9BC53D',
        cartoonPurple: '#B088F9',
      },
      borderRadius: {
        cartoon: '2rem',
      },
      fontFamily: {
        cartoon: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ],
      },
      backgroundImage: {
        cartoonClouds: "url('/assets/cartoon-clouds-bg.svg')",
      },
    },
  },
  plugins: [],
};
