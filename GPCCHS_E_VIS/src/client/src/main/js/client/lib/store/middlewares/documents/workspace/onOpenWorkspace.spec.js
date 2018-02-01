// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Write documents/onOpenWorkspace middleware unit tests
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Use withlistenAction middleware enhancer in onOpenWorkspace
// VERSION : 1.1.2 : FA : #7328 : 02/08/2017 : Fix closing vima when default workspace is unknown or invalid
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import path from 'path';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from 'store/types';
import makeOnOpenWorkspace from './onOpenWorkspace';

const documentManager = {
  createBlankWorkspace: () => ({ workspace: true }),
  openWorkspace: ({ absolutePath }, cb = _.noop) => {
    if (path.basename(absolutePath) === 'error') {
      cb('error');
      return _.noop; // return a noop thunk
    }
    return {
      type: 'OPEN_WORKSPACE',
      payload: { absolutePath },
    };
  },
};

const mockStore = configureMockStore([thunk, makeOnOpenWorkspace(documentManager)]);

const askOpenWorkspace = (absolutePath, isNew = false) => ({
  type: types.WS_ASK_OPEN_WORKSPACE,
  payload: { absolutePath, isNew, windowId: 'w1' },
});

describe('store:serverProcess:middlewares:documents:onOpenWorkspace', () => {
  const store = mockStore({
    windows: { w1: {} },
    pages: {},
    views: {},
  });

  afterEach(() => {
    store.clearActions();
  });

  test('simple open workspace', () => {
    store.dispatch(askOpenWorkspace('/absolute/path'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open new workspace', () => {
    store.dispatch(askOpenWorkspace(null, true));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open initial workspace with an error, so open default workspace', () => {
    store.dispatch(askOpenWorkspace('error', true));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open workspace (filepicker)', () => {
    store.dispatch(askOpenWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId, choice: ['/chosen/path'] } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('cancel opening workspace (filepicker)', () => {
    store.dispatch(askOpenWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('workspace need save (workspace)', () => {
    const unsavedStore = mockStore({
      hsc: { isModified: true },
      windows: { w1: {} },
      pages: { p1: { }, p2: { } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save (pages)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save (views)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: {},
      views: { v1: { isModified: true }, v2: { isModified: true } },
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save (pages and views)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: { v1: { isModified: true }, v2: { isModified: true } },
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save, save it, then open another workspace', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace('/absolute/path'));
    const modalId = _.last(unsavedStore.getActions()).payload.props.modalId;
    unsavedStore.dispatch({
      type: types.WS_MODAL_CLOSE, payload: { choice: 'open', props: { modalId } },
    });
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save, then cancel opening workspace', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace('/absolute/path'));
    const modalId = _.last(unsavedStore.getActions()).payload.props.modalId;
    unsavedStore.dispatch({
      type: types.WS_MODAL_CLOSE, payload: { props: { modalId } },
    });
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });
});
