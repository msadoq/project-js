import _ from 'lodash';
import * as types from '../types';
import external from '../../../external.main';


export default function dataCache(stateDataCache = {}, action) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOADS: {
      let newState = Object.assign({}, stateDataCache);

      _.each(action.remoteIds, (object, rId) => {
        newState = Object.assign({}, newState, {
          [rId]: remoteId(stateDataCache[rId], action.type, action.payload.payload[rId],
            object.localIds)
        });
      });
      return newState;
    }
    default:
      return stateDataCache;
  }
}

const dataCacheInitialState = {};
/*
*       'localId': {
*          viewType: string,
*          field: string,
*          timebarId: string,
*          offset: number,
*          expectedInterval: [number, number],
*        }
*/
function remoteId(stateRemoteId, actionType, remoteIdPayload, localIds) {
  switch (actionType) {
    case types.DATA_IMPORT_PAYLOADS: {
      if (!localIds) {
        return undefined;
      }

      // Get localId from remoteIdRequests
      //      localId: { viewType, field, offset[, timebarId] },
      let newState = Object.assign({}, stateRemoteId);
      _.each(localIds, (value, locId) => {
        const newObj = {};
        newObj[locId] = localId(newState[locId], actionType, value, remoteIdPayload);
        newState = Object.assign({}, newState, newObj);
      });
      return newState;
    }
    default:
      return stateRemoteId;
  }
}

function localId(stateLocalId, actionType, localIdObj, remoteIdPayload) {
  switch (actionType) {
    case types.DATA_IMPORT_PAYLOADS: {
      // Check viewType
      if (!_.has(external, localIdObj.viewType)) {
        return undefined;
      }
      // Get interval
      if (!localIdObj.expectedInterval) {
        return undefined;
      }
      console.log('type',localIdObj.viewType);
      if (!_.has(external, localIdObj.viewType)) {
        return undefined;
      }
      const getUsedValues = external[localIdObj.viewType].getUsedValues;
      if (!_.isFunction(getUsedValues)) {
        return undefined;
      }
      const rVal = getUsedValues(stateLocalId, localIdObj.field, localIdObj.expectedInterval,
        remoteIdPayload);
      return rVal;
    }
    default:
      return undefined;
  }
}
