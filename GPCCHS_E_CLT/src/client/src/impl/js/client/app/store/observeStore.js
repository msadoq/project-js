/**
 * Out-of-react observable store
 * source: https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 *
 * @param store
 * @param onChange
 */
export default function observeStore(store, onChange) {
  let previousState;

  function handleChange() {
    let nextState = store.getState();
    if (nextState !== previousState) {
      const previous = previousState;
      previousState = nextState;
      onChange(previous, nextState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
