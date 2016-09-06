app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis
import debug from './app/utils/debug';
import { app } from 'electron';
import installExtensions from './app/main/installExtensions';
import initialState from './app/store/initialState.json'; // TODO remove
import { initStore, getStore } from './app/main/store';
import { connect, disconnect } from './app/main/websocket';
import { sync as syncWindows } from './app/main/windows';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

const logger = debug('main');

let store = null;
let storeSubscription = null;

app.on('ready', async () => {
  logger.info('app ready');

  await installExtensions();

  initStore(initialState);
  store = getStore();
  storeSubscription = store.subscribe(() => {
    syncWindows();
  });

  connect();
  syncWindows();
});

app.on('window-all-closed', () => app.quit());

app.on('quit', () => {
  logger.info('app quit');

  disconnect();

  if (storeSubscription) {
    storeSubscription();
    storeSubscription = null;
  }
});
