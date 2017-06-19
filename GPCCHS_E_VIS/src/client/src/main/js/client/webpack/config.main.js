import webpack from 'webpack';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import baseConfig from './config.base';

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './main.development'],

  output: {
    filename: './main.js',
  },
  externals: [
    'source-map-support',
    'electron-debug',
    'hiredis',
    // 'fakeredis',
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
    new CopyWebpackPlugin([
      { from: 'package.json' },
      { from: 'config.default.json' },
      { from: 'config.required.json' },
      { from: 'node_modules/source-map/**/*' },
      { from: 'node_modules/source-map-support/**/*' },
    ]),
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
