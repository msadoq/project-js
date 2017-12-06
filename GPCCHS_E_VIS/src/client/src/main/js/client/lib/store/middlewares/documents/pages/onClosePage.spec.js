import _ from 'lodash/fp';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from 'store/types';
import makeOnClosePage from './onClosePage';

const mockStore = configureMockStore([thunk, makeOnClosePage()]);

const askClosePage = pageId => ({
  type: types.WS_ASK_CLOSE_PAGE,
  payload: { pageId },
});

describe('store:serverProcess:middlewares:documents/makeOnClosePage', () => {
  const store = mockStore({
    windows: {
      w1: { pages: ['p1', 'p2'] },
    },
    pages: {
      p1: { views: ['v1', 'v2'] },
      p2: { views: ['v3', 'v4'], isModified: true },
      p3: { views: ['v1', 'v2'], isModified: true },
      p4: { views: ['v3'] },
    },
    views: { v1: {}, v2: {}, v3: { isModified: true }, v4: {} },
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('close page', () => {
    store.dispatch(askClosePage('p1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('page and views are modified', () => {
    store.dispatch(askClosePage('p2'));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('page is modified', () => {
    store.dispatch(askClosePage('p3'));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('views are modified', () => {
    store.dispatch(askClosePage('p4'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('close page using save wizard', () => {
    store.dispatch(askClosePage('p2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;

    store.dispatch({
      type: types.WS_MODAL_CLOSE,
      payload: {
        choice: 'close',
        props: { modalId },
      },
    });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('do not close page when cancel with save wizard', () => {
    store.dispatch(askClosePage('p2'));
    const modalId = _.last(store.getActions()).payload.props.modalId;

    store.dispatch({
      type: types.WS_MODAL_CLOSE,
      payload: {
        props: { modalId },
      },
    });
    expect(store.getActions()).toMatchSnapshot();
  });
});
