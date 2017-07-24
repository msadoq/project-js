import _ from 'lodash/fp';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import onCloseView from './onCloseView';
import * as types from '../../../types';

let saveViewError = false;
const documentManager = {
  saveView: (viewId, path, cb) => (dispatch) => {
    if (saveViewError) {
      return cb(new Error('save error'));
    }
    dispatch({ type: 'SAVE_VIEW', payload: { viewId, path } });
    return cb(null);
  },
};

const askCloseView = viewId => ({
  type: types.WS_ASK_CLOSE_VIEW,
  payload: { viewId },
});

const mockStore = configureMockStore([thunk, onCloseView(documentManager)]);

describe('store:serverProcess:middlewares:documents:onCloseView', () => {
  const store = mockStore({
    windows: { w1: { focusPage: 'p1', pages: ['p1'] } },
    pages: { p1: { uuid: 'p1', views: ['v1', 'v2', 'v3'] } },
    views: {
      v1: { uuid: 'v1' },
      v2: { uuid: 'v2', isModified: true, absolutePath: '/path' },
      v3: { uuid: 'v3', isModified: true },
    },
  });

  beforeEach(() => {
    saveViewError = false;
    store.clearActions();
  });

  test('simple close', () => {
    store.dispatch(askCloseView('v1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('close without saving', () => {
    store.dispatch(askCloseView('v2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'close', props: { modalId } } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save and close', () => {
    store.dispatch(askCloseView('v2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'save_and_close', props: { modalId } } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('save as and close', () => {
    store.dispatch(askCloseView('v3'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'save_and_close', props: { modalId } } });
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId, choice: '/the/path' } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open save as modal, then cancel', () => {
    store.dispatch(askCloseView('v3'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'save_and_close', props: { modalId } } });
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('error on saving (do not close)', () => {
    saveViewError = true;
    store.dispatch(askCloseView('v2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;
    store.dispatch({ type: types.WS_MODAL_CLOSE, payload: { choice: 'save_and_close', props: { modalId } } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
