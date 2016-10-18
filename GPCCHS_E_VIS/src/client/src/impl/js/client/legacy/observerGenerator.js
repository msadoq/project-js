function Previous() {
  this.previousState = null;
}

Previous.prototype.switch = function (nextState) {
  const previous = this.previousState;

  if (typeof nextState !== 'undefined') {
    this.previousState = nextState;
  }

  return previous;
};

// singleton
const previousState = new Previous();

/**
 * Spectator store observer
 *
 * @param store
 * @param onStoreUpdate
 */
export function storeSpectator(store, onStoreUpdate) {
  function handleChange() {
    onStoreUpdate(store.getState(), store.dispatch, previousState.switch(store.getState()));
  }

  return store.subscribe(handleChange);
}


/**
 * Actor store observer (allows action dispatching that not re-trigger observer in a infinite loop)
 * source: http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/
 *
 * @param store
 * @param onStoreUpdate
 */
export function storeActor(store, onStoreUpdate) {
  let acting = false;
  function handleChange() {
    if (!acting) {
      acting = true;
      onStoreUpdate(store.getState(), store.dispatch, previousState.switch(store.getState()));
      acting = false;
    }
  }

  return store.subscribe(handleChange);
}
