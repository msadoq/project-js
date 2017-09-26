// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5317 : 09/02/2017 : packaging dedupe dependencies and refactor for lodash
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Fix css bug on production bundle
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Fix production webpack build errors
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Loading for code editor .
// VERSION : 1.1.2 : FA : #6721 : 19/05/2017 : Fix renderer warning when build
// VERSION : 1.1.2 : FA : #6721 : 22/05/2017 : Fix renderer warning when build
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : All built files is now in a dist/ folder
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// VERSION : 1.1.2 : FA : #6993 : 21/06/2017 : Fix packaging : Copy external htmlhint when build renderer
// END-HISTORY
// ====================================================================

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import postCssImport from 'postcss-smart-import';
import postCssUrl from 'postcss-url';
import postCssProperties from 'postcss-custom-properties';
import postCssNesting from 'postcss-nested';
import postCssReporter from 'postcss-reporter';
import postCssBrowserReporter from 'postcss-browser-reporter';

import baseConfig from './config.base';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: {
    renderer: [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './lib/windowProcess/index',
    ],
    codeEditor: [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './lib/codeEditorProcess/index',
    ],
  },

  stats: {
    children: false,
  },

  output: {
    filename: '[name].bundle.js',
    // pathinfo: true,
  },

  externals: [
    'why-did-you-update',
    'htmlhint',
  ],

  module: {
    loaders: [
      {
        test: [/.+\.svg/, /.+\.eot/, /.+\.ttf/, /.+\.woff/, /.+\.woff2/],
        loader: 'file?name=fonts/[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.IS_BUNDLED': JSON.stringify('on'),
      'process.env.APP_ENV': JSON.stringify('renderer'),
      'process.env.NODE_ENV': JSON.stringify('production'), // import for bundled libs as React https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/htmlhint/**/*' },
      { from: 'index.html' },
      { from: 'splash.html' },
    ]),
  ],

  postcss: [
    postCssImport(),
    postCssUrl(),
    postCssProperties(),
    postCssNesting(),
    postCssReporter(),
    postCssBrowserReporter(),
  ],

  target: 'electron-renderer',
});

export default config;
