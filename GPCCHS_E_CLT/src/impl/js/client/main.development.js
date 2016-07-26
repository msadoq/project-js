app.commandLine.appendSwitch('no-proxy-server');
import debug from 'debug';
import { app, BrowserWindow } from 'electron';
import _ from 'lodash';
import configureMainStore from './app/store/mainStore';
import initialState from './app/store/initialState.json';
import { delWindow } from './app/actions/windows';

const logger = debug('gpcchs_e_clt:main');

import {
  connect as websocketConnect,
  disconnect as websocketDisconnect,
} from './app/communication/websocket';

const windows = {};
let store = null;
let storeSubscription = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) { } // eslint-disable-line
    }
  }
};

function openWindow(data, windowId) {
  logger('opening window', windowId);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.width,
    height: data.geometry.height,
    title: `${data.title} - VIMA`,
  });

  // prevent garbage collection
  windows[windowId] = window;

  window.loadURL(`file://${__dirname}/app/window.html?windowId=${windowId}`);

  window.webContents.on('did-finish-load', () => {
    window.show();
    window.focus();
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    store.dispatch(delWindow(windowId));
  });

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

function closeWindow(windowId) {
  logger('closing window', windowId);
  windows[windowId].destroy();
}

app.on('ready', async () => {
  logger('app ready');
  await installExtensions();

  // main redux store
  store = configureMainStore(initialState, process.env.NODE_ENV === 'development');

  // observe state to window management
  storeSubscription = store.subscribe(() => {
    // Windows management
    const inStore = Object.keys(store.getState().windows);
    const opened = Object.keys(windows);
    const toOpen = _.difference(inStore, opened);
    const toClose = _.difference(opened, inStore);
    toOpen.forEach(windowId => openWindow(store.getState().windows[windowId], windowId));
    toClose.forEach(windowId => closeWindow(windowId));

    // Websocket management
    // const ws = store.getState().websocket;
    // if (ws.forceDisconnect === true) {
    //   logger('websocket disconnection requested via redux');
    //   websocketDisconnect();
    // }
    // if (ws.status !== 'connect' && ws.forceDisconnect === false) {
    //   logger('websocket connection requested via redux');
    //   websocketConnect(store);
    // }
    // TODO : replace with IPC request
  });

  // open websocket
  websocketConnect(store);

  // open windows
  _.forIn(store.getState().windows, openWindow);
});

app.on('quit', () => {
  // close websocket
  websocketDisconnect();

  // close redux store main process subscriptionId
  storeSubscription();
  storeSubscription = null;
});
