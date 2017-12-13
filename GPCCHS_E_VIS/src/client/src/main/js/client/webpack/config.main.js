// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5317 : 09/02/2017 : packaging dedupe dependencies and refactor for lodash
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix View components should not re-mount after open editor
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Add hiredis in externals (webpack/config.main)
// VERSION : 1.1.2 : FA : #6721 : 19/05/2017 : Fix several warnings when build
// VERSION : 1.1.2 : FA : #6721 : 22/05/2017 : Fix several warnings when build
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : All built files is now in a dist/ folder
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// END-HISTORY
// ====================================================================

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
