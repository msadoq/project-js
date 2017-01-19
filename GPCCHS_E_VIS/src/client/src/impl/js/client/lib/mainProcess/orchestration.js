import _round from 'lodash/round';
import { series } from 'async';
import globalConstants from 'common/constants';
import executionMonitor from 'common/log/execution';
import getLogger from 'common/log';
// import { get } from 'common/parameters';

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
import { server } from './ipc';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import windowsObserver from './windows';

import { updateViewData } from '../store/actions/viewData';
import { handlePlay } from '../store/actions/timebars';

const logger = getLogger('main:orchestration');
const execution = executionMonitor('orchestration');

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
  lastTick = Date.now();

  // store
  const { getState, dispatch } = getStore();

  const isWindowsOpened = getWindowsOpened(getState());
  const windowsHasChanged = getState().windows !== previous.state.windows;

  // play management (before dataMap generation, allow tick to work on a up to date state)
  if (isWindowsOpened) {
    execution.start('play management');
    dispatch(handlePlay(lastTickTime));
    execution.stop('play management');
  }

  // something has changed
  const state = getState(); // works on updated state (with play handling)
  const somethingHasChanged = state !== previous.state;
  let dataMap;
  if (somethingHasChanged) {
    dataMap = dataMapGenerator(state);
  } else {
    dataMap = previous.dataMap;
  }

  series([
    // request data
    (callback) => {
      if (dataMap.perRemoteId === previous.lastRequestedDataMap) {
        return callback(null);
      }

      execution.start('requests');
      request(dataMap.perRemoteId, previous.lastRequestedDataMap, server.message);

      // request module should receive only the last 'analysed' map
      previous.lastRequestedDataMap = dataMap.perRemoteId;

      execution.stop('requests');
      return callback(null);
    },
    // pull data
    (callback) => {
      server.requestData((dataToInject) => {
        execution.start('data injection');
        dispatch(updateViewData(previous.dataMap.perView, dataMap.perView, dataToInject));
        execution.stop('data injection', Object.keys(dataToInject).length);
        return callback(null);
      });
    },
    // cache invalidation
    (callback) => {
      const lastCacheInvalidation = getLastCacheInvalidation(state);
      if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
        execution.start('cacheInvalidation');
        dispatch(updateCacheInvalidation(Date.now())); // schedule next run
        server.message(globalConstants.IPC_METHOD_CACHE_CLEANUP, dataMap.perRemoteId);
        execution.stop('cacheInvalidation');
      }
      return callback(null);
    },
    // sync windows
    (callback) => {
      if (!windowsHasChanged) {
        return callback(null);
      }

      execution.start('windows');
      windowsObserver(state, (err) => {
        execution.stop('windows');
        if (err) {
          return callback(err);
        }

        // only one time to avoid recursion
        if (isWindowsOpened === false) {
          dispatch(setWindowsAsOpened());
        }

        logger.debug('windows synchronized');
        return callback(null);
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
    }
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
    execution.reset();

    // schedule next tick
    schedule();
  });
}
