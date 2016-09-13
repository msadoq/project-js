import * as types from './types';

/**
 * Reducer
 */
const initialState = {
  status: 'disconnected', // connected, disconnected, error
  error: null,
};

export default function hss(state = initialState, action) {
  switch (action.type) {
    case types.HSS_MAIN_UPDATE_STATUS:
      return Object.assign({}, state, {
        status: action.payload.status,
        error: action.payload.error,
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getStatus(state) {
  return {
    status: state.hss.status,
    error: state.hss.error,
  };
}
