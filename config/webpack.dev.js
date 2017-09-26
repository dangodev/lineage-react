const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'src'),
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app-root',
      inlineManifestWebpackName: 'webpackManifest',
      template: require('html-webpack-template'),
      title: 'But First, ☕!',
    }),
  ],
});
