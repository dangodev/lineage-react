const { readdirSync } = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '..', 'src');
const LOCAL_FOLDERS = readdirSync(SRC_DIR).reduce((obj, ref) => {
  const alias = ref.indexOf('.') > 0 ? ref.split('.')[0] : ref;
  obj[alias] = path.resolve(__dirname, '..', 'src', ref);
  return obj;
}, {});

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    main: ['./main.js'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'shopify-buy'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ejs$/i,
        use: 'ejs-loader',
      },
    ],
  },
  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist', 'assets'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      ...LOCAL_FOLDERS,
    },
  },
};
