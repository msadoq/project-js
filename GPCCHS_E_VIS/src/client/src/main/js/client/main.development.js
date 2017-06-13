import { app } from 'electron';
import { init } from 'common/parameters';
import { onStart, onStop, onWindowsClose, onError } from './lib/mainProcess';
// import { createWindow } from './lib/mainProcess/testPerf';

init(__dirname, true);

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
// but block chromium DevTools downloads (comment and start to re-install DevTools)
app.commandLine.appendSwitch('no-proxy-server');

// const { start } = require('./lib/common/utils/gcMonitoring');
// start();

app.on('ready', () => {
  // https://github.com/electron/electron/issues/1412
  process.title = 'gpcchs_main';

  try {
    onStart();
    // createWindow();
  } catch (e) {
    onError(e);
  }
});

app.on('window-all-closed', onWindowsClose);

app.on('quit', onStop);

process.on('uncaughtException', onError);
