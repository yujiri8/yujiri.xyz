const config = (env, argv) => ({
  mode: (!env || !env.dev)? 'production' : 'development',
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
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  }
});

module.exports = config;
