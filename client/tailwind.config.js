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
    daisyui:{
      themes: ["cupcake"]},
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin'),
    require('daisyui')
  ],
};