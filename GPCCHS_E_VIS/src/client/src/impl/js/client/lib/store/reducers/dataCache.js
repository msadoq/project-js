import _ from 'lodash';
import u from 'updeep';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:reducers:dataCache');

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_RANGE_PAYLOADS: {
      const localIdState = updateRangePayloads(stateDataCache, action);
      const update = {};
      update[action.payload.remoteId] = {};
      update[action.payload.remoteId][action.payload.localId] = localIdState;
      return u(update, stateDataCache);
    }
    case types.DATA_IMPORT_ONE_PAYLOAD: {
      const update = {};
      update[action.payload.remoteId] = {};
      update[action.payload.remoteId][action.payload.localId] = action.payload.valuesToDisplay;
      return u(update, stateDataCache);
    }
    default:
      return stateDataCache;
  }
}

function updateRangePayloads(stateDataCache, action) {
  const newLocalIdState = { data: {}, index: [] };
  const remoteId = action.payload.remoteId;
  const localId = action.payload.localId;
  const lower = action.payload.interval[0];
  const upper = action.payload.interval[1];

  if (_.get(stateDataCache, [remoteId, localId])) {
    // Cleaning of values outside interval
    _.each(stateDataCache[remoteId][localId].index, (timestamp) => {
      if (timestamp >= lower && timestamp <= upper) {
        newLocalIdState.index.push(timestamp);
        newLocalIdState.data[timestamp] = stateDataCache[remoteId][localId].data[timestamp];
      }
    });
  }
  // Add new values
  const keys = Object.keys(action.payload.valuesToDisplay);
  let index = 0;
  keys.forEach((item) => { // ordering keys
    const insertIndex = _.findIndex(newLocalIdState.index, time => time > item, index);
    if (insertIndex < 0) {
      newLocalIdState.index.push(item);
      index = newLocalIdState.index.length - 1;
    } else {
      newLocalIdState.index = _.concat(_.slice(newLocalIdState.index, 0, insertIndex), item,
      _.slice(newLocalIdState.index, insertIndex));
      index = insertIndex;
    }
  });
  Object.assign(newLocalIdState.data, action.payload.valuesToDisplay);
  return newLocalIdState;
}
