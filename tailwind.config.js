module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yummy: {
          font: "#a82727",
          bg: "#fd7463",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
