import { join } from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './config.base';

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './main.development'],

  output: {
    path: join(__dirname, '..'),
    filename: './main.js',
  },
  externals: [
    'source-map-support',
    'electron-debug',
    'hiredis',
  ],

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env.IS_BUNDLED': JSON.stringify('on'),
      'process.env.APP_ENV': JSON.stringify('main'),
    }),
  ],

  resolve: {
    packageMains: ['webpack', 'main'],
  },

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false,
  },
});
