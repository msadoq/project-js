import _round from 'lodash/round';
import _cloneDeep from 'lodash/cloneDeep';
import globalConstants from 'common/constants';
import executionMonitor from 'common/execution';
import getLogger from 'common/log';
import { get } from 'common/parameters';

import { getStore } from '../store/mainStore';
import {
  getWindowsOpened,
  getPlayingTimebarId,
  getLastCacheInvalidation,
  getSlowRenderers,
} from '../store/selectors/hsc';
import {
  setWindowsAsOpened,
  updateCacheInvalidation,
  pause,
} from '../store/actions/hsc';
import { rpc, send } from './childProcess';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import windowsObserver from './windows';
import { updateCursors } from '../store/actions/timebars';
import { getTimebar } from '../store/selectors/timebars';
import { nextCurrent, computeCursors } from './play';

import { updateViewData } from '../store/actions/viewData';

// TODO : test server restart, new workspace, workspace opening, new window

const logger = getLogger('main:orchestration');
const execution = executionMonitor('orchestration');

let nextTick = null;
let lastTick = null;
let tickStart = null;
const previous = {
  state: {},
  dataMap: {}, // only modified when running request logic (should compare current and previous)
  viewMap: {},
  slowRenderers: [],
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

// If at least 1 renderer slow down, bypass current tick
// It avoid renderer processes to be stuned.
export function circuitBreakerForRenderers(state, previousSlowRenderers) {
  const slowRenderers = getSlowRenderers(state);

  if (Object.keys(slowRenderers).length > 0) {
    if (slowRenderers !== previousSlowRenderers) {
      const renderers = Object
        .keys(slowRenderers)
        .map(k => `${k} (${slowRenderers[k]}ms)`).join(', ');

      logger.warn(`Slow renderers detected ${renderers}`);
    }
  } else if (Object.keys(previousSlowRenderers).length > 0) {
    logger.warn('No more slow renderers');
  }

  return {
    skip: Object.keys(slowRenderers).length > 0,
    slowRenderers,
  };
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
  previous.slowRenderers = {};

  const { dispatch } = getStore();
  dispatch(pause());
  lastTick = null;
}

export function tick() {
  execution.start('global');

  tickStart = process.hrtime();

  // store
  const { getState, dispatch } = getStore();
  const state = getState();

  // Bypass current tick if renderers are too busy
  const {
    skip,
    slowRenderers,
  } = circuitBreakerForRenderers(getState(), previous.slowRenderers);
  previous.slowRenderers = slowRenderers;
  // Bypass only if circuit breaker is activated
  if (get('RENDERER_CIRCUIT_BREAKER') === 'on' && skip) {
    logger.info('Slow renderer detected, bypass current tick');
    done();
    return;
  }

  // last tick time
  const lastTickTime = lastTick;
  lastTick = Date.now();

  // something has changed
  const somethingHasChanged = state !== previous.state;
  let dataMap;
  let viewMap;
  if (somethingHasChanged) {
    const map = dataMapGenerator(state);
    dataMap = map.perRemoteId;
    viewMap = map.perView;
  } else {
    dataMap = previous.dataMap;
    viewMap = previous.viewMap;
  }

  // play or pause
  const playingTimebarId = getPlayingTimebarId(state);
  // windows
  const isWindowsOpened = getWindowsOpened(state);
  const windowsHasChanged = state.windows !== previous.state.windows;
  // // const windowsIsModified = _find(state.windows, (window, winId) =>
  // //   (previous.state.windows && previous.state.windows[winId]
  // //   && window.isModified && !previous.state.windows[winId].isModified));
  // // queued data to inject
  // const dataToInject = getAndResetQueue();

  if (isWindowsOpened) {
    // playing
    if (playingTimebarId) {
      execution.start('play management');
      const playingTimebar = getTimebar(state, playingTimebarId) || 'empty';

      // next cursors
      const newCurrent = nextCurrent(
        playingTimebar.visuWindow.current,
        playingTimebar.speed,
        (Date.now() - lastTickTime)
      );
      const nextCursors = computeCursors(
        newCurrent,
        playingTimebar.visuWindow.lower,
        playingTimebar.visuWindow.upper,
        playingTimebar.slideWindow.lower,
        playingTimebar.slideWindow.upper,
        playingTimebar.mode,
        globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN,
      );

      // dispatch
      dispatch(updateCursors(
        playingTimebarId,
        nextCursors.visuWindow,
        nextCursors.slideWindow
      ));

      execution.stop('play management');
    }
    // TODO: remove copies when viewMap update is done after dispatch
    // do a deep copy to use the real oldViewMap for updateViewData
    const oldViewMap = _cloneDeep(previous.viewMap);
    const newViewMap = _cloneDeep(viewMap);
    // pulled data
    rpc(1, 'getData', null, (dataToInject) => {
      // TODO continue orchestration in this callback
      dispatch(updateViewData(oldViewMap, newViewMap, dataToInject));
    });

    if (dataMap !== previous.dataMap) {
      execution.start('requests');
      // request data
      // TODO : in play mode hack the state visuWindow OR pass play configuration to reducer, ask
      //        for next tick data only
      request(state, dataMap, previous.dataMap, send);

      // should be done here due to request specificity (works on map and last)
      previous.dataMap = dataMap;

      execution.stop('requests');
    }

    // cache invalidation (only at a certain frequency)
    const lastCacheInvalidation = getLastCacheInvalidation(state);
    if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
      execution.start('cacheInvalidation');
      dispatch(updateCacheInvalidation(Date.now())); // schedule next run
      send(1, 'cleanupCache', dataMap);
      execution.stop('cacheInvalidation');
    }
  }

  function done() {
    // persist state for next tick
    if (somethingHasChanged) {
      previous.state = state;
      previous.viewMap = viewMap;
    }

    // too long tick shortcut
    const duration = process.hrtime(tickStart);
    if (duration[0] > 0 || duration[1] > globalConstants.HSC_ORCHESTRATION_WARNING) {
      // TODO : protect against blocking (by increasing HSC_ORCHESTRATION_FREQUENCY?)
      logger.warn(`orchestration done in ${(duration[0] * 1e3) + _round(duration[1] / 1e6, 6)}ms`);
    }

    execution.stop(
      'global',
      `somethingHasChanged:${somethingHasChanged}`
      + ` isWindowsOpened:${isWindowsOpened}`
      + ` playingTimebarId:${playingTimebarId}`
      // + ` dataToInject:${(dataToInject || []).length}`
    );
    execution.print();
    execution.reset();

    // schedule next tick
    schedule();
  }

  // sync windows
  if (windowsHasChanged) {
    execution.start('windows');
    windowsObserver(state, (err) => {
      if (err) {
        logger.error(err);
      }

      logger.verbose('windows synchronized');
      // if (windowsIsModified) {
      //   updateModifiedWinTitle();
      // }

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
