import { get } from 'common/parameters';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './config.base';

const port = get('WEBPACK_PORT');

export default merge(baseConfig, {
  devtool: 'eval-source-map',

  entry: [
    './lib/windowProcess/style/bootstrap',
    '!style!css!postcss!./lib/windowProcess/style',
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
      loader: 'eslint',
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
    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify('renderer'),
      }
    }),
  ],

  target: 'electron-renderer'
});
