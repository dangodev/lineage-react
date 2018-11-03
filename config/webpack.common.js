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
    main: ['./main.tsx'],
    vendor: ['react', 'react-dom', 'shopify-buy'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/i,
        use: 'awesome-typescript-loader',
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
    alias: {
      ...LOCAL_FOLDERS,
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
};
