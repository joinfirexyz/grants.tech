/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Manrope: ["Manrope"],
      ClashDisplay: ["ClashDisplay"],
    },
    extend: {
      colors: {
        plum: "#312E45",
        lavender: "#E1CFFF",
        grey: "#F5F5F5",
        purple: "#9A86E5"
      },
    },
  },
  plugins: [],
};
