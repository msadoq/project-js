// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Revert "Replace some console uses by new Console"
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Replace some console uses by new Console
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Improve DX on npm run wp, display dashboard
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

/* eslint no-console: 0 */
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import DashboardPlugin from 'webpack-dashboard/plugin';
import { get } from '../lib/common/configurationManager';
import config from './config.renderer.development';

const app = express();
const compiler = webpack(config);
const PORT = get('WEBPACK_PORT');

compiler.apply(new DashboardPlugin());

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
