// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix failed unit test && fix decorated meta for timing on debug enabled
// END-HISTORY
// ====================================================================

import { REDUX_SYNCHRONIZATION_PATCH_KEY } from 'constants';
import makeSlaveDispatcher from './makeSlaveDispatcher';

describe('makeSlaveDispatcher', () => {
  test('dispatch to original .dispatch() if "patch" action', () => {
    let originalDispatch = false;
    let sendUp = false;
    const action = {
      meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: ['element'] },
    };
    const out = makeSlaveDispatcher(
      (a) => {
        originalDispatch = (a === action);
        return originalDispatch;
      },
      () => {
        sendUp = true;
        return sendUp;
      }
    )(action);

    expect(out).toBe(action);
    expect(originalDispatch).toBe(true);
    expect(sendUp).toBe(false);
  });
  test('forward action with .sendUp() if "regular" action', () => {
    let originalDispatch = false;
    let sentAction;
    const action = {};
    const out = makeSlaveDispatcher(
      () => {
        originalDispatch = true;
        return originalDispatch;
      },
      (a) => {
        sentAction = a;
        return sentAction;
      },
      'string'
    )(action);

    expect(out).toMatchObject({
      meta: {
        origin: 'string',
      },
    });
    expect(originalDispatch).toBe(false);
    expect(sentAction).not.toBe(action);
    expect(sentAction).toMatchObject({
      meta: {
        origin: 'string',
      },
    });
  });
});
