import { app } from 'electron';
import { init, get } from 'common/parameters';
import { start, stop, onWindowsClose } from './lib/mainProcess';

process.title = 'HSC_MAIN';

app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis

init(__dirname);

if (get('DEBUG') === 'on') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', start);

app.on('window-all-closed', () => onWindowsClose());

app.on('quit', () => stop);

process.on('uncaughtException', (err) => {
  console.error(err); // eslint-disable-line no-console
  app.exit(1);
});
