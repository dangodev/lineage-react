const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    main: ['./main.js'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'shopify-buy'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === 'development' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ejs$/i,
        use: 'ejs-loader',
      },
      {
        test: /\.tsx?$/i,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist', 'assets'),
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
