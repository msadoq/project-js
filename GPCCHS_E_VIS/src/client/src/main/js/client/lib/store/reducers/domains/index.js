// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Add JSDoc on codeEditor, domains & health reducers
// END-HISTORY
// ====================================================================

import _clone from 'lodash/clone';
import * as types from 'store/types';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function domains(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _clone(action.payload.domains);
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get the domains.
 * @param {object} state - The current state.
 * @return {array} array of domains.
 */
export const getDomains = state => state.domains;
