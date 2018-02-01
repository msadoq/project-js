// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Now transpile server with babel to allow ES6 module usage and store module loading in server process.
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Fix .proto loading in server.js bundle
// VERSION : 1.1.2 : DM : #5828 : 18/05/2017 : Fix npm run hello command
// VERSION : 1.1.2 : FA : #6721 : 19/05/2017 : Fix server warning when build
// VERSION : 1.1.2 : FA : #6721 : 22/05/2017 : Fix server warning when build
// VERSION : 1.1.2 : DM : #5828 : 22/05/2017 : Move server from server/ sub-component to client/lib/serverProcess
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix proto register for packaging
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Update poms due to removing server package
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : All built files is now in a dist/ folder
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Repair local build . .
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Fix dynamic require in packaging production mode
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Add hiredis to webpack server config externals
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Fix packaging (missing common) .
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Packaging : copy adapters in dist
// END-HISTORY
// ====================================================================

import fs from 'fs';
import { gracefulify } from 'graceful-fs';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import baseConfig from './config.base';

gracefulify(fs); // workaround to this error : "EMFILE: too many open files" or "ENFILE: file table overflow"

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './lib/serverProcess/index'],

  output: {
    filename: './server.js',
  },
  externals: [
    'source-map-support',
    'memcpy',
    'zmq',
    'bindings',
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
      'process.env.APP_ENV': JSON.stringify('server'),
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/rtd/**/*' },
      { from: 'node_modules/long/**/*' },
      { from: 'node_modules/zmq/**/*' },
      { from: 'node_modules/bindings/**/*' },
      { from: 'node_modules/zmq/**/*', context: 'node_modules/common' }, // for dev (with run hello)
      { from: 'node_modules/bindings/**/*', context: 'node_modules/common' }, // for dev (with run hello)
      { from: 'node_modules/common/**/*' },
      { from: 'adapters/**/*' },
    ]),
  ],

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

});
