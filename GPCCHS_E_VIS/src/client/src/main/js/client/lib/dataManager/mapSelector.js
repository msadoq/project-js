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
