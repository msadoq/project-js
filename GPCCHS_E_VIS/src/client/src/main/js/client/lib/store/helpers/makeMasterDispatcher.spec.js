import { compare } from 'fast-json-patch';
import {
REDUX_SYNCHRONIZATION_PATCH_KEY,
} from '../../constants';
import makeMasterDispatcher from './makeMasterDispatcher';

describe('makeMasterDispatcher', () => {
  test('call reducer and does not forward if nothing change', () => {
    let reducerCalled = false;
    let sentAction = false;
    const state = { key: 'old' };
    const action = {};
    const out = makeMasterDispatcher(
      () => (reducerCalled = true),
      () => state,
      () => (sentAction = true),
      'string'
    )(action);

    expect(out).toBe(action);
    expect(reducerCalled).toBe(true);
    expect(sentAction).toBe(false);
  });
  test('call reducer and forward "patch" action if something change', () => {
    let state = { key: 'old' };
    let sentAction;
    const action = { type: 'string', payload: { field: 'string' } };
    const newState = { key: 'new' };
    const patch = compare(state, newState);
    const out = makeMasterDispatcher(
      () => (state = newState),
      () => state,
      a => (sentAction = a),
      'string'
    )(action);

    expect(out).toBe(action);
    expect(state).toBe(newState);
    expect(sentAction).not.toBe(action);
    expect(sentAction).toMatchObject({
      payload: {
        field: 'string',
      },
      meta: {
        origin: 'string',
        [REDUX_SYNCHRONIZATION_PATCH_KEY]: patch,
      },
    });
  });
});
