import _round from 'lodash/round';
import _reduce from 'lodash/reduce';
import _each from 'lodash/each';
import _map from 'lodash/map';
import u from 'updeep';
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
  pause,
} from '../store/actions/hsc';
import { getWebsocket } from './websocket';
import dataMapGenerator from '../dataManager/map';
import request from '../dataManager/request';
import inject from '../dataManager/inject';
import windowsObserver from './windows';
import { updateCursors } from '../store/actions/timebars';
import { getTimebar } from '../store/selectors/timebars';
import { nextCurrent, computeCursors } from './play';

import structures from '../dataManager/structures';
import vivl from '../../VIVL/main';
import { updateViewData } from '../store/actions/viewData';

// TODO : test server restart, new workspace, workspace opening, new window

const logger = debug('main:orchestration');
const execution = executionMonitor('orchestration');

let nextTick = null;
let lastTick = null;
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

  const { dispatch } = getStore();
  dispatch(pause());
  lastTick = null;
}

export function tick() {
  execution.start('global');
  tickStart = process.hrtime();

  // websocket
  const websocket = getWebsocket();

  // store
  const { getState, dispatch } = getStore();
  const state = getState();

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

  // queued data to inject
  const dataToInject = getAndResetQueue();

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
      const currentUpperMargin = 1 / 100; // TODO constants or removing for a real realtime forecast
      const nextCursors = computeCursors(
        newCurrent,
        playingTimebar.visuWindow.lower,
        playingTimebar.visuWindow.upper,
        playingTimebar.slideWindow.lower,
        playingTimebar.slideWindow.upper,
        playingTimebar.mode,
        currentUpperMargin
      );

      // dispatch
      dispatch(updateCursors(
        playingTimebarId,
        nextCursors.visuWindow,
        nextCursors.slideWindow
      ));

      execution.stop('play management');
    }

    // update of viewData
    if (viewMap !== previous.viewMap) {
      // check missing views
      let newState;
  // viewMap =
  // { viewId:
  //  { type: 'TextView || PlotView',
  //    structureType: 'last || range',
  //    entryPoints:
  //     { epName: [Object],
  //       epName: [Object], } },}
      const missingViewId = _reduce(previous.viewMap, (list, view, viewId) => {
        if (!viewMap[viewId]) {
          list.push(viewId);
        }
        return list;
      }, []);
      // remove view id from viewData
      missingViewId.forEach((id) => {
        newState = u({ viewData: u.omit(id) }, newState || state);
      });
      // check missing or updated entry points
      _each(viewMap, (view, id) => {
        const structureType = vivl(view.type, 'structureType')();
        const previousView = previous.viewMap[id];
        if (!previousView) {
          return;
        }

        _each(previousView.entryPoints, (ep, epName) => {
          // removed entry point
          if (!view.entryPoints[epName]) {
            try {
              newState = structures(structureType, 'removeEpData')(newState || state, id, epName);
            } catch (e) {
              logger.warn(`No removeEpData for ${structureType} view`);
            }
            return;
          }

          const newEp = view.entryPoints[epName];
          // no update on entry points
          if (ep === newEp) {
            return;
          }
          let isUpdated = false;
          switch (structureType) { // eslint-disable-line default-case
            case globalConstants.DATASTRUCTURETYPE_LAST:
              if (ep.field !== newEp.field) {
                isUpdated = true;
              }
              break;
            case globalConstants.DATASTRUCTURETYPE_RANGE:
              if (ep.fieldX !== newEp.fieldX || ep.fieldY !== newEp.fieldY) {
                isUpdated = true;
              }
          }
          // EP definition modified: remove entry point from viewData
          if (ep.remoteId !== newEp.remoteId || isUpdated) {
            try {
              newState = structures(structureType, 'removeEpData')(newState || state, id, epName);
            } catch (e) {
              logger.warn(`No removeEpData for ${structureType} view`);
            }
            return;
          }
          // update on expected interval
          if (ep.expectedInterval[0] !== newEp.expectedInterval[0]
           || ep.expectedInterval[1] !== newEp.expectedInterval[1]) {
            try {
              newState = structures(structureType, 'cleanData')(newState || state, id, epName,
                                    _map(newEp.expectedInterval, bound => bound + newEp.offset));
            } catch (e) {
              logger.warn(`No cleanData for ${structureType} view`);
            }
          }
        });
      });
      if (newState) {
        dispatch(updateViewData(newState.viewData));
      }
    }

    // pulled data
    if (dataToInject.length) {
      execution.start('data injection');
      // TODO : in play mode inject + visuwindow
      dataToInject.forEach(payload => inject(getState(), dispatch, viewMap, payload));
      execution.stop('data injection', dataToInject.length);
    }

    if (dataMap !== previous.dataMap) {
      execution.start('requests');
      // request data
      // TODO : in play mode hack the state visuWindow OR pass play configuration to reducer, ask
      //        for next tick data only
      request(state, dataMap, previous.dataMap);

      // should be done here due to request specificity (works on map and last)
      previous.dataMap = dataMap;

      execution.stop('requests');
    }

    // cache invalidation (only at a certain frequency)
    const lastCacheInvalidation = getLastCacheInvalidation(state);
    if (Date.now() - lastCacheInvalidation >= globalConstants.CACHE_INVALIDATION_FREQUENCY) {
      execution.start('cacheInvalidation');
      dispatch(updateCacheInvalidation(Date.now())); // schedule next run
      websocket.write({
        event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
        payload: dataMap,
      });
      execution.stop('cacheInvalidation');
    }

    // ask for next data chunk from server
    websocket.write({ event: globalConstants.EVENT_PULL });
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
      + ` dataToInject:${dataToInject.length}`
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
