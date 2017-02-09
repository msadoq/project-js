import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { get } from 'common/parameters';
import Console from 'common/utils/console';
import config from './config.renderer.development';

const app = express();
const compiler = webpack(config);
const PORT = get('WEBPACK_PORT');

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
    Console.error(err);
    return;
  }

  Console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  Console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
