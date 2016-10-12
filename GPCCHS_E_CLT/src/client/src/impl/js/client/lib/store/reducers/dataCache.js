import _ from 'lodash';
import * as types from '../types';
import external from '../../../external.main';
import updeep from 'updeep';

export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOADS: {
      const newState = {};

      // Loop on action.payload.payload => (p, k)
      _.each(action.payload.payloads, (p, k) => {
        if (action.payload.remoteIds[k]) {
        // loop on actions.payload.remoteIds[k].localIds
          _.each(action.payload.remoteIds[k].localIds, (value, localId) => {
            // Check viewType
            if (_.has(external, value.viewType)) {
              const getUsedValues = external[value.viewType].getUsedValues;
              if (_.isFunction(getUsedValues)) {
                const rVal = getUsedValues(
                  stateDataCache[k] ? stateDataCache[k][localId] : undefined, value.field,
                  value.expectedInterval, p);
                if (rVal) {
                  (newState[k] ? newState[k] : newState[k] = {})[localId] = rVal;
                }
              }
            }
          });
        }
      });
      // console.log('*******', Object.assign({}, stateDataCache, newState));
      return Object.assign({}, stateDataCache, newState);
    }
    default:
      return stateDataCache;
  }
}

// const dataCacheInitialState = {};
/*
*       'localId': {
*          viewType: string,
*          field: string,
*          timebarId: string,
*          offset: number,
*          expectedInterval: [number, number],
*        }
*/
// function remoteId(stateRemoteId, actionType, remoteIdPayload, localIds) {
//   switch (actionType) {
//     case types.DATA_IMPORT_PAYLOADS: {
//       if (!localIds) {
//         return undefined;
//       }
//
//       // Get localId from remoteIdRequests
//       //      localId: { viewType, field, offset[, timebarId] },
//       const newState = Object.assign({}, stateRemoteId);
//       _.each(localIds, (value, locId) => {
//         const newObj = {};
//         newObj[locId] = localId(newState[locId], actionType, value, remoteIdPayload);
//         Object.assign(newState, newObj);
//       });
//       // _.reduce(localIds, (result, val, locId))
//       return newState;
//     }
//     default:
//       return stateRemoteId;
//   }
// }
//
// function localId(stateLocalId, actionType, localIdObj, remoteIdPayload) {
//   switch (actionType) {
//     case types.DATA_IMPORT_PAYLOADS: {
//       // Check viewType
//       if (!_.has(external, localIdObj.viewType)) {
//         return undefined;
//       }
//       // Get interval
//       if (!localIdObj.expectedInterval) {
//         return undefined;
//       }
//       const getUsedValues = external[localIdObj.viewType].getUsedValues;
//       if (!_.isFunction(getUsedValues)) {
//         return undefined;
//       }
//       const rVal = getUsedValues(stateLocalId, localIdObj.field, localIdObj.expectedInterval,
//         remoteIdPayload);
//       return rVal;
//     }
//     default:
//       return undefined;
//   }
// }
