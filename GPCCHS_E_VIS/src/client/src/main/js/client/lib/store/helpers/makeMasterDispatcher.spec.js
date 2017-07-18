import { compare } from 'fast-json-patch';
import {
REDUX_SYNCHRONIZATION_PATCH_KEY,
} from '../../constants';
import makeMasterDispatcher from './makeMasterDispatcher';

describe('makeMasterDispatcher', () => {
  test('call reducer and forward "patch" action', () => {
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
