const webpack = require('webpack');
const path = require('path');

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

// Shared config

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-code-splitting',
      'styled-components',
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
    path: path.resolve(__dirname, 'dist', 'assets'),
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

// Production config

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].[chunkhash].js';
  config.plugins = [
    ...config.plugins,
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true,
    }),
  ];
}

// Dev config

else {
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  config.devServer = {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
  };

  config.plugins = [
    ...config.plugins,
    new HtmlWebpackPlugin({
      appMountId: 'app-root',
      inlineManifestWebpackName: 'webpackManifest',
      template: require('html-webpack-template'),
      title: 'But First, ☕!',
    }),
  ];
}

module.exports = config;
