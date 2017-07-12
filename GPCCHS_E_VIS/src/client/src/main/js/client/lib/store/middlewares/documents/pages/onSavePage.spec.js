import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { withOpenModal, withOpenDialog } from '../helpers';
import { askSavePage } from '../../../actions/pages';
import onSavePage from './onSavePage';

const documentManager = {
  savePage: (pageId, absolutePath) => ({ type: 'SAVE_PAGE.spec', payload: { pageId, absolutePath } }),
};
const mockStore = configureMockStore([
  thunk,
  withOpenDialog(withOpenModal(onSavePage(documentManager))),
]);

describe('store:middlewares:documents:onSavePage', () => {
  test('simple save page', () => {
    const store = mockStore({
      pages: {
        p1: { views: [], absolutePath: '/an/absolute/path' },
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
  test('open a save filepicker, then save page (save as...)', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: ['v1'] },
      },
      views: {
        v1: { uuid: 'v1', title: 'View 1', absolutePath: '/an/absolute/path' },
      },
    });
    store.dispatch(askSavePage('p1', true));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save filepicker, then save page (new page with oid)', () => {
    const store = mockStore({
      windows: {
        w1: { pages: ['p1'] },
      },
      pages: {
        p1: { views: ['v1'], oId: 'OID' },
      },
      views: {
        v1: { uuid: 'v1', title: 'View 1' },
      },
    });
    store.dispatch(askSavePage('p1', true));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a save filepicker, then save page (new page with absolutePath)');
  test('open a save filepicker, then do nothing (cancel)');
  test('an unknown action should be next');
});
