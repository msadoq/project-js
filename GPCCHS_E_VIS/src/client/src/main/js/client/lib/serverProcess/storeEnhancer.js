// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// END-HISTORY
// ====================================================================

import getLogger from '../common/logManager';
import makeMasterDispatcher from '../store/helpers/makeMasterDispatcher';

const log = getLogger('server:store:enhancer');

/**
 * Server process store enhancer
 *
 * - On action dispatch generate patch and forward to main process
 * - Receives and dispatch actions from main process
 */
export default function makeServerStoreEnhancer(identity, sendDown, isDebugOn) {
  return function serverStoreEnhancer(previousStoreCreator) {
    if (typeof process.type !== 'undefined') {
      throw new Error('serverStoreEnhancer used in a non-Node.js process');
    }

    return function createStore(reducer, initialState) {
      const store = previousStoreCreator(reducer, initialState);
      log.info('initialized');

      // On action dispatch, generates patch and forwards to main process
      const storeDotDispatch = store.dispatch;
      store.dispatch = makeMasterDispatcher(
        storeDotDispatch, store.getState, sendDown, identity, log, isDebugOn
      );

      return store;
    };
  };
}
