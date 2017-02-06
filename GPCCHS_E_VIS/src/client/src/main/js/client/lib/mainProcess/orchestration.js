import _round from 'lodash/round';
import { series } from 'async';
import globalConstants from 'common/constants';
import executionMonitor from 'common/log/execution';
import getLogger from 'common/log';
import { server } from './ipc';

import { getStore } from '../store/mainStore';
import {
  getWindowsOpened,
  getLastCacheInvalidation,
  // getSlowRenderers,
} from '../store/selectors/hsc';
import {
  setWindowsAsOpened,
  updateCacheInvalidation,
  pause,
} from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import windowsObserver from './windows';

import { updateViewData } from '../store/actions/viewData';
import { handlePlay } from '../store/actions/timebars';
import { updateHealth } from '../store/actions/health';

const logger = getLogger('main:orchestration');

let nextTick = null;
let lastTick = null;
let tickStart = null;
const previous = {
  state: {},
  dataMap: { perRemoteId: {}, perView: {} },
  lastRequestedDataMap: {},
  slowRenderers: [],
};

// TODO dbrugne
// // If at least 1 renderer slow down, bypass current tick
// // It avoid renderer processes to be stuned.
// export function circuitBreakerForRenderers(state, previousSlowRenderers) {
//   const slowRenderers = getSlowRenderers(state);
//
//   if (Object.keys(slowRenderers).length > 0) {
//     if (slowRenderers !== previousSlowRenderers) {
//       const renderers = Object
//         .keys(slowRenderers)
//         .map(k => `${k} (${slowRenderers[k]}ms)`).join(', ');
//
//       logger.warn(`Slow renderers detected ${renderers}`);
//     }
//   } else if (Object.keys(previousSlowRenderers).length > 0) {
//     logger.warn('No more slow renderers');
//   }
//
//   return {
//     skip: Object.keys(slowRenderers).length > 0,
//     slowRenderers,
//   };
// }

export function schedule() {
  clear(); // avoid concurrency
  // schedule next tick
  nextTick = setTimeout(tick, globalConstants.HSC_ORCHESTRATION_FREQUENCY);
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
  previous.slowRenderers = [];

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

  // TODO : dbrugne
  // // Bypass current tick if renderers are too busy
  // const {
  //   skip,
  //   slowRenderers,
  // } = circuitBreakerForRenderers(getState(), previous.slowRenderers);
  // previous.slowRenderers = slowRenderers;
  // // Bypass only if circuit breaker is activated
  // if (get('RENDERER_CIRCUIT_BREAKER') === 'on' && skip) {
  //   logger.info('Slow renderer detected, bypass current tick');
  //   done();
  //   return;
  // }

  // last tick time
  const lastTickTime = lastTick;

  // store
  const { getState, dispatch } = getStore();

  const isWindowsOpened = getWindowsOpened(getState());
  const windowsHasChanged = getState().windows !== previous.state.windows;

  // play management (before dataMap generation, allow tick to work on a up to date state)
  if (isWindowsOpened) {
    execution.start('play handling');
    lastTick = Date.now();
    const delta = lastTick - lastTickTime;
    dispatch(handlePlay(delta, globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN));
    execution.stop('play handling');
  }

  // something has changed
  const state = getState(); // works on updated state (with play handling)
  const somethingHasChanged = state !== previous.state;
  let dataMap;
  if (somethingHasChanged) {
    execution.start('dataMap generation');
    dataMap = dataMapGenerator(state);
    execution.stop('dataMap generation');
  } else {
    dataMap = previous.dataMap;
  }

  series([
    // request data
    (callback) => {
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
      execution.start('data retrieving');
      server.requestData((dataToInject) => {
        execution.stop('data retrieving');

        // health
        execution.start('health injection');
        dispatch(
          updateHealth(
            dataToInject.dcStatus,
            dataToInject.hssStatus,
            dataToInject.lastPubSubTimestamp
          )
        );
        execution.stop('health injection');

        // viewData
        execution.start('data injection');
        dispatch(updateViewData(previous.dataMap.perView, dataMap.perView, dataToInject.data));
        execution.stop('data injection', Object.keys(dataToInject.data).length);
        return callback(null);
      });
    },
    // cache invalidation
    (callback) => {
      const lastCacheInvalidation = getLastCacheInvalidation(state);
      if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
        execution.start('cache invalidation');
        dispatch(updateCacheInvalidation(Date.now())); // schedule next run
        server.message(globalConstants.IPC_METHOD_CACHE_CLEANUP, dataMap.perRemoteId);
        execution.stop('cache invalidation');
      }
      return callback(null);
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
      if (duration[0] > 0 || duration[1] > globalConstants.HSC_ORCHESTRATION_WARNING) {
        // TODO : protect against blocking (by increasing HSC_ORCHESTRATION_FREQUENCY?)
        logger.warn(
          `orchestration done in ${(duration[0] * 1e3) + _round(duration[1] / 1e6, 6)}ms`
        );
      }
      return callback(null);
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
