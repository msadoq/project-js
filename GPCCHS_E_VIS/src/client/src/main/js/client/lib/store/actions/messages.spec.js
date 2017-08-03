import * as actions from './messages';

describe('store:actions:messages', () => {
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
});
