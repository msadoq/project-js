import _round from 'lodash/round';
import globalConstants from 'common/constants';
import executionMonitor from 'common/execution';
import debug from '../common/debug/mainDebug';
import { getStore } from '../store/mainStore';
import {
  getWindowsOpened,
  getPlayingTimebarId,
  getLastCacheInvalidation,
} from '../store/selectors/hsc';
import {
  setWindowsAsOpened,
  updateCacheInvalidation,
} from '../store/actions/hsc';
import { getWebsocket } from './websocket';
import dataMapGenerator from '../dataManager/map/dataMapGenerator';
import viewMapGenerator from '../dataManager/map/viewMapGenerator';
import request from '../dataManager/request';
import inject from '../dataManager/inject';
import windowsObserver from './windows';

// TODO : handle play and pause
// TODO : test server restart, new workspace, workspace opening, new window

const logger = debug('main:orchestration');
const execution = executionMonitor('orchestration');

let nextTick = null;
let tickStart = null;
const previous = {
  state: {},
  dataMap: {}, // only modified when running request logic (should compare current and previous)
  viewMap: {},
};
let dataQueue = [];

export function addToQueue(data) {
  dataQueue.push(data);
}

export function getAndResetQueue() {
  const data = dataQueue;
  dataQueue = [];
  return data;
}

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
  getAndResetQueue();
  previous.state = {};
  previous.dataMap = {};
  previous.viewMap = {};
}

export function tick() {
  execution.start('global');
  tickStart = process.hrtime();

  // store
  const { getState, dispatch } = getStore();
  const state = getState();

  // something has changed
  const somethingHasChanged = state !== previous.state;
  const dataMap = somethingHasChanged ? dataMapGenerator(state) : previous.dataMap;
  const viewMap = somethingHasChanged ? viewMapGenerator(state) : previous.viewMap;

  // play or pause
  const playingTimebarId = getPlayingTimebarId(state);

  // windows opened or not
  const isWindowsOpened = getWindowsOpened(state);

  // queued data to inject
  const dataToInject = getAndResetQueue();

  if (isWindowsOpened) {
    // pulled data
    if (dataToInject.length) {
      execution.start('data injection');
      // TODO : in play mode inject + visuwindow
      dataToInject.forEach(payload => inject(state, dispatch, viewMap, payload));
      execution.stop('data injection');
    }

    if (dataMap !== previous.dataMap) {
      execution.start('requests');
      // request data
      // TODO : in play mode hack the state visuWindow OR pass play configuration to reducer, ask
      //        for next tick data only
      request(state, dispatch, dataMap, previous.dataMap);

      // should be done here due to request specificity (works on map and last)
      previous.dataMap = dataMap;

      execution.stop('requests');
    }

    // cache invalidation (only at a certain frequency)
    const lastCacheInvalidation = getLastCacheInvalidation(state);
    if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
      execution.start('cacheInvalidation');
      dispatch(updateCacheInvalidation(Date.now())); // schedule next run
      getWebsocket().write({
        event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
        payload: dataMap,
      });
      execution.stop('cacheInvalidation');
    }

    // ask for next data chunk from server
    getWebsocket().write({ event: globalConstants.EVENT_PULL });
  }

  function done() {
    // persist state for next tick
    if (somethingHasChanged) {
      previous.state = state;
      previous.viewMap = viewMap;
    }

    // 50ms shortcut
    const duration = process.hrtime(tickStart);
    if (duration[0] > 0 || duration[1] > globalConstants.HSC_ORCHESTRATION_WARNING) {
      // TODO : protect against blocking (by increasing HSC_ORCHESTRATION_FREQUENCY?)
      logger.warn(`orchestration done in ${(duration[0] * 1e3) + _round(duration[1] / 1e6, 6)}ms`);
    }

    execution.stop(
      'global',
      `somethingHasChanged:${somethingHasChanged}`
      + `isWindowsOpened:${isWindowsOpened}`
      + `playingTimebarId:${playingTimebarId}`
      + `dataToInject:${dataToInject.length}`
    );
    execution.print();
    execution.reset();

    // schedule next tick
    schedule();
  }

  // sync windows
  if (somethingHasChanged) {
    execution.start('windows');
    windowsObserver(state, (err) => {
      if (err) {
        logger.error(err);
      }

      logger.verbose('windows synchronized');

      // only one time to avoid recursion
      if (isWindowsOpened === false) {
        dispatch(setWindowsAsOpened());
      }
      execution.stop('windows');
      done();
    });
  } else {
    done();
  }
}
