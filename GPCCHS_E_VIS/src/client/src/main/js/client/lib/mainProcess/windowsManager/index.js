import { series } from 'async';
import getLogger from 'common/log';
import { getStore } from '../../store/isomorphic';
import { observer as windowsObserver } from './windows';
import { observer as splashObserver } from './splashScreen';
import { observer as codeObserver } from './codeEditor';

export * as splashScreen from './splashScreen';
export * as codeEditor from './codeEditor';
export * as windows from './windows';

const logger = getLogger('main:windowsManager');

let lastState = null;

export default function observer(callback) {
  logger.silly('call');

  const state = getStore().getState();

  // only if something has changed
  if (state === lastState) {
    logger.silly('nothing changed, abort');
    callback(null);
    return;
  }

  lastState = state;

  series([
    // windows
    windowsObserver,
    // codeEditor
    codeObserver,
    // splashScreen
    splashObserver,
  ], callback);
}
