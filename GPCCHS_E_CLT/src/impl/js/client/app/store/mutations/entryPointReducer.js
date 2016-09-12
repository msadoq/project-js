import _ from 'lodash';
import * as types from './types';

/**
 * Reducer
 */
export default function entryPoints(state = {}, action) {
  switch (action.type) {
    case types.WS_ENTRYPOINT_ADD:
      return {
        ...state,
        [action.payload.entryPointId]: entryPoint(undefined, action),
      };
    case types.WS_ENTRYPOINT_REMOVE:
      return _.omit(state, [action.payload.entryPointId]);
    default:
      return state;
  }
}

const initialState = {
  title: 'Unknown',
};

function entryPoint(state = initialState, action) {
  switch (action.type) {
    case types.WS_ENTRYPOINT_ADD:
      return Object.assign({}, state, {
        title: action.payload.title || state.title,
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getEntryPoint(state, entryPointId) {
  return state.entryPoints[entryPointId];
}
