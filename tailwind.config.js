/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ,
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'right': '4px 0 6px -1px rgba(0, 0, 0, 0.1)', // Adjust the values as needed
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // Adjust the values as needed
      },
      colors:{
        "primary": "#151529",
        "secondary":'#4c95d7'
        
      }
    },
  },
  plugins: [],
};
