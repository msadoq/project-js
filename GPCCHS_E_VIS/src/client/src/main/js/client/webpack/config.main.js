import noop from 'lodash/noop';
import { join } from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './config.base';

const { BUNDLE_STATS } = process.env;
const analyzer = new BundleAnalyzerPlugin({
  analyzerPort: process.env.ANALYZER_PORT || 8888,
  openAnalyzer: false,
});

if (BUNDLE_STATS) {
  console.info('building and analyzing main bundle...'); // eslint-disable-line no-console
}

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
    BUNDLE_STATS ? analyzer : noop,
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
