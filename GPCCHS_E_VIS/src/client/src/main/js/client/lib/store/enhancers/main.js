/**
 * Main process store enhancer
 *
 * - receives actions from renderer process => forwards to server process
 * - intercepts dispatched actions => forwards to server process
 * - receives state diff from server process => apply and forward to renderer process(es)
 */

export default function mainStoreEnhancer(previousStoreCreator) {
  if (process.type !== 'browser') {
    throw new Error('mainStoreEnhancer used in a non-main process');
  }

  return function createStore(reducer, initialState) {
    const store = previousStoreCreator(reducer, initialState);

    // TODO : enhance
    const storeDotDispatch = store.dispatch;
    store.dispatch = (action) => {
      // console.log('VIMA ACTION on mainStoreEnhancer');
      storeDotDispatch(action);
    };

    return store;
  };
}
