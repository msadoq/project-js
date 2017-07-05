import { REDUX_SYNCHRONIZATION_PATCH_KEY } from '../../constants';
import makeSlaveDispatcher from './makeSlaveDispatcher';

describe('makeSlaveDispatcher', () => {
  test('dispatch to original .dispatch() if "patch" action', () => {
    let originalDispatch = false;
    let sendUp = false;
    const action = {
      meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: ['element'] },
    };
    const out = makeSlaveDispatcher(
      a => (originalDispatch = (a === action)),
      () => (sendUp = true)
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
      () => (originalDispatch = true),
      a => (sentAction = a),
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