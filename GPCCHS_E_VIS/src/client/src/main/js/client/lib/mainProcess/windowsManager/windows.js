// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Refactor window management in main process in a viewManager
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : Add react_perf query param to better diag react perfs problems
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename WS_WINDOW_REMOVE in WS_WINDOW_CLOSE .
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Fix production webpack build errors
// VERSION : 1.1.2 : FA : #5846 : 17/03/2017 : Add REALTIME config parameter .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsTitle in windowsManager/selectors .
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Cleanup windows HTML and loading scripts
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 20/06/2017 : ask to save before closing workspace with cross button
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 21/06/2017 : Fix opening a workspace from menu
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : DM : #6700 : 22/06/2017 : Fix previous merge broken call
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Fix previous merge broken call
// VERSION : 1.1.2 : FA : #7081 : 27/06/2017 : Fix crash while closing application with document to save (a merge was probably deleted some code)
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement dialogObserver in mainProcess .
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Lint fix . . . .
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Clean old code in menuManager/IPC controller
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix store broken test due to selectors/hsc export
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard (documents middleware)
// END-HISTORY
// ====================================================================

import _omit from 'lodash/omit';
import _debounce from 'lodash/debounce';
import { BrowserWindow } from 'electron';
import getLogger from '../../common/logManager';
import parameters from '../../common/configurationManager';
import getHtmlPath from './getHtmlPath';
import { getStore } from '../store';
import { focusWindow, blurWindow } from '../../store/actions/hsc';
import {
  askCloseWindow,
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

export function getWindow(windowId) {
  return electronWindows[windowId];
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

  window.on('close', (e) => {
    if (window.shouldClose) {
      return;
    }
    e.preventDefault();
    getStore().dispatch(askCloseWindow(window.windowId));
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;
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
    electronWindows[windowId].shouldClose = true;
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
