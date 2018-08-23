/**
 * Returns a single reducer that applies successively an array of reducers
 * and returns the resulting state
 *
 * @param reducers
 * @returns {function(*, ...[*]): *}
 */
export default (...reducers) => (state, ...args) => {
  let updatedState = state;

  for (let i = reducers.length - 1; i >= 0; i -= 1) {
    const reducer = reducers[i];
    updatedState = reducer(updatedState, ...args);
  }

  return updatedState;
};
