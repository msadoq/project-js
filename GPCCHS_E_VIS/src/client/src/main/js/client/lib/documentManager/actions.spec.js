import sinon from 'sinon';
import * as types from '../store/types';
import { mockStore } from '../common/test';
import readView from './readView';
import * as readPageApi from './readPage';
import * as actions from './actions';

describe('documentManager:actions', () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });
  describe('openView', () => {
    test('dispatches a message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { error: 'Error' });
      });
      store.dispatch(actions.openView('viewInfo'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'Error' }],
          },
        },
      ]);
    });
    test('dispatches a WS_VIEW_OPEN when view is loaded', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { value: { title: 'my view' } });
      });
      store.dispatch(actions.openView('viewInfo', 'myPageId'));
      expect(store.getActions()).toEqual([
        {
          type: types.WS_VIEW_OPEN,
          payload: {
            pageId: 'myPageId',
            view: { title: 'my view' },
          },
        },
      ]);
    });
  });
  describe('openPage', () => {
    test('dispatches a global error message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        expect(pageInfo).toEqual('page_info');
        cb(null, { views: [{ error: 'Error view' }], pages: [{ error: 'Error page' }] });
      });
      store.dispatch(actions.openPage('page_info'));
      expect(store.getActions()).toMatchObject([
        {
          type: types.WS_MESSAGE_ADD,
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'Error view' }, { content: 'Error page' }],
          },
        },
      ]);
    });
  });
});
