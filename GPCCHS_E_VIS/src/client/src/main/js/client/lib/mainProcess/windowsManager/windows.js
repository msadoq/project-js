import _omit from 'lodash/omit';
import _debounce from 'lodash/debounce';
import _difference from 'lodash/difference';
import _each from 'lodash/each';
import { BrowserWindow, app, dialog } from 'electron';
import { series, each } from 'async';
import getLogger from '../../common/logManager';
import parameters from '../../common/configurationManager';
import getHtmlPath from './getHtmlPath';
import { getStore } from '../store';
import {
  focusWindow,
  blurWindow,
} from '../../store/actions/hsc';
import {
  closeWindow,
  updateGeometry,
  minimize,
  restore,
} from '../../store/actions/windows';
import { getWindows, getWindowPageIds } from '../../store/reducers/windows';
import { getIsWorkspaceOpening, getWorkspaceIsModified } from '../../store/reducers/hsc';
import { getPage } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { getWindowsTitle } from './selectors';
import { workspaceSave } from '../menuManager/workspaceSave';

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

  // Returns if at least one file is modified
  function isSaveNeeded(state) {
    // const win = getWindow(state, { windowId }).isModified;
    // check if pages in the windows are modified
    const pageIds = getWindowPageIds(state, { windowId });
    let page = false;
    let view = false;
    pageIds.forEach((pageId) => {
      const p = getPage(state, { pageId });
      page = page || p.isModified;
      p.views.forEach((viewId) => {
        view = view || getView(state, { viewId }).isModified;
      });
    });
    return page || view;
  }

  window.on('close', (e) => {
    const state = getStore().getState();
    // unsaved view or page in window to close
    if (isSaveNeeded(state)) {
      const choice = dialog.showMessageBox(window,
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'There are unsaved views and/or pages. \nAre you sure you want to quit?',
        });
      if (choice === 1) {
        e.preventDefault();
        return;
      }
    }

    // last window before closing the app
    const inStore = Object.keys(getWindows(state));
    if (inStore.length === 1
      // && getIsWorkspaceOpening(state) !== true
      && getWorkspaceIsModified(state)) {
      const choice = dialog.showMessageBox(window,
        {
          type: 'question',
          buttons: ['Yes', 'No', 'Cancel'],
          title: 'Confirm',
          message: 'Workspace is modified. Do you want to save before closing?',
        });
      if (choice === 0) { // save
        workspaceSave(window.windowId);
      } else if (choice === 2) {
        e.preventDefault();
      }
    }
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
