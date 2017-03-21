import { BrowserWindow } from 'electron';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../store/mainStore';
import { closeHtmlEditor } from '../../store/actions/editor';
import { getEditorTextViewId } from '../../store/reducers/editor';
import { getEditorWindowTitle } from '../../store/selectors/editor';
import getCenteredPosition from './common/getCenteredPosition';

const logger = getLogger('main:windowsManager:codeEditor');

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

let win;

function isExists() {
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
  // win.setMenuBarVisibility(false);
  win.loadURL(`file://${parameters.get('path')}/code.html`);

  // mount module(s) to allow access from renderer process
  win.parameters = parameters;

  win.on('ready-to-show', () => {
    logger.debug('opened');
    win.show();
    win.focus();
    return callback(null);
  });
  win.on('close', () =>
    getStore().dispatch(closeHtmlEditor())
  );
}

export function close() {
  logger.debug('closing');
  if (isExists()) {
    win.destroy();
  }
  win = null; // trigger garbage collection
}

export function observer(callback) {
  const state = getStore().getState();
  const editedViewId = getEditorTextViewId(state);
  const title = getEditorWindowTitle(state, editedViewId);

  if (isExists() && title !== win.getTitle()) {
    win.setTitle(title);
  }

  if (editedViewId !== null && !isExists()) {
    open(callback);
  } else if (editedViewId === null && isExists()) {
    close();
    callback(null);
  } else {
    callback(null);
  }
}
