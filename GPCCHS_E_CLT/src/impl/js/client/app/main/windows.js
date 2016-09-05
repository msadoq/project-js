import debug from '../utils/debug';
import _ from 'lodash';
import { BrowserWindow } from 'electron';
import { delWindow } from '../actions/windows';
const querystring = require('querystring');

const logger = debug('main:windows');

const windows = {};

export function open(data, windowId, store) {
  logger.info('opening window', windowId);
  logger.error('opening window', process.env.PORT);
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

  window.loadURL(`file://${__dirname}/../window.html?windowId=${windowId}`);

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

export function close(windowId) {
  logger.info('closing window', windowId);
  windows[windowId].destroy();
}

export function sync(store) {
  const list = store.getState().windows;
  const inStore = Object.keys(list);
  const opened = Object.keys(windows);
  const toOpen = _.difference(inStore, opened);
  const toClose = _.difference(opened, inStore);
  toOpen.forEach(windowId => open(list[windowId], windowId, store));
  toClose.forEach(windowId => close(windowId));
}
