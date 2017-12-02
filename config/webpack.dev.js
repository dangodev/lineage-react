const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

const mockData = require('../src/data/mockData');

module.exports = merge.smart(common, {
  devServer: {
    historyApiFallback: true,
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: '../src/index.ejs',
      title: 'But First, ☕!',
      appMountId: 'app-root',
      mockData,
    }),
    new BundleAnalyzerPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
});
