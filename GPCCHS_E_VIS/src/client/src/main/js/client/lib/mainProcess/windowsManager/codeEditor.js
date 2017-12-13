// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Refactor window management in main process in a viewManager
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : debug change TextView in code editor
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getViewId simple selector from selectors/editor to reducers/editor
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename editor/getViewId simple selector in getEditorTextViewId
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Add .title property in editor reducer
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getEditorWindowTitle from selectors/editor to windowsManager/selectors
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix crash about html editor + linting
// VERSION : 1.1.2 : DM : #5828 : 25/04/2017 : Cleanup windows HTML and loading scripts
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Implement a new "isomorphic" createStore to centralize Redux configuration
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Cleanup Redux store configuration and introduce three distinct store enhancers for future store synchronisation implementation.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : Merge dev in abesson-mimic .
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : FA : #6993 : 21/06/2017 : Fix segfault when quit vima (in packaging mode)
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : merge dev on abesson-mimic branch .
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// END-HISTORY
// ====================================================================

import { BrowserWindow } from 'electron';

import getLogger from 'common/logManager';
import parameters from 'common/configurationManager';
import { closeCodeEditor } from 'store/actions/editor';
import { getStore } from '../store';
import getCenteredPosition from './common/getCenteredPosition';
import getHtmlPath from './getHtmlPath';

const logger = getLogger('main:windowsManager:codeEditor');

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

let win;

export function isExists() {
  return win && !win.isDestroyed();
}

export function open(callback) {
  logger.debug('opening');

  const { x, y } = getCenteredPosition(DEFAULT_WIDTH, DEFAULT_HEIGHT);
  win = new BrowserWindow({
    title: '',
    x,
    y,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    show: false,
  });

  const htmlPath = getHtmlPath('code');
  logger.debug('opening', htmlPath);
  win.loadURL(htmlPath);

  // mount module(s) to allow access from renderer process
  win.parameters = parameters;

  win.on('ready-to-show', () => {
    logger.debug('opened');
    win.show();
    win.focus();
    return callback(null);
  });
  win.on('close', () =>
    getStore().dispatch(closeCodeEditor())
  );
}

export function close() {
  logger.debug('closing');
  if (isExists()) {
    win.close();
  }
  win = null; // trigger garbage collection
}

export function setTitle(title) {
  if (isExists() && title !== win.getTitle()) {
    win.setTitle(title);
  }
}
