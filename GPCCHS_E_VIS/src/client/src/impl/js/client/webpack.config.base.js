import path from 'path';
import webpack from 'webpack';

import postCssImport from 'postcss-smart-import';
import postCssUrl from 'postcss-url';
import postCssProperties from 'postcss-custom-properties';
import postCssNesting from 'postcss-nested';
import postCssReporter from 'postcss-reporter';
import postCssBrowserReporter from 'postcss-browser-reporter';

export default {
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
      ],
      exclude: /node_modules/
    },
    {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.less', '.css'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment\/locale$/, new RegExp('fr.js')),
    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify('browser')
      }
    })
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ],
  postcss: () => [
    postCssImport(),
    postCssUrl(),
    postCssProperties(),
    postCssNesting(),
    postCssReporter(),
    postCssBrowserReporter()
  ]
};
