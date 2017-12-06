import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { askSavePage } from 'store/actions/pages';
import { dialogClosed } from 'store/actions/ui';
import makeOnSavePage from './onSavePage';

const documentManager = {
  savePage: (pageId, absolutePath) => ({ type: 'SAVE_PAGE.spec', payload: { pageId, absolutePath } }),
};
const mockStore = configureMockStore([
  thunk,
  makeOnSavePage(documentManager),
]);

describe('store:middlewares:documents:makeOnSavePage', () => {
  test('simple save page with absolutePath', () => {
    const store = mockStore({
      pages: {
        p1: { views: [], absolutePath: '/an/absolute/path' },
      },
    });
    store.dispatch(askSavePage('p1', false));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('simple save page with oId', () => {
    const store = mockStore({
      pages: {
        p1: { views: [], oId: 'oid:/an/absolute/path' },
      },
    });
    store.dispatch(askSavePage('p1', false));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save wizard when page has new views', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: ['v1'], absolutePath: '/an/absolute/path' },
      },
      views: {
        v1: { uuid: 'v1', title: 'View 1' },
      },
    });
    store.dispatch(askSavePage('p1', false));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save filepicker, then save page as... (because no oid and absolutePath)', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: [] },
      },
    });
    store.dispatch(askSavePage('p1', false));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch(dialogClosed('w1', 'myChoice', {}, dialogId));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save filepicker, then save page as... (because saveAs true in payload)', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: [], absolutePath: '/an/absolute/path' },
      },
    });
    store.dispatch(askSavePage('p1', true));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch(dialogClosed('w1', 'myChoice', {}, dialogId));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save filepicker, then do nothing (cancel)', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: [] },
      },
    });
    store.dispatch(askSavePage('p1', true));
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch(dialogClosed('w1', null, {}, dialogId));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('an unknown action should be next', () => {
    const store = mockStore({});
    store.dispatch({ type: 'TEST' });
    expect(store.getActions()).toEqual([{ type: 'TEST' }]);
  });
});
