import _round from 'lodash/round';
import { series } from 'async';
import { get } from 'common/parameters';
import {
  HSC_ORCHESTRATION_FREQUENCY,
  HSC_ORCHESTRATION_WARNING_STEP,
  HSC_ORCHESTRATION_CRITICAL_STEP,
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
  CACHE_INVALIDATION_FREQUENCY,
  IPC_METHOD_CACHE_CLEANUP,
} from 'common/constants';
import executionMonitor from 'common/log/execution';
import getLogger from 'common/log';
import { server } from './ipc';
import { getStore } from '../store/mainStore';
import { getWindowsOpened, getLastCacheInvalidation, getPlayingTimebarId } from '../store/selectors/hsc';
import { getAppStatus, getMainStatus } from '../store/selectors/health';
import { setWindowsAsOpened, updateCacheInvalidation, pause } from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import windowsObserver from './windows';
import { addOnce } from '../store/actions/messages';
import { updateViewData } from '../store/actions/viewData';
import { handlePlay } from '../store/actions/timebars';
import { updateHealth, updateMainStatus } from '../store/actions/health';

const logger = getLogger('main:orchestration');

let nextTick = null;
let lastTick = null;
let tickStart = null;
const previous = {
  state: {},
  dataMap: { perRemoteId: {}, perView: {} },
  lastRequestedDataMap: {},
  lastAppStatus: HEALTH_STATUS_HEALTHY,
};

export function schedule() {
  clear(); // avoid concurrency
  // schedule next tick
  nextTick = setTimeout(tick, HSC_ORCHESTRATION_FREQUENCY);
}

export function clear() {
  if (!nextTick) {
    return;
  }

  clearTimeout(nextTick);
  nextTick = null;
}

export function start() {
  schedule();
}

export function stop() {
  clear();
  previous.state = {};
  previous.dataMap = { perRemoteId: {}, perView: {} };
  previous.lastRequestedDataMap = {};
  previous.lastAppStatus = HEALTH_STATUS_HEALTHY;

  const { dispatch } = getStore();
  dispatch(pause());
  lastTick = null;
}

export function tick() {
  logger.debug('running tick');
  const execution = executionMonitor('orchestration');
  execution.reset();
  execution.start('global');
  tickStart = process.hrtime();
  let skipThisTick = false;

  // store
  const { getState, dispatch } = getStore();

  const isWindowsOpened = getWindowsOpened(getState());
  const windowsHasChanged = getState().windows !== previous.state.windows;

  // play management (before dataMap generation, allow tick to work on a up to date state)
  if (isWindowsOpened) {
    execution.start('play handling');
    const lastTickTime = lastTick;
    lastTick = Date.now();
    const delta = lastTick - lastTickTime;
    dispatch(handlePlay(delta, get('HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')));
    execution.stop('play handling');
  }

  // retrieve state (after handlePlay dispatch) to works on an updated state
  const state = getState();

  // health
  const { status, criticals } = getAppStatus(state);
  if (previous.lastAppStatus !== status) {
    previous.lastAppStatus = status;
    logger.info(`New health status ${previous.lastAppStatus}==>${status}`);
    if (status === HEALTH_STATUS_WARNING) {
      skipThisTick = true;
    } else if (status === HEALTH_STATUS_CRITICAL) {
      skipThisTick = true;
      const isPlaying = !!getPlayingTimebarId(state);
      if (isPlaying) {
        dispatch(addOnce(
          'global',
          'danger',
          `Application have detected an important slow-down and switched to pause (${criticals.join(', ')})`
        ));
        dispatch(pause());
      }
    } else {
      dispatch(addOnce('Application went back to healthy state'));
    }
  }


  // something has changed
  const somethingHasChanged = state !== previous.state;
  let dataMap = previous.dataMap;

  series([
    // data map
    (callback) => {
      if (skipThisTick || !somethingHasChanged) {
        return callback(null);
      }

      execution.start('dataMap generation');
      dataMap = dataMapGenerator(state);
      execution.stop('dataMap generation');

      return callback(null);
    },
    // request data
    (callback) => {
      if (skipThisTick) {
        return callback(null);
      }
      if (dataMap.perRemoteId === previous.lastRequestedDataMap) {
        return callback(null);
      }

      execution.start('data requests');
      request(dataMap.perRemoteId, previous.lastRequestedDataMap, server.message);

      // request module should receive only the last 'analysed' map
      previous.lastRequestedDataMap = dataMap.perRemoteId;

      execution.stop('data requests');
      return callback(null);
    },
    // pull data
    (callback) => {
      if (skipThisTick) {
        callback(null);
        return;
      }

      execution.start('data retrieving');
      server.requestData((dataToInject) => {
        execution.stop('data retrieving');

        // health
        execution.start('health injection');
        dispatch(updateHealth(dataToInject));
        execution.stop('health injection');

        // viewData
        execution.start('data injection');
        dispatch(updateViewData(previous.dataMap.perView, dataMap.perView, dataToInject.data));
        execution.stop('data injection', Object.keys(dataToInject.data).length);
        callback(null);
      });
    },
    // cache invalidation
    (callback) => {
      if (skipThisTick) {
        callback(null);
        return;
      }

      const lastCacheInvalidation = getLastCacheInvalidation(state);
      if (Date.now() - lastCacheInvalidation >= CACHE_INVALIDATION_FREQUENCY) {
        execution.start('cache invalidation');
        dispatch(updateCacheInvalidation(Date.now())); // schedule next run
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap.perRemoteId);
        execution.stop('cache invalidation');
      }
      callback(null);
    },
    // sync windows
    (callback) => {
      if (!windowsHasChanged) {
        callback(null);
        return;
      }

      execution.start('windows handling');
      windowsObserver(state, (err) => {
        if (err) {
          execution.stop('windows handling');
          callback(err);
          return;
        }

        // only one time to avoid recursion
        if (isWindowsOpened === false) {
          dispatch(setWindowsAsOpened());
        }

        logger.debug('windows synchronized');
        execution.stop('windows handling');
        callback(null);
      });
    },
    (callback) => {
      // too long tick
      const duration = process.hrtime(tickStart);
      const durationMs = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);

      if (durationMs > HSC_ORCHESTRATION_WARNING_STEP) {
        logger.warn(`orchestration done in ${durationMs}ms`);
      }

      const mainStatus = getMainStatus(state);
      if (durationMs > HSC_ORCHESTRATION_CRITICAL_STEP && mainStatus !== HEALTH_STATUS_CRITICAL) {
        dispatch(updateMainStatus(HEALTH_STATUS_CRITICAL));
      } else if (durationMs > HSC_ORCHESTRATION_WARNING_STEP
        && mainStatus !== HEALTH_STATUS_WARNING) {
        dispatch(updateMainStatus(HEALTH_STATUS_WARNING));
      } else if (mainStatus !== HEALTH_STATUS_HEALTHY) {
        dispatch(updateMainStatus(HEALTH_STATUS_HEALTHY));
      }

      callback(null);
    },
  ], (err) => {
    if (err) {
      logger.error(err);
    }

    // persist state for next tick
    if (somethingHasChanged) {
      previous.state = state;
      previous.dataMap = dataMap;
    }

    execution.stop(
      'global',
      `somethingHasChanged:${somethingHasChanged}`
      + ` isWindowsOpened:${isWindowsOpened}`
    );
    execution.print();

    // schedule next tick
    schedule();
  });
}
