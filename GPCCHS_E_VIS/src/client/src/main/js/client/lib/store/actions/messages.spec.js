// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Write messages action creators tests
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Change addMessage action behavior .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Remove unused addOnce redux messages action
// END-HISTORY
// ====================================================================

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
