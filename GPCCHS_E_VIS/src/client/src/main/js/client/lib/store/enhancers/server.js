/**
 * Server process store enhancer
 *
 * - receives actions from main process => dispatches
 * - observes store => on change generate diff and forwards to main process
 */

export default function serverStoreEnhancer(previousStoreCreator) {
  if (typeof process.type !== 'undefined') {
    throw new Error('serverStoreEnhancer used in a non-Node.js process');
  }

  return function createStore(reducer, initialState) {
    const store = previousStoreCreator(reducer, initialState);

    // TODO : enhance
    const storeDotDispatch = store.dispatch;
    store.dispatch = (action) => {
      console.log('VIMA ACTION on serverStoreEnhancer');
      storeDotDispatch(action);
    };

    return store;
  };
}
