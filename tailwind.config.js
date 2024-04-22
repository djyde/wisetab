/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./newtab/**/*.tsx",
    "./options/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}

