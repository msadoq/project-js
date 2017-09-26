// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Write documents/onSaveViewAsModel middleware unit tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with extensions.
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import makeOnSaveViewAsModel from './onSaveViewAsModel';
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

const mockStore = configureMockStore([makeOnSaveViewAsModel(documentManager)]);

describe('store:serverProcess:middlewares:documents:makeOnSaveViewAsModel', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1'] } },
    views: { v1: { uuid: 'v1', type: 'PlotView' } },
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
