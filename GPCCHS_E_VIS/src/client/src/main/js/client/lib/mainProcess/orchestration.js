import _round from 'lodash/round';
import _reduce from 'lodash/reduce';
import { series } from 'async';
import { get } from 'common/parameters';
import {
  HSC_ORCHESTRATION_WARNING_STEP,
  HSC_ORCHESTRATION_CRITICAL_STEP,
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
  IPC_METHOD_CACHE_CLEANUP,
  HSC_CRITICAL_SWITCH_PAUSE_DELAY,
  HSC_PUBSUB_MONITORING_FREQUENCY,
} from 'common/constants';
import executionMonitor from 'common/log/execution';
import getLogger from 'common/log';

import { server } from './ipc';
import { getStore } from '../store/mainStore';
import {
  getWindowsOpened,
  getLastCacheInvalidation,
  getPlayingTimebarId,
  getForecast,
} from '../store/reducers/hsc';
import { getHealthMap, getMainStatus } from '../store/reducers/health';
import {
  setWindowsAsOpened,
  updateCacheInvalidation,
  pause,
  updateForecast,
} from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import displayQueries from '../dataManager/displayQueries';
import windowsObserver from './windowsManager';
import { addOnce } from '../store/actions/messages';
import { updateViewData } from '../store/actions/viewData';
import { handlePlay } from '../store/actions/timebars';
import { updateHealth, updateMainStatus } from '../store/actions/health';
import { getTimebar } from '../store/reducers/timebars';

let logger;

let nextTick = null;
let lastTick = null;
let tickStart = null;
let criticalTimeout = null;
const previous = {
  requestedDataMap: {},
  injectionViewMap: {},
  injectionRemoteIdMap: {},
  injectionIntervals: {},
  health: {
    dc: HEALTH_STATUS_HEALTHY,
    hss: HEALTH_STATUS_HEALTHY,
    main: HEALTH_STATUS_HEALTHY,
    windows: HEALTH_STATUS_HEALTHY,
  },
};

export function addForecast(expectedIntervals, forecast) {
  // Loop on remoteId/localId and create a new interval
  return _reduce(expectedIntervals, (acc, value, remoteId) =>
    ({ ...acc,
      [remoteId]:
      _reduce(value, (accInt, intervals, localId) =>
        ({ ...accInt,
          [localId]: {
            expectedInterval: [
              intervals.expectedInterval[1],
              intervals.expectedInterval[1] + forecast],
          } })
      , {}) }),
  {});
}


export function schedule() {
  clear(); // avoid concurrency
  // schedule next tick
  nextTick = setTimeout(tick, get('ORCHESTRATION_FREQUENCY'));
}

export function clear() {
  if (!nextTick) {
    return;
  }

  clearTimeout(nextTick);
  nextTick = null;
}

export function clearCritical() {
  if (!criticalTimeout) {
    return;
  }

  clearTimeout(criticalTimeout);
  criticalTimeout = null;
}

export function scheduleCritical() {
  // only if not already scheduled
  if (criticalTimeout !== null) {
    return;
  }
  criticalTimeout = setTimeout(onCritical, HSC_CRITICAL_SWITCH_PAUSE_DELAY);
}

export function onCritical() {
  const { getState, dispatch } = getStore();
  const isPlaying = !!getPlayingTimebarId(getState());

  if (isPlaying) {
    const delay = HSC_CRITICAL_SWITCH_PAUSE_DELAY / 1000;
    logger.warn(`application performance critically low for ${delay}s, switching to pause`);
    dispatch(addOnce(
      'global',
      'danger',
      `Important slow-down detected for ${delay}s, application have switched to pause`
    ));
    dispatch(pause());
  }
}

export function start() {
  logger = getLogger('main:orchestration');
  schedule();
}

export function stop() {
  clear();
  clearCritical();
  getStore().dispatch(pause());
  lastTick = null;
}

export function tick() {
  logger.debug('running tick');
  const execution = executionMonitor('orchestration');
  execution.reset();
  execution.start('global');

  // ticker
  tickStart = process.hrtime();
  let skipThisTick = false;

  // store
  const { getState, dispatch } = getStore();

  const isWindowsOpened = getWindowsOpened(getState());

  // play management (before dataMap generation, allow tick to work on a up to date state)
  if (isWindowsOpened) {
    execution.start('play handling');
    const lastTickTime = lastTick;
    lastTick = Date.now();
    const delta = lastTick - lastTickTime;
    dispatch(handlePlay(delta, get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN')));
    execution.stop('play handling');
  }

  // data map
  execution.start('dataMap generation');
  const dataMap = dataMapGenerator(getState());
  execution.stop('dataMap generation');

  series([
    // dc & server health
    (callback) => {
      execution.start('health retrieving');
      server.requestHealth((data) => {
        execution.stop('health retrieving');

        // health store update
        execution.start('health injection');
        dispatch(updateHealth(data, HSC_PUBSUB_MONITORING_FREQUENCY));
        execution.stop('health injection');

        callback(null);
      });
    },
    // health management
    (callback) => {
      const state = getState();
      const health = getHealthMap(state);

      // log each transition
      Object.keys(health).forEach(
        (k) => {
          if (previous.health[k] !== health[k]) {
            logger.debug(`new ${k} health status ${previous.health[k]}==>${health[k]}`);
          }
        }
      );

      // schedule "pause switching" if at least one service is critical
      if (
        health.dc === HEALTH_STATUS_CRITICAL
        || health.hss === HEALTH_STATUS_CRITICAL
        || health.main === HEALTH_STATUS_CRITICAL
        || health.windows === HEALTH_STATUS_CRITICAL
      ) {
        if (criticalTimeout === null) {
          // not already schedule, log it
          logger.debug('schedule switch to pause action due to critical slow-down level');
          scheduleCritical();
        }
      }

      // cancel "pause switching" if now the app is healthy enough
      if (
        health.dc !== HEALTH_STATUS_CRITICAL
        && health.hss !== HEALTH_STATUS_CRITICAL
        && health.main !== HEALTH_STATUS_CRITICAL
        && health.windows !== HEALTH_STATUS_CRITICAL
      ) {
        if (criticalTimeout !== null) {
          logger.silly('cancel switch to pause action, slow-down was reduced');
          clearCritical();
        }
      }

      // skip the tick if main or windows are warning or critical
      if (
        health.main === HEALTH_STATUS_WARNING
        || health.windows === HEALTH_STATUS_WARNING
        || health.main === HEALTH_STATUS_CRITICAL
        || health.windows === HEALTH_STATUS_CRITICAL
      ) {
        logger.debug('slow-down detected, skipping current tick');
        skipThisTick = true;
      }

      previous.health = health;
      callback(null);
    },
    // cache invalidation
    (callback) => {
      if (skipThisTick) {
        callback(null);
        return;
      }

      const now = Date.now();
      const lastCacheInvalidation = getLastCacheInvalidation(getState());
      if (now - lastCacheInvalidation >= get('CACHE_INVALIDATION_FREQUENCY')) {
        execution.start('cache invalidation');
        dispatch(updateCacheInvalidation(now)); // schedule next run
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap);
        execution.stop('cache invalidation');

        logger.debug('cache invalidation requested, skipping current tick');
        skipThisTick = true;
      }
      callback(null);
    },
    // request data
    (callback) => {
      if (skipThisTick || dataMap.expectedIntervals === previous.expectedIntervals) {
        callback(null);
        return;
      }

      execution.start('data requests');
      const timebarUuid = getPlayingTimebarId(getState());
      // Add forecast in play mode
      let forecastIntervals;
      if (timebarUuid) {
        // Get playing mode
        const { visuWindow } = getTimebar(getState(), { timebarUuid });
        const { upper } = visuWindow;
        // Check old forecast
        const lastForecast = getForecast(getState());
        if (!lastForecast || lastForecast - upper < 100) {
          const forecastTime = get('FORECAST');
          forecastIntervals = addForecast(dataMap.expectedIntervals, forecastTime);
          dispatch(updateForecast(upper + forecastTime));
          request(dataMap, previous, forecastIntervals, server.message);
        }
      } else {
        request(dataMap, previous, forecastIntervals, server.message);
      }

      // request module should receive only the last 'analysed' map
      previous.perRemoteId = dataMap.perRemoteId;
      previous.expectedIntervals = dataMap.expectedIntervals;

      execution.stop('data requests');
      callback(null);
    },
    // pull data
    (callback) => {
      if (skipThisTick) {
        callback(null);
        return;
      }

      execution.start('data retrieving');
      // Create object with data to display
      const isPlayingMode = !!getPlayingTimebarId(getState());
      const queries = displayQueries(previous, dataMap, isPlayingMode);
      server.requestData(queries, (dataToInject) => {
        execution.stop('data retrieving');
        // viewData
        execution.start('data injection');
        dispatch(updateViewData(
          previous.injectionViewMap,
          dataMap.perView,
          previous.injectionIntervals,
          dataMap.expectedIntervals,
          dataToInject.data));
        const message = Object.keys(dataToInject.data).length
          ? `${Object.keys(dataToInject.data).length} remoteId`
          : undefined;
        execution.stop('data injection', message);

        if (Object.keys(queries).length && Object.keys(dataToInject.data).length) {
          previous.injectionViewMap = dataMap.perView;
          previous.injectionRemoteIdMap = dataMap.perRemoteId;
          previous.injectionIntervals = dataMap.expectedIntervals;
        }
        callback(null);
      });
    },
    // sync windows
    (callback) => {
      execution.start('windows handling');
      windowsObserver((err) => {
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
    // too long tick
    (callback) => {
      const duration = process.hrtime(tickStart);
      const durationMs = (duration[0] * 1e3) + _round(duration[1] / 1e6, 6);

      if (durationMs > HSC_ORCHESTRATION_WARNING_STEP) {
        logger.warn(`orchestration done in ${durationMs}ms`);
      }

      // TODO factorize in thunk action creator
      const mainStatus = getMainStatus(getState());
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

    execution.stop('global');
    execution.print();

    // schedule next tick
    schedule();
  });
}
