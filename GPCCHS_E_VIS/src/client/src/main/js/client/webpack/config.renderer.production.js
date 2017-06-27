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
