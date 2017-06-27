import webpack from 'webpack';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import baseConfig from './config.base';

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
  ],

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(
      'require("source-map-support").install(); global.dynamicRequire = require;',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env.IS_BUNDLED': JSON.stringify('on'),
      'process.env.APP_ENV': JSON.stringify('server'),
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/long/**/*' },
      { from: 'node_modules/zmq/**/*' },
      { from: 'node_modules/bindings/**/*' },
      { from: 'node_modules/zmq/**/*', context: 'node_modules/common' }, // for dev (with run hello)
      { from: 'node_modules/bindings/**/*', context: 'node_modules/common' }, // for dev (with run hello)
      { from: 'node_modules/common/protobuf/proto/**/*' },
    ]),
  ],

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

});
