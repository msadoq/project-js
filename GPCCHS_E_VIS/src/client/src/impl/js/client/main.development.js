import { app } from 'electron';
import { start, stop, onWindowsClose } from './lib/mainProcess';
import './lib/common/parameters';

app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', start);

app.on('window-all-closed', () => onWindowsClose());

app.on('quit', () => stop);

process.on('uncaughtException', (err) => {
  console.error(err); // eslint-disable-line no-console
  app.exit(1);
});
