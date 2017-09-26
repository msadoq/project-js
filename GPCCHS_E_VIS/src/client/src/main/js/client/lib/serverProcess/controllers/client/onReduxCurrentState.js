// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import { getStore } from '../../store';

/**
 * Triggered when main process startup and request initialState
 *
 * - returns current state
 *
 * @param reply
 * @param queryId
 */
module.exports = (reply, queryId) => reply(queryId, { state: getStore().getState() });
