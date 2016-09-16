import _ from 'lodash';
import * as types from './types';

/**
 * Reducer
 */
export default function connectedData(state = {}, action) {
  switch (action.type) {
    case types.WS_CD_ADD:
      return {
        ...state,
        [action.payload.connectedDataId]: cd(undefined, action),
      };
    case types.WS_CD_REMOVE:
      return _.omit(state, [action.payload.connectedDataId]);
    default:
      return state;
  }
}

const initialState = {
  formula: null,
  domain: null,
  timeline: null,
  filter: null,
};

function cd(state = initialState, action) {
  switch (action.type) {
    case types.WS_CD_ADD:
      return Object.assign({}, state, {
        formula: action.payload.formula || state.formula,
        domain: action.payload.domain || state.domain,
        timeline: action.payload.timeline || state.timeline,
        filter: action.payload.filter || state.filter,
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getConnectedData(state, connectedDataId) {
  return state.connectedData[connectedDataId];
}
