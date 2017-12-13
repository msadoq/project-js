import { mockStore } from 'common/jest';
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
