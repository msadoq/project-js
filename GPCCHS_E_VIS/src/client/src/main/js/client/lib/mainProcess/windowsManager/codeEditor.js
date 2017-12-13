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
