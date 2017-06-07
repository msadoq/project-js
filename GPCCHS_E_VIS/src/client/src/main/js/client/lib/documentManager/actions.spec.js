/* eslint-disable no-unused-expressions */
import * as types from '../store/types';
import { sinon, makeGetDispatch } from '../common/test';
import readView from './readView';
import * as readPageApi from './readPage';
import * as actions from './actions';

const getDispatch = makeGetDispatch();

describe('documentManager:actions', () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });
  describe('openView', () => {
    it('dispatches a message in case of error', () => {
      const dispatch = getDispatch();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { error: 'Error' });
      });
      actions.openView('viewInfo')(dispatch);
      expect(dispatch).have.been.calledOnce;
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'danger',
          messages: ['Error'],
        },
      });
    });
    it('dispatches a WS_VIEW_OPEN when view is loaded', () => {
      const dispatch = getDispatch();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        expect(viewInfo).toEqual('viewInfo');
        cb(null, { value: { title: 'my view' } });
      });
      actions.openView('viewInfo', 'myPageId')(dispatch);
      expect(dispatch).have.been.calledOnce;
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_VIEW_OPEN,
        payload: {
          pageId: 'myPageId',
          view: { title: 'my view' },
        },
      });
    });
  });
  describe('openPage', () => {
    it('dispatches a global error message in case of error', () => {
      const dispatch = getDispatch();
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        expect(pageInfo).toEqual('page_info');
        cb(null, { views: [{ error: 'Error view' }], pages: [{ error: 'Error page' }] });
      });
      actions.openPage('page_info')(dispatch);
      expect(dispatch).have.been.calledOnce;
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'danger',
          messages: ['Error view', 'Error page'],
        },
      });
    });
  });
});
