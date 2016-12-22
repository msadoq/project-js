import u from 'updeep';
import * as types from '../types';

/**
 * Reducer
 */
const initialState = {
  status: 'disconnected', // connected, disconnected, error
  error: null,
};

export default function hss(stateHss = {}, action) {
  switch (action.type) {
    case types.HSS_WS_UPDATE_STATUS:
      return u({
        [action.payload.identity]: {
          status: action.payload.status || initialState.status,
          error: action.payload.error || initialState.error,
        }
      }, stateHss);
    default:
      return stateHss;
  }
}
