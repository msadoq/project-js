/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable global-require */

import { execSync } from 'child_process';
import merge from 'webpack-merge';
import Console from 'common/utils/console';
import mainConfig from './config.main';

let BundleAnalyzerPlugin;
let shouldRequire = false;
try {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
} catch (err) {
  Console.info(err.message);
  Console.info('Installing webpack-bundle-analyzer...');
  execSync('npm install webpack-bundle-analyzer', { stdio: [0, 1, 2] });
  shouldRequire = true;
}

if (shouldRequire) {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
}

Console.info('building and analyzing renderer bundle...');

const config = merge(mainConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: process.env.ANALYZER_PORT || 8888,
      openAnalyzer: false,
    }),
  ],
});

export default config;
