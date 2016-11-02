// import { constants as globalConstants } from 'common';
// import { each, findIndex, findLastIndex, concat, omit } from 'lodash';
import * as types from '../types';

export default function viewRequests(stateViewRequests = {}, action) {
  switch (action.type) {
    // 'viewId', 'epName', 'remoteId', 'interval'
    case types.DATA_UPDATE_VIEWREQUEST: {
      const newState = stateViewRequests;
      if (!stateViewRequests[action.payload.viewId]) {
        newState[action.payload.viewId] = { entryPoints: {} };
      }
      return updateViewRequest(newState[action.payload.viewId], action);
    }
    default:
      return stateViewRequests;
  }
}

function updateViewRequest(stateViewIdRequest, action) {
  switch (action.type) {
    case types.DATA_UPDATE_VIEWREQUEST: {
      // check interval modification
      if (stateViewIdRequest.entryPoints[action.payload.epName]) {
        const oldInterval = stateViewIdRequest.entryPoints[action.payload.epName].requestedInterval;
        const newInterval = action.payload.interval;
        if (oldInterval[0] === newInterval[0] && oldInterval[1] === newInterval[1]) {
          return stateViewIdRequest;
        }
      }
      const newState = { entryPoints: {} };
      newState.entryPoints[action.payload.epName] = { remoteId: action.payload.remoteId,
        requestedInterval: action.payload.interval };
      return { ...stateViewIdRequest, ...newState };
    }
    default:
      return stateViewIdRequest;
  }
}
