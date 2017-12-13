// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Write documents/onOpenView middleware unit tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --VIEW
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import makeOnOpenView from './onOpenView';

const documentManager = {
  openView: (viewInfo, pageId) => ({
    type: 'OPEN_VIEW',
    payload: { viewInfo, pageId },
  }),
};

const askSaveView = absolutePath => ({
  type: types.WS_ASK_OPEN_VIEW,
  payload: { absolutePath },
});

const mockStore = configureMockStore([makeOnOpenView(documentManager)]);

describe('store:serverProcess:middlewares:documents:makeOnOpenView', () => {
  const store = mockStore({
    hsc: { isWorkspaceOpened: true, focusWindow: 'w1' },
    windows: { w1: { uuid: 'w1', focusedPage: 'p1' } },
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('open view', () => {
    store.dispatch(askSaveView('/an/absolute/path'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open view using filepicker', () => {
    store.dispatch(askSaveView());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: ['/the/chosen/one'] } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open filepicker, then cancel opening view', () => {
    store.dispatch(askSaveView());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
