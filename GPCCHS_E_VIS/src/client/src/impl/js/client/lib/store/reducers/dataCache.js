import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import u from 'updeep';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOAD: {
      const updateRange = updateRangePayloads(stateDataCache, action);
      const updateOne = updateOnePayloads(stateDataCache, action);
      return u(Object.assign(updateRange, updateOne), stateDataCache);
    }
    default:
      return stateDataCache;
  }
}

function updateRangePayloads(stateDataCache, action) {
  const newState = {};
  // loop on remoteId
  each(action.payload.valuesToDisplay.range, (data, remoteId) => {
    // loop on localId
    each(data, (values, localId) => {
      const lower = values.interval[0];
      const upper = values.interval[1];
      set(newState, [remoteId, localId], {});

      // Existing dataCache
      if (get(stateDataCache, [remoteId, localId])) {
        // Cleaning of values outside interval
        each(Object.keys(stateDataCache[remoteId][localId]), (timestamp) => {
          if (timestamp < lower && timestamp > upper) {
            return;
          }
          newState[remoteId][localId][timestamp] = stateDataCache[remoteId][localId][timestamp];
        });
      }
      // Add new values
      Object.assign(newState[remoteId][localId], values.data);
    });
  });

  return newState;
}

function updateOnePayloads(stateDataCache, action) {
  const newState = {};
  // loop on remoteId
  each(action.payload.valuesToDisplay.one, (data, remoteId) => {
    // loop on localId
    each(data, (value, localId) => {
      set(newState, [remoteId, localId], value);
    });
  });
  return newState;
}
