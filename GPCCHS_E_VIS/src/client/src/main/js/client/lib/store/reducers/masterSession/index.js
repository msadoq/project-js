import _ from 'lodash/fp';
import * as types from 'store/types';

/* --- Reducer -------------------------------------------------------------- */

export default function hsc(state = {}, action) {
  switch (action.type) {
    case types.HSS_UPDATE_MASTER_SESSION:
      return Object.assign({}, state, { sessionId: action.payload.masterSessionOid });
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getMasterSessionId = _.get(['masterSession', 'sessionId']);
