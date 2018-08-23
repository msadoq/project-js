import _ from 'lodash/fp';

/**
 * Similar to Redux combineReducers and also makes the root state accessible to all reducers
 *
 * @param rootReducers
 * @returns {function(*=, *=)}
 */
const combineReducers = rootReducers => (rootState = {}, action) => {
  const combineReducerAux = (reducers, state) => {
    let updatedState = state;

    Object.keys(reducers)
      .forEach((reducerKey) => {
        const reducerDefinition = reducers[reducerKey];

        if (typeof reducerDefinition === 'function') {
          updatedState =
            _.set(
              reducerKey,
              reducerDefinition(updatedState[reducerKey], action, rootState),
              updatedState
            );
        }

        if (typeof reducerDefinition === 'object') {
          const combinedReducer = combineReducerAux(reducerDefinition, state);
          updatedState =
            _.set(
              reducerKey,
              combinedReducer(updatedState[reducerKey], action, rootState),
              updatedState
            );
        }
      });

    return updatedState;
  };

  return combineReducerAux(rootReducers, rootState);
};

export default combineReducers;
