app.commandLine.appendSwitch('no-proxy-server');
import { app, BrowserWindow } from 'electron';
import configureMainStore from './app/store/mainStore';
import initialState from './app/store/initialState.json';
import _ from 'lodash';

const windows = {};

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
    window[windowId] = window;

    // @todo : update redux .windows list
  });

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

function closeWindow(windowId) {
  windows[windowId].destroy();
}

app.on('ready', async () => {
  await installExtensions();

  // main redux store
  const store = configureMainStore(initialState, process.env.NODE_ENV === 'development');
  
  // observe state to window management
  store.subscribe(() => {
    const inStore = Object.keys(store.getState().windows);
    const opened = Object.keys(windows);
    const toOpen = _.difference(inStore, opened);
    const toClose = _.difference(opened, inStore);
    toOpen.forEach(windowId => openWindow(store.getState().windows[windowId], windowId));
    toClose.forEach(windowId => closeWindow(windowId));
  });
  
  _.forIn(store.getState().windows, openWindow);
});
