import __ from 'lodash/fp';

const injectAction = action => reducer => state => reducer(state, action);

const composeReducers = (...reducers) => (state, action) => {
  const reducersWithAction = __.map(injectAction(action), reducers);
  return __.compose(...reducersWithAction)(state, action);
};

export default composeReducers;
