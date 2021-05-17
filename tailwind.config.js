const enablePurge = process.env.NODE_ENV === 'production';
module.exports = {
  purge: {
    enabled: enablePurge,
    content: ["source/public/**/*.html", "source/src/**/*.html", "source/src/**/*.js"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
