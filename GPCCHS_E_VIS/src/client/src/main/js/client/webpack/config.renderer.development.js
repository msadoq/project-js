// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5317 : 09/02/2017 : packaging dedupe dependencies and refactor for lodash
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : config webpack with 2 bundles
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Design and test html editor
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix View components should not re-mount after open editor
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Add environment variable to disable webpack eslint loader
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix process.env definePlugin in webpack
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7281 : 18/07/2017 : First benchmark of Grizzly charting lib used in PlotView.
// VERSION : 1.1.2 : DM : #7281 : 18/07/2017 : Added bench for color changing only 3 times, + fixed webpack error.
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : First benchmark draft for the TextView, split between TextView - TextViewWrapper .
// VERSION : 1.1.2 : DM : #6816 : 02/08/2017 : add mimic benchmark with isolated mimicView component
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import webpack from 'webpack';
import merge from 'webpack-merge';
import postCssImport from 'postcss-smart-import';
import postCssUrl from 'postcss-url';
import postCssProperties from 'postcss-custom-properties';
import postCssNesting from 'postcss-nested';
import postCssReporter from 'postcss-reporter';
import postCssBrowserReporter from 'postcss-browser-reporter';
import { get } from '../lib/common/configurationManager';

import baseConfig from './config.base';

const port = get('WEBPACK_PORT');

const eslintLoader = process.env.WEBPACK_NO_ESLINT ? undefined : {
  test: /\.jsx?$/,
  loader: 'eslint',
  exclude: [/src\/common/, /node_modules/],
};

export default merge(baseConfig, {
  devtool: 'eval-source-map',

  entry: {
    renderer: [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`, // TODO abdesson : test hot middleware to codeEditor to
      './lib/windowProcess/index',
    ],
    codeEditor: [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './lib/codeEditorProcess/index',
    ],
    'grizzly.benchmark': [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './benchmarks/grizzly/index',
    ],
    'textview.benchmark': [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './benchmarks/TextView/index',
    ],
    'mimicview.benchmark': [
      './lib/windowProcess/style/bootstrap',
      '!style!css!postcss!./lib/windowProcess/style',
      './benchmarks/MimicView/index',
    ],
  },

  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: '[name].bundle.js',
    pathinfo: true,
  },

  module: {
    preLoaders: _.compact([eslintLoader]),
    loaders: [
      {
        test: /.+\.(svg|eot|ttf|woff|woff2)/,
        loader: 'file?name=dist/fonts/[name].[ext]',
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('renderer'),
    }),
  ],

  postcss: () => [
    postCssImport(),
    postCssUrl(),
    postCssProperties(),
    postCssNesting(),
    postCssReporter(),
    postCssBrowserReporter(),
  ],

  target: 'electron-renderer',
});
