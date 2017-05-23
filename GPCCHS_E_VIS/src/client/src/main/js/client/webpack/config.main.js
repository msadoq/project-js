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
    'package.json',
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
      'process.env': {
        NODE_ENV: JSON.stringify('production'), // import for bundled libs as React https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
        IS_BUNDLED: JSON.stringify('on'),
      },
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
