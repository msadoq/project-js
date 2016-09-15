import * as types from './types';
import _ from 'lodash';
import u from 'updeep';

/**
 * Reducer
 */
const initialState = {
  status: 'disconnected', // connected, disconnected, error
  error: null,
};

export default function hss(state = {}, action) {
  switch (action.type) {
    case types.HSS_WS_UPDATE_STATUS:
      return u({
        [action.payload.identity]: {
          status: action.payload.status || initialState.status,
          error: action.payload.error || initialState.error,
        }
      }, state);
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getStatus(state, identity) {
  if (!identity) {
    return undefined;
  }

  const ws = _.get(state, `hss.${identity}`);
  if (!ws) {
    return undefined;
  }

  return {
    status: ws.status,
    error: ws.error,
  };
}
