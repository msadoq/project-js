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
