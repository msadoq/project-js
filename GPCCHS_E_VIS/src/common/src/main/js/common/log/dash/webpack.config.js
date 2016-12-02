// const path = require('path');
// const webpack = require('webpack');
// eslint-disable-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.port || 8889;

const config = {
  entry: ['./src/client'],

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: 'dist',
  },

  module: {
    loaders: [{
      test: /.js/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
    }),
  ],
  progress: true,
  devtool: 'source-map',
};

if (process.env.NODE_ENV !== 'production') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:'.concat(port),
    'webpack/hot/dev-server',
  ].concat(config.entry);
}

module.exports = config;
