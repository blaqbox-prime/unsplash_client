/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // Enables dark mode using a class
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'], // Specify the paths for your files
  theme: {
    extend: {
      colors: {
        primary: '#121826',
        secondary: '#6C727F',
        light: '#E5E7EB',
        white: '#FFFFFF',
        fadedSecondary: '#6C727F',
        fadedLight: '#E5E7EBCC',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],

}