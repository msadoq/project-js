// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of dataMap selector .
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of preparePubSup middleware .
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : creatin of selectors on datamap
// VERSION : 1.1.2 : DM : #6700 : 27/07/2017 : update preparePubSub and add unit tests for it
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Update selector for subscruption store observer
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';
import dataMapGenerator from './map';
import flattenDataId from '../common/flattenDataId';
import isTimestampInInterval from '../common/intervals/includesTimestamp';


export const isDataIdInDatamapLast = (state, dataId) => {
  const dataMap = dataMapGenerator(state);
  const flatDataId = flattenDataId(dataId);
  const lastTbdIds = Object.keys(dataMap.perLastTbdId);
  return _filter(lastTbdIds, (tbdId) => {
    const fDataId = flattenDataId(dataMap.perLastTbdId[tbdId].dataId);
    return fDataId === flatDataId;
  });
};

export const isTimestampInLastInterval = (dataMap, { tbdId, timestamp }) => {
  if (!dataMap.expectedLastIntervals[tbdId]) {
    return false;
  }
  const intervals = _reduce(dataMap.expectedLastIntervals[tbdId], (acc, value) => {
    acc.push(value.expectedInterval);
    return acc;
  }, []);
  return isTimestampInInterval(intervals, timestamp);
};

export const isTimestampInLastDatamapInterval = (state, { tbdId, timestamp }) => {
  const dataMap = dataMapGenerator(state);
  return isTimestampInLastInterval(dataMap, { tbdId, timestamp });
};

export const getCurrentDisplayedLastTbdId = createSelector(
  dataMapGenerator,
  (dataMap) => {
    const knownTbdIds = [];
    const { perLastTbdId } = dataMap;
    const perLastTbdIdArray = Object.keys(perLastTbdId);

    for (let i = 0; i < perLastTbdIdArray.length; i += 1) {
      knownTbdIds.push({
        tbdId: perLastTbdIdArray[i],
        dataId: perLastTbdId[perLastTbdIdArray[i]].dataId,
      });
    }
    return knownTbdIds;
  }
);
