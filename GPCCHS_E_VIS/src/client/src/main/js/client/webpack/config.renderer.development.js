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
