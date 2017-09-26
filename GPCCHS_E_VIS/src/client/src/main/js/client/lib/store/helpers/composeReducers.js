// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import __ from 'lodash/fp';

const injectAction = action => reducer => state => reducer(state, action);

/* ---------------------------- composeReducers ----------------------------- */
// Purpose :           take some reducers and return a single reducers.
// example :           composeReducers(r1, r2, r3)
// is equivalent to :  (state, action) => r1(r2(r3(state, action), action), action)

export default (...reducers) => (state, action) => {
  const reducersWithAction = __.map(injectAction(action), reducers);
  return __.compose(...reducersWithAction)(state, action);
};
