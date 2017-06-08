/* eslint-disable no-unused-expressions */
import * as types from '../store/types';
import { sinon, mockStore } from '../common/test';
import readView from './readView';
import * as readPageApi from './readPage';
import { add as addMessage } from '../store/actions/messages';
import * as actions from './actions';


describe('documentManager:actions', () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });
  describe('openView', () => {
    it('dispatches a message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { error: 'Error' });
      });
      store.dispatch(actions.openView('viewInfo'));
      expect(store.getActions()).toEqual([addMessage('global', 'danger', 'Error')]);
    });
    it('dispatches a WS_VIEW_OPEN when view is loaded', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { value: { title: 'my view' } });
      });
      store.dispatch(actions.openView('viewInfo', 'myPageId'));
      expect(store.getActions()).toEqual([{
        type: types.WS_VIEW_OPEN,
        payload: {
          pageId: 'myPageId',
          view: { title: 'my view' },
        },
      }]);
    });
  });
  describe('openPage', () => {
    it('dispatches a global error message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        expect(pageInfo).toEqual('page_info');
        cb(null, { views: [{ error: 'Error view' }], pages: [{ error: 'Error page' }] });
      });
      store.dispatch(actions.openPage('page_info'));
      expect(store.getActions()).toEqual([{
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'danger',
          messages: ['Error view', 'Error page'],
        },
      }]);
    });
  });
});
