import debug from '../utils/debug';
import _ from 'lodash';
import { BrowserWindow } from 'electron';
import { remove } from '../store/mutations/windowActions';
import { getStore } from '../store/mainStore';

const logger = debug('main:windows');

const windows = {};

export function open(data, windowId) {
  logger.info(`opening window ${windowId}`);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.w,
    height: data.geometry.h,
    title: `${data.title} - VIMA`,
  });

  // persist windowId on BrowserWindow instance
  window.windowId = windowId; // eslint-disable-line no-param-reassign

  // prevent garbage collection
  windows[windowId] = window;

  window.loadURL(`file://${__dirname}/../window/index.html?windowId=${windowId}`);

  window.webContents.on('did-finish-load', () => {
    window.show();
    window.focus();
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    getStore().dispatch(remove(windowId));
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
