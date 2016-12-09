import { app } from 'electron';
import { init } from 'common/parameters';
import { start, stop, onWindowsClose } from './lib/mainProcess';

process.title = 'gpcchs_main';

// avoid using host proxy configuration and perturbing local HTTP access (e.g.: index.html)
app.commandLine.appendSwitch('no-proxy-server');

// init parameters
init(__dirname);

app.on('ready', start);

app.on('window-all-closed', () => onWindowsClose());

app.on('quit', stop);

process.on('uncaughtException', (err) => {
  console.error(err); // eslint-disable-line no-console
  app.exit(1);
});
