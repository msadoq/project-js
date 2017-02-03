/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import rendererConfig from './config.renderer.production';

console.info('building and analyzing renderer bundle...'); // eslint-disable-line no-console

const config = merge(rendererConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: process.env.ANALYZER_PORT || 8888,
      openAnalyzer: false,
    }),
  ],
});

export default config;
