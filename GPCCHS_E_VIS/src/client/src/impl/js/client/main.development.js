import { app } from 'electron';
import { init } from 'common/parameters';
import getLogger from 'common/log';
import {
  LOG_APPLICATION_STOP,
  LOG_APPLICATION_ERROR,
} from 'common/constants';
import { server } from './lib/mainProcess/ipc';
import { start, stop, onWindowsClose } from './lib/mainProcess'; // eslint-disable-line import/first

const logger = getLogger('main');
init(__dirname, true);

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
app.commandLine.appendSwitch('no-proxy-server');

// const distLogger = getLogger('Application', ['dist']);

const errorHandler = (err) => {
  console.error(err); // eslint-disable-line no-console
  server.sendProductLog(LOG_APPLICATION_ERROR, err.message);
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
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('app stop');
  stop();
});

process.on('uncaughtException', errorHandler);
