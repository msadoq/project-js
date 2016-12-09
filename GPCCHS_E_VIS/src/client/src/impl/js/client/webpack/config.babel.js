// for babel-plugin-webpack-loaders
require('babel-register');
const devConfigs = require('./config.renderer.development.js');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfigs.module.loaders.slice(1)  // remove babel-loader
  }
};
