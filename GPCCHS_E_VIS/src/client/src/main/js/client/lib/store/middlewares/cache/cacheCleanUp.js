import dataMapGenerator from '../../../dataManager/map';
import mergeIntervals from '../../../common/intervals/merge';
import { resetKnownRange } from '../../actions/knownRanges';
import * as types from '../../types';

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
