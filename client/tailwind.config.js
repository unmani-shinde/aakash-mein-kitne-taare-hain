/** @type {import('tailwindcss').Config} */
const { default: daisyui } = require('daisyui');
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),],
  theme: {
    extend: {},
   
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};