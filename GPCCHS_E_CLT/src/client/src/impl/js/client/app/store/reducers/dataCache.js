import _ from 'lodash';
import * as types from '../types';
import external from '../../../external.main';


export default function dataCache(stateDataCache = {}, action, dataRequests, timebars) {
  switch (action.type) {
    case types.DATA_IMPORT_PAYLOADS: {
      if (!dataRequests || !timebars) {
        return stateDataCache;
      }
      const rIds = _.keys(action.payload.payload);
      let newState = Object.assign({}, stateDataCache);

      _.each(rIds, (rId) => {
        newState = Object.assign({}, newState, {
          [rId]: remoteId(stateDataCache[rId], action.type, action.payload.payload[rId],
            dataRequests[rId], timebars)
        });
      });
      return newState;
    }
    default:
      return stateDataCache;
  }
}

const dataCacheInitialState = {};

function remoteId(stateRemoteId, actionType, remoteIdPayload, remoteIdRequests, timebars) {
  switch (actionType) {
    case types.DATA_IMPORT_PAYLOADS: {
      if (!remoteIdRequests) {
        return undefined;
      }

      // Get localId from remoteIdRequests
      //      localId: { viewType, field, offset[, timebarId] },
      let newState = Object.assign({}, stateRemoteId);
      _.each(remoteIdRequests.localIds, (value, locId) => {
        const newObj = {};
        newObj[locId] = localId(newState[locId], actionType, value, remoteIdPayload, timebars);
        newState = Object.assign({}, newState, newObj);
      });
      return newState;
    }
    default:
      return stateRemoteId;
  }
}

function localId(stateLocalId, actionType, localIdObj, remoteIdPayload, timebars) {
  switch (actionType) {
    case types.DATA_IMPORT_PAYLOADS: {
      // Check viewType
      if (!_.has(external, localIdObj.viewType)) {
        return undefined;
      }
      // Get timebar
      const timebar = _.get(timebars, localIdObj.timebarId);
      if (!timebar) {
        return undefined;
      }
      if (!_.has(external, localIdObj.viewType)) {
        return undefined;
      }
      const getUsedValues = external[localIdObj.viewType].getUsedValues;
      if (!_.isFunction(getUsedValues)) {
        return undefined;
      }
      const rVal =  getUsedValues(stateLocalId, localIdObj.field, timebar.visuWindow, localIdObj.offset,
        remoteIdPayload);
        return rVal;
    }
    default:
      return undefined;
  }
}
