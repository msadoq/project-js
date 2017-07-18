import getLogger from '../common/logManager';
import patchReducer from '../store/helpers/patchReducer';
import makeSlaveDispatcher from '../store/helpers/makeSlaveDispatcher';

const log = getLogger('main:store:enhancer');

/**
 * Main process store enhancer
 *
 * - Intercepts dispatched actions and forwards to server process
 * - on REDUX_SYNCHRONIZATION_PATCH_KEY action apply diff to current store and forward to renderers
 */
export default function makeMainStoreEnhancer(identity, sendUp, isDebugOn) {
  return function mainStoreEnhancer(previousStoreCreator) {
    if (process.type !== 'browser') {
      throw new Error('mainStoreEnhancer used in a non-main process');
    }

    return function createStore(reducer, initialState) {
      // Override reducer to apply received patch
      const store = previousStoreCreator(patchReducer, initialState);
      log.info('initialized');

      // Intercepts dispatched actions and forwards to server process
      const storeDotDispatch = store.dispatch;
      store.dispatch = makeSlaveDispatcher(storeDotDispatch, sendUp, identity, log, isDebugOn);

      return store;
    };
  };
}
