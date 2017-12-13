// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Write documents/onSaveView middleware unit tests
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Fix jest describe in onReloadView and onSaveView middlewares
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with extensions.
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import makeOnSaveView from './onSaveView';

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

const mockStore = configureMockStore([makeOnSaveView(documentManager)]);

describe('store:serverProcess:middlewares:documents:makeOnSaveView', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1', 'v2'] } },
    views: {
      v1: { uuid: 'v1', absolutePath: '/absolute/path', type: 'PlotView' },
      v2: { uuid: 'v2', type: 'PlotView' },
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
