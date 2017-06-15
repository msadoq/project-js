import * as actions from './messages';
import { mockStore, freezeMe } from '../../common/test';

describe('store:actions:messages', () => {
  const state = freezeMe({
    messages: {
      global: [{ type: 'info', message: 'yolo' }],
    },
  });

  describe('add', () => {
    test('adds message', () => {
      const action = actions.add('global', 'success', 'hello world');
      expect(action).toMatchObject({
        type: 'WS_MESSAGE_ADD',
        payload: {
          containerId: 'global',
          type: 'success',
          messages: [{ content: 'hello world' }],
        },
      });
    });
    test('adds error message', () => {
      const action = actions.add('global', 'danger', new Error('error message'));
      expect(action).toMatchObject({
        type: 'WS_MESSAGE_ADD',
        payload: {
          containerId: 'global',
          type: 'danger',
          messages: [{ content: 'error message' }],
        },
      });
    });
  });

  describe('addOnce', () => {
    const store = mockStore(state);

    afterEach(() => {
      store.clearActions();
    });

    test('adds message id doest not exists', () => {
      store.dispatch(actions.addOnce('global', 'info', 'yolo'));
      expect(store.getActions()).toHaveLength(0);

      store.dispatch(actions.addOnce('aContainerId', 'info', 'yolo'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'aContainerId',
            type: 'info',
            messages: [{ content: 'yolo' }],
          },
        },
      ]);
    });
    test('does not add duplicate message', () => {
      store.dispatch(actions.addOnce('global', 'info', 'yolo'));
      expect(store.getActions()).toHaveLength(0);
    });
  });
});
