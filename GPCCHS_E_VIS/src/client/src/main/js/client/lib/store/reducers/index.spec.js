// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 29/06/2017 : Add a basic test for rootReducer
// END-HISTORY
// ====================================================================

import rootReducer from '.';

describe('store:reducers', () => {
  test('exports a single root reducer as a function', () => {
    expect(rootReducer).toBeAFunction();
  });
  it('single root reducer, return always an object', () => {
    const state = rootReducer({}, { type: '@@redux/INIT' });
    expect(state).toBeAnObject();
  });
});
