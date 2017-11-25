const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    main: ['./main.js'],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'glamorous',
      'shopify-buy',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ejs$/i,
        use: 'ejs-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'assets'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({      // helps make vendor bundle more cacheable-r
      name: 'runtime',                             // -> https://webpack.js.org/guides/caching/
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
  },
};
