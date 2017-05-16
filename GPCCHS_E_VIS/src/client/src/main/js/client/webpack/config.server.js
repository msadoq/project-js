import { join } from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './config.base';

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', '../../../../../server/src/main/js/server/index'],

  output: {
    path: join(__dirname, '..'),
    filename: './server.js',
  },
  externals: [
    'source-map-support',
    'package.json',
    'zmq',
    'bindings',
  ],

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'), // import for bundled libs as React https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
        IS_BUNDLED: JSON.stringify('on'),
      },
    }),
  ],

  target: 'node',

  node: {
    __dirname: true,
  },

});