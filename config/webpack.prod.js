const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  output: {
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { url: false },
            },
          ],
        }),
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../layout/theme.ejs',
      template: `../src/index.ejs`,
      appMountId: 'app-root',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new ExtractTextPlugin({ filename: 'fonts.css' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {     // ¯\_(ツ)_/¯  https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),           // build hashes
    new ManifestPlugin(),                          // make manifest.json file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({      // helps make vendor bundle more cacheable-r
      name: 'runtime',                             // -> https://webpack.js.org/guides/caching/
    }),
    new NameAllModulesPlugin(),
    new CopyWebpackPlugin([                        // copy /public dir
      { from: '../src/shopify-assets', to: './' },
      { from: '../src/shopify-config', to: '../config' },
      { from: '../src/shopify-snippets', to: '../snippets' },
      { from: '../src/shopify-templates', to: '../templates' },
    ]),
  ],
});
