app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis
import { app } from 'electron';
import { start, stop } from './app/main/main';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', start);

app.on('window-all-closed', () => app.quit());

app.on('quit', () => stop);
