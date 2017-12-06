import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';

import * as types from 'store/types';
import makeOnSaveWorkspace from './onSaveWorkspace';

const documentManager = {
  saveWorkspace: absolutePath => ({
    type: 'SAVE_WORKSPACE',
    payload: { absolutePath },
  }),
};

const mockStore = configureMockStore([makeOnSaveWorkspace(documentManager)]);

const askSaveWorkspace = () => ({
  type: types.WS_ASK_SAVE_WORKSPACE,
  payload: {},
});

describe('store:serverProcess:middlewares:documents:onSaveWorkspace', () => {
  test('save workspace', () => {
    const store = mockStore({
      hsc: { focusWindow: 'w1', file: 'file', folder: '/folder' },
      windows: { w1: {} },
    });
    store.dispatch(askSaveWorkspace());
    expect(store.getActions()).toMatchSnapshot();
  });
  test('save as workspace', () => {
    const store = mockStore({
      hsc: { focusWindow: 'w1' },
      windows: { w1: {} },
    });
    store.dispatch(askSaveWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: '/the/chosen/one' } });
    expect(store.getActions()).toMatchSnapshot();
  });
  test('save as, then cancel', () => {
    const store = mockStore({
      hsc: { focusWindow: 'w1' },
      windows: { w1: {} },
    });
    store.dispatch(askSaveWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });
  test('save workspace with new pages', () => {
    const store = mockStore({
      hsc: { focusWindow: 'w1' },
      windows: { w1: { uuid: 'w1', pages: ['p1', 'p2'] } },
      pages: {
        p1: { uuid: 'p1', views: ['v1', 'v2'] },
        p2: { uuid: 'p2', absolutePath: '/path', views: ['v3', 'v4'] },
      },
      views: {
        v1: { uuid: 'v1' },
        v2: { uuid: 'v2' },
        v3: { uuid: 'v3' },
        v4: { uuid: 'v4', absolutePath: '/path' },
      },
    });
    store.dispatch(askSaveWorkspace());
    expect(store.getActions()).toMatchSnapshot();
  });
});
