/* eslint max-len: 0 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

require('./lib/common/dotenv');

const port = process.env.PORT || 3000;

export default merge(baseConfig, {
  debug: true,

  devtool: 'eval-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './lib/windowProcess/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: "eslint",
      exclude: [/src\/common/, /node_modules/]
    }],
    loaders: [{
      test: /.+\.(svg|eot|ttf|woff|woff2)/,
      loader: 'file?name=dist/fonts/[name].[ext]'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  target: 'electron-renderer'
});
