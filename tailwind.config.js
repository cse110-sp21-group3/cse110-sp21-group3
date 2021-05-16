const enablePurge = process.env.NODE_ENV === "production" ? true : false;
module.exports = {
  purge: {
    enabled: enablePurge,
    content: ["source/public/**/*.html", "source/src/**/*.html"] // TODO: Add *.js extensions
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
