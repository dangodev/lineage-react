const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');
const mockData = require('../src/data/mockData');

module.exports = merge.smart(common, {
  mode: 'development',
  entry: {
    styles: ['./shopify-assets/styles.css', './shopify-assets/fonts.css'],
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.(gif|jpe?g|mp4|png|svg|woff2?)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: '../src/index.ejs',
      title: 'But First, ☕!',
      appMountId: 'app-root',
      mockData,
    }),
  ],
});
