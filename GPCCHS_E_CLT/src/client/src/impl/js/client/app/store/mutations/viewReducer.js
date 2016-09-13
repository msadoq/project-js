import _ from 'lodash';
import * as types from './types';

/**
 * Reducer
 */
export default function views(state = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_ENTRYPOINT_MOUNT:
    case types.WS_VIEW_ENTRYPOINT_UNMOUNT:
      return Object.assign({}, state, {
        [action.payload.viewId]: view(state[action.payload.viewId], action)
      });
    case types.WS_VIEW_ADD:
      return {
        ...state,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return _.omit(state, [action.payload.viewId]);
    default:
      return state;
  }
}

const initialState = {
  title: 'Unknown',
  type: null,
  configuration: {},
  entryPoints: [],
};

function view(state = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, state, {
        title: action.payload.title || state.title,
        type: action.payload.type || state.type,
        configuration: action.payload.configuration || state.configuration,
        entryPoints: action.payload.entryPoints || state.entryPoints,
      });
    case types.WS_VIEW_ENTRYPOINT_MOUNT:
      return Object.assign({}, state, {
        entryPoints: [...state.entryPoints, action.payload.entryPointId],
      });
    case types.WS_VIEW_ENTRYPOINT_UNMOUNT:
      return Object.assign({}, state, {
        entryPoints: _.without(state.entryPoints, action.payload.entryPointId),
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getView(state, viewId) {
  return state.views[viewId];
}

export function getEntryPoints(state, viewId) {
  // Plot
  // - plotViewEntryPoints[].connectedDataX.formula
  // - plotViewEntryPoints[].connectedDataY.formula
  // Text
  // - textViewEntryPoints[].connectedData.formula
  return _.reduce(state.views[viewId].entryPoints, (entryPoints, id) => {
    const ep = state.entryPoints[id];
    if (!ep) {
      return entryPoints;
    }

    return [...entryPoints, Object.assign({ entryPointId: id }, ep)];
  }, []);
}
