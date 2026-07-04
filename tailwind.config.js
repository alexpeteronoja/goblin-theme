/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ald: {
          green: '#1a3c34',
          cream: '#f4f4f0',
          black: '#111111',
          gray: '#888888',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
