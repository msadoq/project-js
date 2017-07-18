import _clone from 'lodash/clone';
import * as types from '../../types';

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
