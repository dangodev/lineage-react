const path = require('path');
const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

const mockData = require('../src/data/mockData');

module.exports = merge.smart(common, {
  mode: 'development',
  serve: {
    host: process.env.MANIFOLD_DASHBOARD_URL || '0.0.0.0',
    port: 8080,
    content: [path.resolve(__dirname, '..', 'src')],
    dev: { publicPath: '/' },
    add: app => {
      app.use(convert(history({})));
    },
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
      files: {
        css: ['./assets/styles.css', './assets/fonts/fonts.css'],
      },
      mockData,
    }),
    new ExtractTextPlugin('[name].css'),
  ],
});
