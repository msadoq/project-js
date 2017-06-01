import { join } from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './config.base';

const zmqExternals = (process.env.MAVEN_BUILDING
  ? ['zmq', 'bindings']
  : [{
    zmq: './node_modules/common/node_modules/zmq',
    bindings: './node_modules/common/node_modules/bindings',
  }]
);

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './lib/serverProcess/index'],

  output: {
    path: join(__dirname, '..'),
    filename: './server.js',
  },
  externals: [
    'source-map-support',
    'memcpy',
    ...zmqExternals,
  ],

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env.IS_BUNDLED': JSON.stringify('on'),
      'process.env.APP_ENV': JSON.stringify('server'),
    }),
  ],

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

});
