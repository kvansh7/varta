// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure you include all relevant file types
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#2C2B30',
        secondaryBg: '#4F4F51',
        lightText: '#D6D6D6',
        accent: '#F2C4CE',
        buttonColor: '#F58F7C',
      },
    },
  },
  plugins: [],
}
