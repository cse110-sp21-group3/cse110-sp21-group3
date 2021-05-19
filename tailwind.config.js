const enablePurge = process.env.NODE_ENV === 'production';
module.exports = {
  purge: {
    enabled: enablePurge,
    content: ["source/public/**/*.html", "source/src/**/*.html", "source/src/**/*.js"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-gray' : "#e5e5e5"
      },
      fontFamily: {
        'sans' : ['Nunito', `sans-serif`],
      },
      screens: {
        'mobile' : '450px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// 