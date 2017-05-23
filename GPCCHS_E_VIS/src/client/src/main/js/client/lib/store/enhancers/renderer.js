/**
 * Renderer process store enhancer
 *
 * - intercepts dispatched actions => forwards to main process
 * - receives state diff from main process => apply
 */

export default function rendererStoreEnhancer(previousStoreCreator) {
  if (process.type !== 'renderer') {
    throw new Error('rendererStoreEnhancer used in a non-renderer process');
  }

  return function createStore(reducer, initialState) {
    const store = previousStoreCreator(reducer, initialState);

    // TODO : enhance
    const storeDotDispatch = store.dispatch;
    store.dispatch = (action) => {
      console.log('VIMA ACTION on rendererStoreEnhancer');
      storeDotDispatch(action);
    };

    return store;
  };
}
