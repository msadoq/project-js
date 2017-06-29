import _isEmpty from 'lodash/isEmpty';
import { series } from 'async';
import { tmpdir } from 'os';
import { get } from '../common/configurationManager';
import {
  IPC_METHOD_CACHE_CLEANUP,
} from '../constants';
import executionMonitor from '../common/logManager/execution';
import getLogger from '../common/logManager';

import { server } from './ipc';
import { getStore } from './store';
import {
  getLastCacheInvalidation,
  getPlayingTimebarId,
} from '../store/reducers/hsc';
import {
  updateCacheInvalidation,
  pause,
} from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';
import displayQueries from '../dataManager/displayQueries';
import { updateViewData } from '../store/actions/viewData';

let logger;

let nextTick = null;
const previous = {
  requestedDataMap: {},
  injectionViewMap: {},
  injectionRemoteIdMap: {},
  injectionIntervals: {},
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

export function start() {
  logger = getLogger('main:orchestration');
  if (get('DUMP') === 'on') { // TODO dbrugne factorize in dumpPayloads module
    const dumpDir = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
    logger.warn(`Received payloads are dumped in ${dumpDir}`);
  }
  schedule();
}

export function stop() {
  clear();
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

  // store
  const { getState, dispatch } = getStore();

  // data map
  execution.start('dataMap generation');
  const dataMap = dataMapGenerator(getState());
  execution.stop('dataMap generation');

  series([
    // cache invalidation
    (callback) => {
      const now = Date.now();
      const lastCacheInvalidation = getLastCacheInvalidation(getState());
      if (now - lastCacheInvalidation >= get('CACHE_INVALIDATION_FREQUENCY')) {
        execution.start('cache invalidation');
        dispatch(updateCacheInvalidation(now)); // schedule next run
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap); // TODO dbrugne diagnose if this is not the origin of the weird dataMap mutation
        execution.stop('cache invalidation');

        logger.debug('cache invalidation requested, skipping current tick');
      }
      callback(null);
    },
    // pull data
    (callback) => {
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
