// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Fix jest describe in onReloadView and onSaveView middlewares
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Write documents/onReloadView middleware unit tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import makeOnReloadView from './onReloadView';
import * as types from '../../../types';

const documentManager = {
  reloadView: viewId => ({
    type: 'RELOAD_VIEW',
    payload: { viewId },
  }),
};

const askReloadView = viewId => ({
  type: types.WS_ASK_RELOAD_VIEW,
  payload: { viewId },
});

const mockStore = configureMockStore([makeOnReloadView(documentManager)]);

describe('store:serverProcess:middlewares:documents:makeOnReloadView', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1', 'v2'] } },
    views: { v1: { uuid: 'v1' }, v2: { uuid: 'v2', isModified: true } },
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('reload view', () => {
    store.dispatch(askReloadView('v1'));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('display modal, then reload view', () => {
    store.dispatch(askReloadView('v2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'reload', props: { modalId } } });
    expect(store.getActions()).toMatchSnapshot();
  });
  test('display modal, then do not reload view (cancel)', () => {
    store.dispatch(askReloadView('v2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { props: { modalId } } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
