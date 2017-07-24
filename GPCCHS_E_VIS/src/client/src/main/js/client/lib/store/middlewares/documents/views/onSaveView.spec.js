import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import onSaveView from './onSaveView';
import * as types from '../../../types';

const documentManager = {
  saveView: (viewId, absolutePath) => ({
    type: 'SAVE_VIEW',
    payload: { viewId, absolutePath },
  }),
};

const askSaveView = (viewId, saveAs = false) => ({
  type: types.WS_ASK_SAVE_VIEW,
  payload: { viewId, saveAs },
});

const mockStore = configureMockStore([onSaveView(documentManager)]);

describe('store:serverProcess:middlewares:documents:onSaveViewAsModel', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1', 'v2'] } },
    views: {
      v1: { uuid: 'v1', absolutePath: '/absolute/path' },
      v2: { uuid: 'v2' },
    },
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('save view', () => {
    store.dispatch(askSaveView('v1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save view as', () => {
    store.dispatch(askSaveView('v2'));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: '/the/chosen/one' } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save view as (forced)', () => {
    store.dispatch(askSaveView('v1', true));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: '/the/chosen/one' } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save view as (then cancel)', () => {
    store.dispatch(askSaveView('v1', true));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
