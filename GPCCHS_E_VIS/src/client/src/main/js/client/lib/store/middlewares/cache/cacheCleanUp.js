import { get } from '../../../common/configurationManager';
import dataMapGenerator from '../../../dataManager/map';
import { removeAllExceptIntervals } from '../../../serverProcess/models/lokiKnownRangesData';
import mergeIntervals from '../../../common/intervals/merge';

let lastCleanTimestamp = new Date();

const cleanTrigger = get('FORECAST_TRIGGER');
const cleanCache = () => ({ getState }) => next => (action) => {
  const now = new Date();
  if (now - lastCleanTimestamp >= cleanTrigger) {
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
      removeAllExceptIntervals(tbdIds[i], merged);
    }
    lastCleanTimestamp = new Date();
  }
  return next(action);
};

export default cleanCache;
