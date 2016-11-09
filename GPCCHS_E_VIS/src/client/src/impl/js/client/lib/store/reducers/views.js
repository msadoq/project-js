import { omit } from 'lodash';
import u from 'updeep';
import { relative, resolve } from 'path';
import * as types from '../types';

/**
 * Reducer
 */
export default function views(stateViews = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_CD_MOUNT:
    case types.WS_VIEW_CD_UNMOUNT:
      return Object.assign({}, stateViews, {
        [action.payload.viewId]: view(stateViews[action.payload.viewId], action)
      });
    case types.WS_VIEW_ADD:
      return {
        ...stateViews,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return omit(stateViews, [action.payload.viewId]);
    case types.WS_VIEW_UPDATEPATH:
      // path unchanged or newPath invalid
      if (!action.payload.newPath ||
          resolve(action.payload.newPath) === resolve(stateViews[action.payload.viewId].path)) {
        return stateViews;
      }
      return u({ [action.payload.viewId]: { path: action.payload.newPath } }, stateViews);
    case types.WS_VIEW_UPDATE_RELATIVEPATH: {
      const newWkFolder = resolve(action.payload.newWkFolder);
      // workspace folder unchanged
      if (resolve(action.payload.oldWkFolder) === newWkFolder) {
        return stateViews;
      }
      // workspace folder updated
      const oldPath = resolve(action.payload.oldWkFolder, stateViews[action.payload.viewId].path);
      const pathMvt = relative(newWkFolder, oldPath);
      return u({ [action.payload.viewId]: { path: pathMvt } }, stateViews);
    }
    default:
      return stateViews;
  }
}

const initialState = {
  type: null,
};

function view(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, stateView, {
        type: action.payload.type || stateView.type,
        configuration: configuration(undefined, action),
        path: action.payload.path,
        oId: action.payload.oId,
      });
    default:
      return stateView;
  }
}

// TODO remove and add configuration entry point
function configuration(state = { title: null }, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, action.payload.configuration || state);
    default:
      return state;
  }
}
