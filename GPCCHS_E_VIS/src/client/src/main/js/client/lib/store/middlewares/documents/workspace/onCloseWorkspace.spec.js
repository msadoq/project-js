// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Write documents/onCloseWorkspace middleware unit tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from 'store/types';
import makeOnCloseWorkspace from './onCloseWorkspace';

const mockStore = configureMockStore([thunk, makeOnCloseWorkspace()]);

const askCloseWorkspace = windowId => ({
  type: types.WS_ASK_CLOSE_WORKSPACE,
  payload: { windowId, keepMessages: false },
});

const askCloseWindow = windowId => ({
  type: types.WS_ASK_CLOSE_WINDOW,
  payload: { windowId },
});

describe('store:serverProcess:middlewares:documents:onOpenWorkspace', () => {
  test('display wizard when workspace is modified', () => {
    const store = mockStore({ hsc: { isModified: true } });
    store.dispatch(askCloseWorkspace('w1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  _.each((askClose) => {
    const docType = askClose === askCloseWorkspace ? 'workspace' : 'window';
    describe(`close ${docType}`, () => {
      test('simple close', () => {
        const store = mockStore({
          hsc: { focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', views: ['v1'] },
            p2: { uuid: 'p2', views: ['v2', 'v3'] },
            p3: { uuid: 'p3', views: [] },
          },
          views: {
            v1: { uuid: 'v1' },
            v2: { uuid: 'v2' },
            v3: { uuid: 'v3' },
          },
        });
        store.dispatch(askClose('w1'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('display wizard when page and views are modified', () => {
        const store = mockStore({
          hsc: { isModified: true, focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', isModified: true, views: ['v1'] },
            p2: { uuid: 'p2', isModified: true, views: ['v2', 'v3'] },
            p3: { uuid: 'p3', isModified: true, views: [] },
          },
          views: {
            v1: { uuid: 'v1', isModified: true },
            v2: { uuid: 'v2', isModified: true },
            v3: { uuid: 'v3', isModified: true },
          },
        });
        store.dispatch(askClose('w1'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('display wizard when page is modified', () => {
        const store = mockStore({
          hsc: { isModified: true, focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', isModified: true, views: ['v1'] },
            p2: { uuid: 'p2', isModified: true, views: ['v2', 'v3'] },
            p3: { uuid: 'p3', isModified: true, views: [] },
          },
          views: {
            v1: { uuid: 'v1' },
            v2: { uuid: 'v2' },
            v3: { uuid: 'v3' },
          },
        });
        store.dispatch(askClose('w1'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('display wizard when views are modified', () => {
        const store = mockStore({
          hsc: { isModified: true, focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', views: ['v1'] },
            p2: { uuid: 'p2', views: ['v2', 'v3'] },
            p3: { uuid: 'p3', views: [] },
          },
          views: {
            v1: { uuid: 'v1', isModified: true },
            v2: { uuid: 'v2', isModified: true },
            v3: { uuid: 'v3', isModified: true },
          },
        });
        store.dispatch(askClose('w1'));
        expect(store.getActions()).toMatchSnapshot();
      });

      test('close using save wizard', () => {
        const store = mockStore({
          hsc: { isModified: true, focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', isModified: true, views: ['v1'] },
            p2: { uuid: 'p2', isModified: true, views: ['v2', 'v3'] },
            p3: { uuid: 'p3', isModified: true, views: ['v4'] },
          },
          views: {
            v1: { uuid: 'v1', isModified: true },
            v2: { uuid: 'v2', isModified: true },
            v3: { uuid: 'v3', isModified: true },
          },
        });
        store.dispatch(askClose('w1'));
        const modalId = _.last(store.getActions()).payload.props.modalId;
        store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'close', props: { modalId } } });
        expect(store.getActions()).toMatchSnapshot();
      });
      test('cancel closing using wizard', () => {
        const store = mockStore({
          hsc: { isModified: true, focusWindow: 'w1' },
          windows: { w1: { pages: ['p1', 'p2'] }, w2: { pages: ['p3'] } },
          pages: {
            p1: { uuid: 'p1', isModified: true, views: ['v1'] },
            p2: { uuid: 'p2', isModified: true, views: ['v2', 'v3'] },
            p3: { uuid: 'p3', isModified: true, views: ['v4'] },
          },
          views: {
            v1: { uuid: 'v1', isModified: true },
            v2: { uuid: 'v2', isModified: true },
            v3: { uuid: 'v3', isModified: true },
          },
        });
        store.dispatch(askClose('w1'));
        const modalId = _.last(store.getActions()).payload.props.modalId;
        store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { props: { modalId } } });
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  }, [askCloseWorkspace, askCloseWindow]);
});
