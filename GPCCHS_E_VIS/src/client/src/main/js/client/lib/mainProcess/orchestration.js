import _round from 'lodash/round';
import _isEmpty from 'lodash/isEmpty';
import { series } from 'async';
import { tmpdir } from 'os';
import { get } from '../common/configurationManager';
import {
  HSC_ORCHESTRATION_WARNING_STEP,
  HSC_ORCHESTRATION_CRITICAL_STEP,
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
  IPC_METHOD_CACHE_CLEANUP,
  HSC_CRITICAL_SWITCH_PAUSE_DELAY,
  HSC_PUBSUB_MONITORING_FREQUENCY,
} from '../constants';
import executionMonitor from '../common/logManager/execution';
import getLogger from '../common/logManager';

import { server } from './ipc';
import { getStore } from './store';
import {
  getLastCacheInvalidation,
  getPlayingTimebarId,
} from '../store/reducers/hsc';
import { getHealthMap, getMainStatus } from '../store/reducers/health';
import {
  updateCacheInvalidation,
  pause,
} from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import displayQueries from '../dataManager/displayQueries';
import { addOnce } from '../store/actions/messages';
import { updateViewData } from '../store/actions/viewData';
import { updateHealth, updateMainStatus } from '../store/actions/health';

let logger;

let nextTick = null;
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
  if (get('DUMP') === 'on') {
    const dumpDir = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
    logger.warn(`Received payloads are dumped in ${dumpDir}`);
  }
  schedule();
}

export function stop() {
  clear();
  clearCritical();
  try { // TODO dbrugne remove try/catch once lifecycle is stable
    getStore().dispatch(pause());
  } catch (e) {
    if (logger) {
      logger.error(e);
    }
  }
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

  // data map
  execution.start('dataMap generation');
  const dataMap = dataMapGenerator(getState());
  execution.stop('dataMap generation');

  series([
    // utils & server health
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
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap); // TODO dbrugne diagnose if this is not the origin of the weird dataMap mutation
        execution.stop('cache invalidation');

        logger.debug('cache invalidation requested, skipping current tick');
        skipThisTick = true;
      }
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
        // Note: test added by dbrugne to avoid Redux action logger flood
        if (
          previous.injectionIntervals !== dataMap.expectedIntervals
          || previous.injectionViewMap !== dataMap.perView
          || Object.keys(dataToInject.data).length
        ) {
          execution.start('data injection');

          dispatch(
            updateViewData(
              previous.injectionViewMap,
              dataMap.perView,
              previous.injectionIntervals,
              dataMap.expectedIntervals,
              dataToInject.data
            )
          );

          const message = Object.keys(dataToInject.data).length
            ? `${Object.keys(dataToInject.data).length} remoteId`
            : undefined;
          execution.stop('data injection', message);

          previous.injectionIntervals = dataMap.expectedIntervals;
          previous.injectionRemoteIdMap = dataMap.perRemoteId;
          previous.injectionViewMap = dataMap.perView;
        }

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
