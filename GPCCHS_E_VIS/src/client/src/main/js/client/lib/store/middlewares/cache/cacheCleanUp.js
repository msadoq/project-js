// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Modify cachecleanup middleware and its test
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// END-HISTORY
// ====================================================================

import dataMapGenerator from 'dataManager/map';
import mergeIntervals from 'common/intervals/merge';
import { resetKnownRange } from 'store/actions/knownRanges';
import * as types from 'store/types';

let lastCleanTimestamp = new Date();

const cleanCache = (cleanTrigger, lokiManager) => ({ getState, dispatch }) => next => (action) => {
  const now = new Date();
  if (now - lastCleanTimestamp >= cleanTrigger ||
      action.type === types.HSC_UPDATE_LAST_CACHE_INVALIDATION) {
    const state = getState();
    const { expectedRangeIntervals } = dataMapGenerator(state);
    const tbdIds = Object.keys(expectedRangeIntervals);
    const toKeep = {};

    for (let i = 0; i < tbdIds.length; i += 1) {
      let merged = [];
      const currentExpectedRange = expectedRangeIntervals[tbdIds[i]];
      const localsIds = Object.keys(currentExpectedRange);
      for (let j = 0; j < localsIds.length; j += 1) {
        merged = mergeIntervals(merged, currentExpectedRange[localsIds[j]].expectedInterval);
      }
      toKeep[tbdIds[i]] = {
        interval: merged,
      };
    }
    lokiManager.removeAllExceptIntervals(toKeep);
    lastCleanTimestamp = new Date();
    dispatch(resetKnownRange(toKeep));
  }
  return next(action);
};

export default cleanCache;
