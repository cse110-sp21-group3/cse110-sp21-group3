module.exports = {
  mode: 'production',
  entry: './source/database.js',
  output: {
    filename: 'depBundle.js',
    library: {
      type: 'module',
    },
    path: `${__dirname}/source/dist`,
  },
  experiments: {
    outputModule: true,
  },
};
