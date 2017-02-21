import _round from 'lodash/round';
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
import { getWindowsOpened, getLastCacheInvalidation, getPlayingTimebarId } from '../store/selectors/hsc';
import { getHealthMap, getMainStatus } from '../store/selectors/health';
import { setWindowsAsOpened, updateCacheInvalidation, pause } from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import windowsObserver from './windows';
import { addOnce } from '../store/actions/messages';
import { updateViewData } from '../store/actions/viewData';
import { handlePlay } from '../store/actions/timebars';
import { updateHealth, updateMainStatus } from '../store/actions/health';

let logger;

let nextTick = null;
let lastTick = null;
let tickStart = null;
let criticalTimeout = null;
const previous = {
  requestedDataMap: {},
  injectionViewMap: {},
  windowMap: {},
  health: {
    dc: HEALTH_STATUS_HEALTHY,
    hss: HEALTH_STATUS_HEALTHY,
    main: HEALTH_STATUS_HEALTHY,
    windows: HEALTH_STATUS_HEALTHY,
  },
};

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
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap.perRemoteId);
        execution.stop('cache invalidation');

        logger.debug('cache invalidation requested, skipping current tick');
        skipThisTick = true;
      }
      callback(null);
    },
    // request data
    (callback) => {
      if (skipThisTick || dataMap.perRemoteId === previous.requestedDataMap) {
        callback(null);
        return;
      }

      execution.start('data requests');
      request(dataMap.perRemoteId, previous.requestedDataMap, server.message);

      // request module should receive only the last 'analysed' map
      previous.requestedDataMap = dataMap.perRemoteId;

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
      server.requestData((dataToInject) => {
        execution.stop('data retrieving');

        // viewData
        execution.start('data injection');
        dispatch(updateViewData(previous.injectionViewMap, dataMap.perView, dataToInject.data));
        execution.stop('data injection', Object.keys(dataToInject.data).length);

        previous.injectionViewMap = dataMap.perView;

        callback(null);
      });
    },
    // sync windows
    (callback) => {
      const state = getState();
      // TO NOT COMMIT
      // if (state.windows === previous.windowMap) {
      //   callback(null);
      //   return;
      // }
      // TO NOT COMMIT

      previous.windowMap = state.windows;

      execution.start('windows handling');
      windowsObserver(getState(), (err) => {
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
