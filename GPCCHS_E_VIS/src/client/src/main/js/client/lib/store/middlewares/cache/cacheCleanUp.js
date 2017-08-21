import dataMapGenerator from '../../../dataManager/map';
import mergeIntervals from '../../../common/intervals/merge';
import { replaceKnownRanges } from '../../actions/knownRanges';

let lastCleanTimestamp = new Date();

const cleanCache = (cleanTrigger, lokiManager) => ({ getState, dispatch }) => next => (action) => {
  const now = new Date();
  if (now - lastCleanTimestamp >= cleanTrigger) {
    const tbdIdInterval = [];
    const state = getState();
    const { expectedRangeIntervals } = dataMapGenerator(state);
    const tbdIds = Object.keys(expectedRangeIntervals);
    for (let i = 0; i < tbdIds.length; i += 1) {
      let merged = [];
      const currentExpectedRange = expectedRangeIntervals[tbdIds[i]];
      const localsIds = Object.keys(currentExpectedRange);
      for (let j = 0; j < localsIds.length; j += 1) {
        merged = mergeIntervals(merged, currentExpectedRange[localsIds[j]].expectedInterval);
      }
      lokiManager.removeAllExceptIntervals(tbdIds[i], merged);
      tbdIdInterval.push({
        tbdId: tbdIds[i],
        interval: merged,
      });
    }
    lastCleanTimestamp = new Date();
    dispatch(replaceKnownRanges(tbdIdInterval));
  }
  return next(action);
};

export default cleanCache;