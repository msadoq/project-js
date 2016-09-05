app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis
import debug from './app/utils/debug';
import installExtensions from './app/main/installExtensions';
import { app } from 'electron';
import createStore from './app/main/store/createStore';
import initialState from './app/store/initialState.json';
import {
  connect as websocketConnect,
  disconnect as websocketDisconnect,
} from './app/communication/websocket';
import { sync as syncWindows } from './app/main/windows';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

const logger = debug('gpcchs_e_clt:main');

let store = null;
let storeSubscription = null;

app.on('ready', async () => {
  logger.info('app ready');
  await installExtensions();

  // redux store
  store = createStore(initialState);

  // observe state to window management
  storeSubscription = store.subscribe(() => {
    syncWindows(store);
  });

  // websocket
  websocketConnect(); // TODO : sync with store

  // windows
  syncWindows(store);
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('quit', () => {
  logger.info('app quit');

  websocketDisconnect();

  if (storeSubscription) {
    storeSubscription();
    storeSubscription = null;
  }
});
