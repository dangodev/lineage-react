const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

const mockData = require('../src/data/mockData');

module.exports = merge.smart(common, {
  mode: 'development',
  entry: {
    styles: ['./shopify-assets/styles.css', './shopify-assets/fonts.css'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    host: process.env.MANIFOLD_DASHBOARD_URL || '0.0.0.0',
    port: 8080,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|jpe?g|mp4|png|svg|woff2?)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CheckerPlugin(), // surface TS errors in dev
    new HtmlWebpackPlugin({
      inject: false,
      template: '../src/index.ejs',
      title: 'But First, ☕!',
      appMountId: 'app-root',
      mockData,
    }),
    new MiniCssExtractPlugin('[name].css'),
  ],
});
