const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    main: './main.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'shopify-buy',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpg|jpeg|png|svg|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
