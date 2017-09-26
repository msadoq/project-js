// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Do not filter action with no patch in master dispatcher
// END-HISTORY
// ====================================================================

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
      () => {
        state = newState;
        return state;
      },
      () => state,
      (a) => {
        sentAction = a;
        return sentAction;
      },
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
