import _ from 'lodash';
import async from 'async';
import { BrowserWindow } from 'electron';
import getLogger from 'common/log';
import parameters from 'common/parameters';

import {
  remove,
  updateGeometry,
  minimize,
  restore,
} from '../store/actions/windows';
import {
  focusWindow,
  blurWindow,
} from '../store/actions/hsc';
import { getStore } from '../store/mainStore';

const logger = getLogger('GPCCHS:store:observers:windows');

const windows = {};

function getWindowHtmlPath() {
  return `file://${parameters.get('path')}/index.html`;
}

export function open(data, windowId, cb) {
  logger.info(`opening window ${windowId}`);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.w,
    height: data.geometry.h,
    title: `${data.title} - VIMA`,
  });

  // mount module(s) to allow access from renderer process
  window.parameters = parameters;

  // persist windowId on BrowserWindow instance
  window.windowId = windowId; // eslint-disable-line no-param-reassign

  // prevent garbage collection
  windows[windowId] = window;

  const htmlPath = getWindowHtmlPath();
  logger.debug('opening', htmlPath);
  window.loadURL(`${htmlPath}?windowId=${windowId}`);

  // ready-to-show is the right element to subscribe to trigger logic only once by window
  window.on('ready-to-show', () => {
    window.show();
    window.focus();
    return cb(null);
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    getStore().dispatch(remove(windowId));
  });

  window.on('focus', () => {
    getStore().dispatch(focusWindow(windowId));
  });

  window.on('blur', () => {
    getStore().dispatch(blurWindow(windowId));
  });

  window.on('minimize', () => {
    getStore().dispatch(minimize(windowId));
  });
  window.on('restore', () => {
    getStore().dispatch(restore(windowId));
  });

  const saveGeometry = _.debounce((ev) => {
    const b = ev.sender.getBounds();
    getStore().dispatch(updateGeometry(windowId, b.x, b.y, b.width, b.height))
  }, 500);

  window.on('move', saveGeometry);
  window.on('resize', saveGeometry);

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

export function close(windowId) {
  logger.info('closing window', windowId);
  if (windows[windowId] && !windows[windowId].isDestroyed()) {
    const window = windows[windowId];
    delete windows[windowId];
    setImmediate(() => window.close());
  }
}

export default function windowsObserver(state, callback) {
  const list = state.windows;
  const inStore = Object.keys(list);
  const opened = Object.keys(windows);
  const toOpen = _.difference(inStore, opened);
  const toClose = _.difference(opened, inStore);
  toClose.forEach(windowId => close(windowId));

  if (!toOpen.length) {
    return callback(null);
  }

  async.each(toOpen, (windowId, cb) => open(list[windowId], windowId, cb), callback);
}
