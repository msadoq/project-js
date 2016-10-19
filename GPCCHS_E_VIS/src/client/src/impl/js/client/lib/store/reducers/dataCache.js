import { last, has, each, concat, slice, findIndex, get, set, find } from 'lodash';
import u from 'updeep';
import * as types from '../types';
import debug from '../../common/debug/mainDebug';

const logger = debug('store:action:dataCache');

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOAD: {
      // const updateRange = updateRangePayloads(stateDataCache, action);
      // const updateOne = updateOnePayloads(stateDataCache, action);
      // return u(Object.assign(updateRange, updateOne), stateDataCache);
      const start1 = process.hrtime();
      const cleanState = cleanDataCache(stateDataCache, action);
      const duration1 = process.hrtime(start1)[1] / 1e6;
      logger.debug(`cleanDataCache done in ${duration1}ms`);

      const start2 = process.hrtime();
      const newState = u(action.payload.data, u(cleanState, stateDataCache));
      const duration2 = process.hrtime(start2)[1] / 1e6;
      logger.debug(`u(stateDataCache) done in ${duration2}ms`);
      return newState? newState: stateDataCache;
    }
    default:
      return stateDataCache;
  }
}

function cleanDataCache(stateDataCache, action) {
  const newState = {};
  // loop on remoteId
  each(action.payload.intervalToKeep, (data, remoteId) => {
    // loop on localId
    each(data, (values, localId) => {
      const lower = values[0];
      const upper = values[1];
      set(newState, [remoteId, localId], {});

      const keys = Object.keys(get(stateDataCache, [remoteId, localId], {}));
      const l = keys.length;
      if (!l || keys[0] > upper || keys[l-1] < lower) {
        newState[remoteId][localId] = u.constant({});
        return ;
      }

      // Cleaning of values outside interval
      each(keys, (timestamp) => {
        if (timestamp < lower && timestamp > upper) {
          return;
        }
        newState[remoteId][localId][timestamp] = stateDataCache[remoteId][localId][timestamp];
      });
    });
  });

  return newState;
}

// function updateRangePayloads(stateDataCache, action) {
//   const newState = {};
//   // loop on remoteId
//   each(action.payload.valuesToDisplay.range, (data, remoteId) => {
//     // loop on localId
//     each(data, (values, localId) => {
//       const lower = values.interval[0];
//       const upper = values.interval[1];
//       set(newState, [remoteId, localId], {});
//
//       // Existing dataCache
//       if (get(stateDataCache, [remoteId, localId])) {
//         // Cleaning of values outside interval
//         each(Object.keys(stateDataCache[remoteId][localId]), (timestamp) => {
//           if (timestamp < lower && timestamp > upper) {
//             return;
//           }
//           newState[remoteId][localId][timestamp] = stateDataCache[remoteId][localId][timestamp];
//         });
//       }
//       // Add new values
//       Object.assign(newState[remoteId][localId], values.data);
//     });
//   });
//
//   return newState;
// }
//
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
