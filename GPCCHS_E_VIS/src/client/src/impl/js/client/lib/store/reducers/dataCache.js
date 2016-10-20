import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import u from 'updeep';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOAD: {
      const cleanState = cleanDataCache(stateDataCache, action);
      return updateRangePayloads(cleanState, action);
    }
    default:
      return stateDataCache;
  }
}

export function cleanDataCache(stateDataCache, action) {
  let newState;
  // loop on remoteId
  each(action.payload.intervalToKeep, (data, remoteId) => {
    // loop on localId
    each(data, (values, localId) => {
      const keys = Object.keys(get(stateDataCache, [remoteId, localId], {}));
      const l = keys.length;
      if (!l) {
        return;
      }

      const lower = values[0];
      const upper = values[1];
      set((!newState? (newState = {}): newState), [remoteId, localId], {});

      if (keys[0] > upper || keys[l-1] < lower) {
        newState[remoteId][localId] = u.constant({});
        return ;
      }
      // Cleaning of values outside interval
      each(keys, (timestamp) => {
        if (timestamp < lower || timestamp > upper) {
          return;
        }
        newState[remoteId][localId][timestamp] = stateDataCache[remoteId][localId][timestamp];
      });
    });
  });

  if (!newState) {
    return stateDataCache;
  }
  return Object.assign({}, stateDataCache, newState);;
}

export function updateRangePayloads(stateDataCache, action) {
  let newState;
  // loop on remoteId
  each(action.payload.data, (data, remoteId) => {
    // loop on localId
    each(data, (values, localId) => {
      const interval = get(action.payload.intervalToKeep, [remoteId, localId]);
      set((!newState? (newState = {}): newState), [remoteId, localId], {});

      // Existing dataCache
      if (interval && get(stateDataCache, [remoteId, localId])) {
        // Cleaning of values outside interval
        const lower = interval[0];
        const upper = interval[1];
        each(Object.keys(stateDataCache[remoteId][localId]), (timestamp) => {
          if (timestamp < lower && timestamp > upper) {
            return;
          }
          newState[remoteId][localId][timestamp] = stateDataCache[remoteId][localId][timestamp];
        });
      }
      // Add new values
      Object.assign(newState[remoteId][localId], values);
    });
  });
  if (!newState) {
    return stateDataCache;
  }
  return Object.assign({}, stateDataCache, newState);
}

// function updateOnePayloads(stateDataCache, action) {
//   const newState = {};
//   // loop on remoteId
//   each(action.payload.valuesToDisplay.one, (data, remoteId) => {
//     // loop on localId
//     each(data, (value, localId) => {
//       set(newState, [remoteId, localId], value);
//     });
//   });
//   return newState;
// }
