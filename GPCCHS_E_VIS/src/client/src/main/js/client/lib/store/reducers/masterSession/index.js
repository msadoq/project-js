// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : move getMasterSessionId selector from selectors to reducers
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from '../../types';

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
