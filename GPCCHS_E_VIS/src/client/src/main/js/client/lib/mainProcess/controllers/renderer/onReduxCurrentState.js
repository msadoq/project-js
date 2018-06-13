// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { getStore } from 'mainProcess/store';

/**
 * Triggered when renderer process startup and request initialState
 *
 * - returns current state
 *
 * @param reply
 * @param queryId
 */
module.exports = (reply, queryId) => reply(queryId, { state: getStore().getState() });
