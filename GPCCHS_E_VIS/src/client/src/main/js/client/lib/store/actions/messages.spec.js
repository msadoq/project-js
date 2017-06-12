import * as actions from './messages';
import { mockStore, freezeMe } from '../../common/test';

describe('store:actions:messages', () => {
  const state = freezeMe({
    messages: {
      global: [{ type: 'info', message: 'yolo' }],
    },
  });

  describe('add', () => {
    it('adds message', () => {
      const action = actions.add('global', 'success', 'hello world');
      expect(action).toMatchObject({
        type: 'WS_MESSAGE_ADD',
        payload: {
          containerId: 'global',
          type: 'success',
          messages: ['hello world'],
        },
      });
    });
    it('adds error message', () => {
      const action = actions.add('global', 'danger', new Error('error message'));
      expect(action).toMatchObject({
        type: 'WS_MESSAGE_ADD',
        payload: {
          containerId: 'global',
          type: 'danger',
          messages: ['error message'],
        },
      });
    });
  });

  describe('addOnce', () => {
    const store = mockStore(state);

    afterEach(() => {
      store.clearActions();
    });

    it('adds message id doest not exists', () => {
      store.dispatch(actions.addOnce('global', 'info', 'yolo'));
      expect(store.getActions()).toHaveLength(0);

      store.dispatch(actions.addOnce('aContainerId', 'info', 'yolo'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'aContainerId',
            type: 'info',
            messages: ['yolo'],
          },
        },
      ]);
    });
    it('does not add duplicate message', () => {
      store.dispatch(actions.addOnce('global', 'info', 'yolo'));
      expect(store.getActions()).toHaveLength(0);
    });
  });
});
