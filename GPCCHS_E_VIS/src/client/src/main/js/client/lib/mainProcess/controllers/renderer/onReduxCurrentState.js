import { getStore } from '../../store';

/**
 * Triggered when renderer process startup and request initialState
 *
 * - returns current state
 *
 * @param reply
 * @param queryId
 */
module.exports = (reply, queryId) => reply(queryId, { state: getStore().getState() });
