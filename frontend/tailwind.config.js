/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#151719',
      },
    },
  },
  plugins: [],
  // important: true
};