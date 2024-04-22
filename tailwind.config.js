/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./newtab/**/*.tsx",
    "./options/**/*.tsx",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]
  },
  theme: {
    fontFamily: {
      "serif-eng": ["Sedan", "serif"],
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}

