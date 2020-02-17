const config = (env, argv) => ({
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  ...env && env.dev && {devtool: 'source-map'},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
});

module.exports = config;

// TODO configure eslint.
