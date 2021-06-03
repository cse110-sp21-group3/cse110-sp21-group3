module.exports = {
  mode: 'production',
  entry: './source/src/database.js',
  output: {
    filename: 'depBundle.js',
    library: {
      type: 'module',
    },
    path: `${__dirname}/source/src/dist`,
  },
  experiments: {
    outputModule: true,
  },
};
