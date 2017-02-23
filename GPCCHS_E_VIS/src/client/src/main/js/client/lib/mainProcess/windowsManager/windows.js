import _omit from 'lodash/omit';
import _debounce from 'lodash/debounce';
import _difference from 'lodash/difference';
import _each from 'lodash/each';
import { BrowserWindow, app } from 'electron';
import { series, each } from 'async';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../store/mainStore';
import {
  focusWindow,
  blurWindow,
} from '../../store/actions/hsc';
import {
  remove,
  updateGeometry,
  minimize,
  restore,
} from '../../store/actions/windows';
import {
  getWindows,
  getWindowsTitle,
} from '../../store/selectors/windows';
import { getIsWorkspaceOpening } from '../../store/selectors/hsc';

const logger = getLogger('main:windowsManager:windows');

let electronWindows = {};

function isExists(windowId) {
  return electronWindows[windowId] && !electronWindows[windowId].isDestroyed();
}

export function showSplashScreen() {
  return Object.keys(electronWindows).length === 0;
}

export function open(windowId, data, callback) {
  logger.info(`opening window ${windowId}`);
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

  const params = encodeURIComponent(JSON.stringify(parameters.getAll()));
  const htmlPath = `file://${parameters.get('path')}/index.html`;
  logger.debug('opening', htmlPath);
  window.loadURL(`${htmlPath}?windowId=${windowId}&params=${params}`);

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
  Object.keys(electronWindows)
    .forEach(windowId => close(windowId));
}

export function setTitles(callback) {
  const state = getStore().getState();
  const titles = getWindowsTitle(state);
  _each(
    electronWindows,
    (w, windowId) => {
      if (isExists(windowId)) {
        w.setTitle(titles[windowId]);
      }
    }
  );
  callback(null);
}

export function observer(callback) {
  const state = getStore().getState();
  const list = getWindows(state);
  const inStore = Object.keys(list);
  const opened = Object.keys(electronWindows);
  const toOpen = _difference(inStore, opened);
  const toClose = _difference(opened, inStore);

  series([
    // close
    fn => fn(toClose.forEach(windowId => close(windowId))),
    // open
    fn => each(toOpen, (windowId, cb) => open(windowId, list[windowId], cb), fn),
    // update titles
    fn => setTitles(fn),
    (fn) => {
      if (Object.keys(electronWindows).length === 0
        && getIsWorkspaceOpening(getStore().getState()) !== true) {
        // if every workspace windows are closed and no workspace are opening
        app.quit();
      }

      fn(null);
    },
  ], callback);
}
