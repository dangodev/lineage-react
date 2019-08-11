const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        use: {
          loader: 'url-loader',
          options: { limit: Infinity },
        },
      },
      {
        test: /\.mp4$/i,
        use: 'file-loader',
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: 'https://cdn.shopify.com/s/files/1/0746/4367/t/8/assets/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../layout/theme.liquid',
      template: '../src/index.ejs',
      appMountId: 'app-root',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../templates/404.liquid',
      template: '../src/index.ejs',
      appMountId: 'app-root',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: 'fonts.css' }),
    new CopyWebpackPlugin([
      // copy /public dir
      { from: '../src/shopify-assets', to: './' },
      { from: '../src/shopify-config', to: '../config' },
      { from: '../src/shopify-snippets', to: '../snippets' },
      { from: '../src/shopify-templates', to: '../templates' },
    ]),
  ],
});
