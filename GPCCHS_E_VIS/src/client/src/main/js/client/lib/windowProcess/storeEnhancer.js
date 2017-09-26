// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : FA : #7813 : 19/09/2017 : Add batch action + logger support Remove ipc transmission for un-patch action
// END-HISTORY
// ====================================================================

import getLogger from '../common/logManager';
import patchReducer from '../store/helpers/patchReducer';
import makeSlaveDispatcher from '../store/helpers/makeSlaveDispatcher';

const log = getLogger('renderer:store:enhancer');

/**
 * Renderer process store enhancer
 *
 * - Intercepts dispatched actions and forwards to main process
 * - on REDUX_SYNCHRONIZATION_PATCH_KEY action apply diff to current store
 */
export default function makeRendererStoreEnhancer(identity, sendUp, isDebugOn) {
  return function rendererStoreEnhancer(previousStoreCreator) {
    if (process.type !== 'renderer') {
      throw new Error('rendererStoreEnhancer used in a non-renderer process');
    }

    return function createStore(reducer, initialState) {
      // Override reducer to apply received patch
      const store = previousStoreCreator(enableBatching(patchReducer), initialState);
      log.info('initialized');

      // Intercepts dispatched actions and forwards to main process
      const storeDotDispatch = store.dispatch;
      store.dispatch = makeSlaveDispatcher(storeDotDispatch, sendUp, identity, log, isDebugOn);

      return store;
    };
  };
}

const enableBatching = (reduce) => {
  const batchingReducer = (state, action) => {
    if (action && action.meta && action.meta.batch) {
      const reduced = action.payload.reduce(batchingReducer, state);
      return reduced;
    }
    return reduce(state, action);
  };
  return batchingReducer;
};
