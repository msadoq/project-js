import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
export default function connectedData(stateConnectedData = {}, action) {
  switch (action.type) {
    case types.WS_CD_ADD:
      return {
        ...stateConnectedData,
        [action.payload.connectedDataId]: cd(undefined, action),
      };
    case types.WS_CD_REMOVE:
      return _.omit(stateConnectedData, [action.payload.connectedDataId]);
    default:
      return stateConnectedData;
  }
}

const initialState = {
  formula: null,
  domain: null,
  timeline: null,
  filter: null,
};

function cd(stateConnectedDatum = initialState, action) {
  switch (action.type) {
    case types.WS_CD_ADD:
      return Object.assign({}, stateConnectedDatum, {
        formula: action.payload.formula || stateConnectedDatum.formula,
        domain: action.payload.domain || stateConnectedDatum.domain,
        timeline: action.payload.timeline || stateConnectedDatum.timeline,
        filter: action.payload.filter || stateConnectedDatum.filter,
      });
    default:
      return stateConnectedDatum;
  }
}

/**
 * Selectors
 */
export function getConnectedDatum(state, connectedDataId) {
  return state.connectedData[connectedDataId];
}
