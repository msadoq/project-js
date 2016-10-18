import _ from 'lodash';
import async from 'async';
import { BrowserWindow } from 'electron';

import parameters from '../../common/parameters';
import debug from '../../common/debug/mainDebug';
import { remove } from '../../store/actions/windows';
import { getStore } from '../../store/mainStore';

const logger = debug('store:observers:windows');

const windows = {};

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

  window.parameters = parameters;

  // persist windowId on BrowserWindow instance
  window.windowId = windowId; // eslint-disable-line no-param-reassign

  // prevent garbage collection
  windows[windowId] = window;

  if (process.env.NODE_ENV === 'production') {
    window.loadURL(`file://${__dirname}/lib/windowProcess/index.html?windowId=${windowId}`);
  } else {
    window.loadURL(`file://${__dirname}/../../windowProcess/index.html?windowId=${windowId}`);
  }

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

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

export function close(windowId) {
  logger.info('closing window', windowId);
  windows[windowId].destroy();
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
