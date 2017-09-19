import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import * as types from '../../../types';
import makeOnOpenPage from './onOpenPage';

const documentManager = {
  openPage: payload => ({
    type: 'OPEN_PAGE',
    payload,
  }),
};

const mockStore = configureMockStore([makeOnOpenPage(documentManager)]);

const askOpenPage = (absolutePath = '/', windowId = 'w1') => ({
  type: types.WS_ASK_OPEN_PAGE,
  payload: { windowId, absolutePath },
});

describe('store:serverProcess:middlewares:documents/makeOnOpenPage', () => {
  const store = mockStore({ hsc: { isWorkspaceOpened: true } });
  test('open a page directly', () => {
    store.dispatch(askOpenPage());
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open a page using filepicker', () => {
    store.dispatch(askOpenPage(''));
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
    store.clearActions();

    const dialogId = _.last(actions).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId, choice: ['the/chosen/one'] } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open a page using filepicker (cancel choice)', () => {
    store.dispatch(askOpenPage(''));
    const actions = store.getActions();
    expect(actions).toMatchSnapshot();
    store.clearActions();

    const dialogId = _.last(actions).payload.dialogId;
    store.dispatch({ type: 'HSC_DIALOG_CLOSED', payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });
});
