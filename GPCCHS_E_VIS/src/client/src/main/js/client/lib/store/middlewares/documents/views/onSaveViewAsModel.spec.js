import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import onSaveViewAsModel from './onSaveViewAsModel';
import * as types from '../../../types';

const documentManager = {
  saveViewAsModel: (viewId, absolutePath) => ({
    type: 'SAVE_VIEW_AS_MODEL',
    payload: { viewId, absolutePath },
  }),
};

const askSaveViewAsModel = viewId => ({
  type: types.WS_ASK_SAVE_VIEW_AS_MODEL,
  payload: { viewId },
});

const mockStore = configureMockStore([onSaveViewAsModel(documentManager)]);

describe('store:serverProcess:middlewares:documents:onSaveViewAsModel', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1'] } },
    views: { v1: { uuid: 'v1' } },
  });

  test('save view as model', () => {
    store.dispatch(askSaveViewAsModel('v1'));
    const actions = store.getActions();
    const dialogId = _.last(actions).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: '/the/chosen/one' } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save view as model (cancel filepicker)', () => {
    store.dispatch(askSaveViewAsModel('v1'));
    const actions = store.getActions();
    const dialogId = _.last(actions).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
