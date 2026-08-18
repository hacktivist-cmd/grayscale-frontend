/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#130C25',
          darkPurple: '#0A0614',
          lightPurple: '#1F1439',
          cardBg: '#1A1130',
          accent: '#F15A24',
          accentHover: '#D94B18',
          border: '#2E224A',
          grayBg: '#F3F4F6',
          muted: '#A197B8'
        }
      }
    }
  },
  plugins: []
}
