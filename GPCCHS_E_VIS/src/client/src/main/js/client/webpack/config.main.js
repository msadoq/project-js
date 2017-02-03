import { join } from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './config.base';

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './main.development'],

  output: {
    path: join(__dirname, '..'),
    filename: './main.js'
  },
  externals: [
    'source-map-support',
    'common',
    'package.json',
  ],

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // }),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        IS_BUNDLED: JSON.stringify('on'),
      }
    }),
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  }
});
