import debug from '../utils/debug';
import _ from 'lodash';
import { BrowserWindow } from 'electron';
import { delWindow } from '../actions/windows';
import { getStore } from './store';

const logger = debug('main:windows');

const windows = {};

export function open(data, windowId) {
  logger.info('opening window', windowId);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.width,
    height: data.geometry.height,
    title: `${data.title} - VIMA`, // TODO
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
    getStore().dispatch(delWindow(windowId));
  });

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

export function close(windowId) {
  logger.info('closing window', windowId);
  windows[windowId].destroy();
}

export function sync() {
  const list = getStore().getState().windows;
  const inStore = Object.keys(list);
  const opened = Object.keys(windows);
  const toOpen = _.difference(inStore, opened);
  const toClose = _.difference(opened, inStore);
  toOpen.forEach(windowId => open(list[windowId], windowId));
  toClose.forEach(windowId => close(windowId));
}
