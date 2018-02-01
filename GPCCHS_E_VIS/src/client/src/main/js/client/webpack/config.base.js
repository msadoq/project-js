// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5317 : 09/02/2017 : packaging dedupe dependencies and refactor for lodash
// VERSION : 1.1.2 : FA : #5316 : 10/02/2017 : Lint webpack/config.base.js (indentation) . .
// VERSION : 1.1.2 : FA : #6721 : 19/05/2017 : Fix hss crash when build
// VERSION : 1.1.2 : FA : #6721 : 19/05/2017 : Fix several warnings when build
// VERSION : 1.1.2 : FA : #6721 : 22/05/2017 : Fix several warnings when build
// VERSION : 1.1.2 : FA : #6721 : 22/05/2017 : Fix hss crash when build
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : All built files is now in a dist/ folder
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import path from 'path';
import webpack from 'webpack';

export default {
  module: {
    exprContextCritical: false,
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'].map(require.resolve),
        include: /node_modules\/common/,
        exclude: /node_modules\/common\/node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'].map(require.resolve),
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.less$/,
        loader: 'style!css!less',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.less', '.css'],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment\/locale$/, new RegExp('fr.js')),
    new webpack.BannerPlugin(
      'global.dynamicRequire = require;',
      { raw: true, entryOnly: false }
    ),
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ],
};
