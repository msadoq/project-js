import globalConstants from 'common/constants';
import debug from '../common/debug/mainDebug';
import { LIFECYCLE_READY, LIFECYCLE_STARTED, onWindowOpened } from './lifecycle';
import { getStatus as getAppStatus, getLastCacheInvalidation } from '../store/selectors/hsc';
import windowsObserver from './windows/observer';
import dataMapGenerator from '../common/data/map/visibleRemoteIds';
import request from '../common/data/request';
import invalidate from '../common/data/invalidate';

const logger = debug('mainProcess:storeObserver');

let lastKnownAppStatus = null;
let windowAlreadyOpened = false;
let lastMap = {};
let actingOnData = false;

export const resetPreviousMap = () => (lastMap = {}); // TODO call on HSS disconnection
export const setActingOn = () => (actingOnData = true);
export const setActingOff = () => (actingOnData = false);
export const isActing = () => actingOnData;

export default function storeObserver(store) {
  logger.verbose('storeObserver called');
  const state = store.getState();
  const dispatch = store.dispatch;

  // lifecycle new step
  const appStatus = getAppStatus(state);
  if (lastKnownAppStatus !== appStatus) {
    logger.info(`appStatus from ${lastKnownAppStatus} to ${appStatus}`);
    lastKnownAppStatus = appStatus;
  }

  // sync windows only if app is ready or started
  if (getAppStatus(state) === LIFECYCLE_READY
    || getAppStatus(state) === LIFECYCLE_STARTED) {
    logger.debug('windows synchronization');
    windowsObserver(state, (err) => {
      if (err) {
        logger.error(err);
      }

      // only one time to avoid infinite recursion
      if (windowAlreadyOpened === false) {
        windowAlreadyOpened = true;
        onWindowOpened(dispatch);
      }
    });
  }

  // following is done only while not playing and if windows was opened at least one time
  if (!isActing() && windowAlreadyOpened === true) {
    setActingOn();

    const dataMap = dataMapGenerator(state);

    // data requests to HSS
    request(state, dispatch, dataMap, lastMap);

    // cache invalidation (only at a certain frequency)
    const lastCacheInvalidation = getLastCacheInvalidation(state);
    if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
      invalidate(state, dispatch, dataMap);
    }

    // persist dataMap for next call
    lastMap = dataMap;

    setTimeout(setActingOff, 0); // timeout added to avoid data observer update
  }
}
