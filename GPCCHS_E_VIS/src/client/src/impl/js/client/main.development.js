import { app } from 'electron';
import getLogger from 'common/log';
import { start, stop, onWindowsClose } from './lib/mainProcess'; // eslint-disable-line import/first

const logger = getLogger('main');

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
app.commandLine.appendSwitch('no-proxy-server');

const errorHandler = (err) => {
  console.error(err); // eslint-disable-line no-console
  app.exit(1);
};

app.on('ready', () => {
  // https://github.com/electron/electron/issues/1412
  process.title = 'gpcchs_main';

  logger.info('app start');
  try {
    start();
  } catch (e) {
    errorHandler(e);
  }
});

app.on('window-all-closed', () => {
  logger.info('windows close');
  onWindowsClose();
});

app.on('quit', () => {
  logger.info('app stop');
  stop();
});

process.on('uncaughtException', errorHandler);
