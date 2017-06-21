import _omit from 'lodash/omit';
import _debounce from 'lodash/debounce';
import { BrowserWindow } from 'electron';
import getLogger from '../../common/logManager';
import parameters from '../../common/configurationManager';
import getHtmlPath from './getHtmlPath';
import { getStore } from '../store';
import { focusWindow, blurWindow } from '../../store/actions/hsc';
import {
  closeWindow,
  updateGeometry,
  minimize,
  restore,
} from '../../store/actions/windows';

const logger = getLogger('main:windowsManager:windows');

let electronWindows = {};

function isExists(windowId) {
  return electronWindows[windowId] && !electronWindows[windowId].isDestroyed();
}

export function getOpenedWindowsIds() {
  return Object.keys(electronWindows);
}

export function noWindowOpened() {
  return !getOpenedWindowsIds().length;
}

export function open(windowId, data, callback) {
  logger.warn(`opening window ${windowId}`);
  const window = new BrowserWindow({
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.w,
    height: data.geometry.h,
    show: false,
  });

  // mount module(s) to allow access from renderer process
  window.parameters = parameters;

  // persist windowId on BrowserWindow instance
  window.windowId = windowId;

  // prevent garbage collection
  electronWindows[windowId] = window;

  // load HTML page
  const htmlPath = getHtmlPath(windowId);
  logger.debug('opening', htmlPath);
  window.loadURL(htmlPath);

  // ready-to-show is the right element to subscribe to trigger logic only once by window
  window.on('ready-to-show', () => {
    window.show();
    window.focus();
    return callback(null);
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    getStore().dispatch(closeWindow(windowId));
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

  const saveGeometry = _debounce((ev) => {
    if (isExists(windowId)) {
      const b = ev.sender.getBounds();
      getStore().dispatch(updateGeometry(windowId, b.x, b.y, b.width, b.height));
    }
  }, 500);
  window.on('move', saveGeometry);
  window.on('resize', saveGeometry);
}

export function close(windowId) {
  logger.info('closing', windowId);
  if (isExists(windowId)) {
    electronWindows[windowId].close();
  }

  electronWindows = _omit(electronWindows, windowId);
}

export function closeAll() {
  getOpenedWindowsIds().forEach(windowId => close(windowId));
}

export function setTitle(windowId, title) {
  if (!isExists(windowId)) {
    return;
  }

  const window = electronWindows[windowId];
  if (window && title !== window.getTitle()) {
    window.setTitle(title);
  }
}
