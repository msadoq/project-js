import {
  LIFECYCLE_READY,
  LIFECYCLE_STARTED,
  CACHE_INVALIDATION_FREQUENCY,
} from 'common/constants';

import debug from '../common/debug/mainDebug';
import { onWindowOpened } from './lifecycle';
import { getStatus as getAppStatus, getLastCacheInvalidation } from '../store/selectors/hsc';
import windowsObserver from './windows';
import dataMapGenerator from '../dataManager/map/visibleRemoteIds';
import request from '../dataManager/request';
import invalidate from '../dataManager/invalidate';

const logger = debug('mainProcess:storeObserver');

let lastKnownAppStatus = null;
let windowAlreadyOpened = false;
let lastMap = {};
let actingOnData = false;

export const getPreviousMap = () => lastMap;
export const resetPreviousMap = () => (lastMap = {});
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

  // continue only if app is ready or started
  if (appStatus !== LIFECYCLE_READY && appStatus !== LIFECYCLE_STARTED) {
    return logger.verbose('ignore next storeObserver steps');
  }

  // sync windows only if app is ready or started
  windowsObserver(state, (err) => {
    if (err) {
      logger.error(err);
    }

    logger.debug('windows synchronized', windowAlreadyOpened);

    // only one time to avoid infinite recursion
    if (windowAlreadyOpened === false || appStatus === LIFECYCLE_READY) {
      windowAlreadyOpened = true;
      onWindowOpened(dispatch);
    }
  });

  // continue only if app is started
  if (appStatus !== LIFECYCLE_STARTED) {
    return logger.verbose('ignore next storeObserver steps');
  }

  // following is done only while not playing and if windows was opened at least one time
  if (!isActing() && windowAlreadyOpened === true) {
    setActingOn();

    const dataMap = dataMapGenerator(state);

    // data requests to HSS
    request(state, dispatch, dataMap, lastMap);

    // cache invalidation (only at a certain frequency)
    const lastCacheInvalidation = getLastCacheInvalidation(state);
    if (Date.now() - lastCacheInvalidation >= CACHE_INVALIDATION_FREQUENCY) {
      invalidate(state, dispatch, dataMap);
    }

    // persist dataMap for next call
    lastMap = dataMap;

    setTimeout(setActingOff, 0); // timeout added to avoid data observer update
  }
}
