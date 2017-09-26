// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : chunk pause action on open editor and on dislay timesetter
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Automatically pause when open editor (player middleware)
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Fix editor actions tests .
// END-HISTORY
// ====================================================================

import { mockStore } from '../../common/jest';
import * as actions from './editor';

describe('store:actions:editor', () => {
  const state1 = {
    editor: {
      textViewId: 'test',
    },
    hsc: {
      playingTimebarId: null,
    },
  };
  const state2 = {
    editor: {
      textViewId: 'test',
    },
    hsc: {
      playingTimebarId: 'test',
    },
  };

  test('dispatch a "WS_WINDOW_OPEN_CODE_EDITOR" action (without pause)', () => {
    const store = mockStore(state1);
    store.dispatch(actions.openCodeEditor('test'));
    expect(store.getActions()).toMatchObject([
      { type: 'WS_WINDOW_OPEN_CODE_EDITOR', payload: { viewId: 'test' } },
    ]);
  });
  test('dispatch a "WS_WINDOW_OPEN_CODE_EDITOR" action (with pause)', () => {
    const store = mockStore(state2);
    store.dispatch(actions.openCodeEditor('test'));
    expect(store.getActions()).toMatchObject([
      { type: 'WS_WINDOW_OPEN_CODE_EDITOR', payload: { viewId: 'test' } },
    ]);
  });
});
