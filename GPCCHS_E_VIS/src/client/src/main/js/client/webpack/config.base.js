import path from 'path';
import webpack from 'webpack';

export default {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'].map(require.resolve),
        include: /node_modules\/common/,
        exclude: /node_modules\/common\/node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'].map(require.resolve),
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.less$/,
        loader: 'style!css!less',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.less', '.css'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment\/locale$/, new RegExp('fr.js')),
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ],
};
