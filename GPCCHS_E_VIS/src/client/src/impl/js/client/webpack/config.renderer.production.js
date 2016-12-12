import { join } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './config.base';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    './lib/windowProcess/style/bootstrap',
    '!style!css!postcss!./lib/windowProcess/style',
    'babel-polyfill',
    './lib/windowProcess/index'
  ],

  output: {
    path: join(__dirname, '../dist'),
    publicPath: 'dist/',
  },

  externals: {
    common: 'common',
  },

  module: {
    loaders: [{
      test: [/.+\.svg/, /.+\.eot/, /.+\.ttf/, /.+\.woff/, /.+\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        IS_BUNDLED: JSON.stringify('on'),
        APP_ENV: JSON.stringify('renderer'),
      }
    }),
  ],

  target: 'electron-renderer'
});

export default config;
