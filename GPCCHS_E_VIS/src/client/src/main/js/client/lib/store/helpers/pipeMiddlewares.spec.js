// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add pipeMiddlewares in store/helpers .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';

import pipeMiddlewares from './pipeMiddlewares';

const createDummyMiddleware = middlewareId => (
  ({ getState, dispatch }) => next => (action) => {
    if (action.type === 'DUMMY') {
      dispatch({ type: `DUMMY_${middlewareId}`, payload: getState() });
    }
    return next(action);
  }
);

const m1 = createDummyMiddleware('M1');
const m2 = createDummyMiddleware('M2');
const m3 = createDummyMiddleware('M3');
const m4 = createDummyMiddleware('M4');

describe('store:helpers:pipeMiddlewares', () => {
  const mockStore = configureMockStore([pipeMiddlewares(m1, m2, m3, m4)]);
  const store = mockStore('STATE');

  beforeEach(() => {
    store.clearActions();
  });

  test('compose with no middlewares throws an error', () => {
    expect(() => pipeMiddlewares()).toThrow();
  });

  test('unknown action is propagated', () => {
    store.dispatch({ type: 'UNKNOWN' });
    expect(store.getActions()).toEqual([{ type: 'UNKNOWN' }]);
  });

  test('middlewares dispatch', () => {
    const nextAction = store.dispatch({ type: 'DUMMY' });
    expect(nextAction).toEqual({ type: 'DUMMY' });
    expect(store.getActions()).toEqual([
      { type: 'DUMMY_M1', payload: 'STATE' },
      { type: 'DUMMY_M2', payload: 'STATE' },
      { type: 'DUMMY_M3', payload: 'STATE' },
      { type: 'DUMMY_M4', payload: 'STATE' },
      { type: 'DUMMY' },
    ]);
  });
});
