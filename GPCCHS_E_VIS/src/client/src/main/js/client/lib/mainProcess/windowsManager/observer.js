import { series, each } from 'async';
import _each from 'lodash/each';
import _difference from 'lodash/difference';
import { app } from 'electron';
import execution from 'common/logManager/execution';
import { getWindows } from 'store/reducers/windows';
import { getIsWorkspaceOpening } from 'store/reducers/hsc';
import { getViewId } from 'store/reducers/codeEditor';
import { getWindowsTitle, getEditorWindowTitle } from './selectors';
import {
  getOpenedWindowsIds,
  noWindowOpened,
  close,
  open,
  setTitle,
} from './windows';
import {
  isExists as isCodeEditorExists,
  open as openCodeEditor,
  close as closeCodeEditor,
  setTitle as setCodeEditorTitle,
} from './codeEditor';
import {
  show as showSplashScreen,
  hide as hideSplashScreen,
} from './splashScreen';

export default function makeWindowsStoreObserver(store) {
  // TODO dbrugne throttle
  return function windowsStoreObserver() {
    const profile = execution('windows:store:observer');
    profile.start('run');

    const state = store.getState();
    const list = getWindows(state);
    const inStore = Object.keys(list);
    const opened = getOpenedWindowsIds();
    const toOpen = _difference(inStore, opened);
    const toClose = _difference(opened, inStore);

    series([
      function workspaceWindows(callback) {
        // close windows (sync)
        toClose.forEach(close);

        // open windows (async)
        each(
          toOpen,
          (windowId, cb) => open(windowId, list[windowId], cb),
          callback
        );
      },
      function codeEditor(callback) {
        // set title
        const editedViewId = getViewId(state);
        if (editedViewId !== null && !isCodeEditorExists()) {
          openCodeEditor(callback);
          return;
        }

        if (editedViewId === null && isCodeEditorExists()) {
          closeCodeEditor();
        }

        callback();
      },
      function splashScreen(callback) {
        // splash screen and all windows close detection (sync)
        if (noWindowOpened()) {
          showSplashScreen();
          // force application stop if no workspace windows is opened and no workspace is under
          // opening
          // Note: we cannot rely on window-all-closed event cause splashscreen and editor windows
          //       could be opened
          if (!getIsWorkspaceOpening(state)) {
            app.quit();
          }
        } else {
          hideSplashScreen();
        }

        callback(null);
      },
      function windowsTitles(callback) {
        // workspace windows
        const titles = getWindowsTitle(state);
        _each(titles, (title, windowId) => setTitle(windowId, title));

        // code editor
        const editedViewId = getViewId(state);
        const codeEditorTitle = getEditorWindowTitle(state, { viewId: editedViewId });
        setCodeEditorTitle(codeEditorTitle);

        callback();
      },
    ], () => {
      profile.stop('run');
      profile.print();
    });
  };
}
