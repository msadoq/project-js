import { app } from 'electron';
import { init, get } from 'common/parameters';
import { start, stop, onWindowsClose, onError } from './lib/mainProcess';
init(__dirname, true);

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
app.commandLine.appendSwitch('no-proxy-server');

if (get('DEBUG') === 'on') {
  require('./lib/common/utils/gcMonitoring')();
}

app.on('ready', () => {
  // https://github.com/electron/electron/issues/1412
  process.title = 'gpcchs_main';

  try {
    start();
  } catch (e) {
    onError(e);
  }
});

app.on('window-all-closed', onWindowsClose);

app.on('quit', stop);

process.on('uncaughtException', onError);
