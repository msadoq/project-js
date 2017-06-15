import { BrowserWindow } from 'electron';
import getLogger from '../../common/logManager';
import parameters from '../../common/configurationManager';
import getCenteredPosition from './common/getCenteredPosition';
import { showSplashScreen } from './windows';

const logger = getLogger('main:windowsManager:splashScreen');

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_TITLE = 'Visualization application - VIMA';

let win;

function isExists() {
  return win && !win.isDestroyed();
}

export function open(callback) {
  logger.debug('opening');

  const { x, y } = getCenteredPosition(DEFAULT_WIDTH, DEFAULT_HEIGHT);
  win = new BrowserWindow({
    title: DEFAULT_TITLE,
    x,
    y,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    show: false,
    frame: false, // no window toolbars and chrome
    alwaysOnTop: true,
  });
  win.setMenuBarVisibility(false);
  win.loadURL(`file://${parameters.get('path')}/splash.html`);

  // mount module(s) to allow access from renderer process
  win.parameters = parameters;

  win.on('ready-to-show', () => {
    logger.debug('opened');
    win.show();
    win.focus();
    logger.debug('shown');
    return callback(null);
  });
}

export function close() {
  if (isExists()) {
    logger.debug('closing');
    win.destroy();
  }
  win = null; // trigger garbage collection
}

export function show() {
  if (isExists()) {
    logger.debug('showing');
    win.show();
  }
}

export function hide() {
  if (isExists()) {
    logger.debug('hiding');
    win.hide();
  }
}

export function setMessage(message = '') {
  if (isExists()) {
    win.webContents.send('splash', message);
  }
}

export function observer(callback) {
  if (showSplashScreen()) {
    show();
  } else {
    hide();
  }

  callback(null);
}
