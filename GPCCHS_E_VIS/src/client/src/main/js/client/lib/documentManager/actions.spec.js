/* eslint-disable no-unused-expressions */
import * as types from '../store/types';
import { sinon, makeGetDispatch } from '../common/test';
import * as readViewApi from './readView';
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
      stub = sinon.stub(readViewApi, 'simpleReadView', (viewInfo, cb) => {
        viewInfo.should.be.eql('viewInfo');
        cb('Error', { pageUuid: 1234 });
      });
      actions.openView('viewInfo')(dispatch);
      dispatch.should.have.been.calledOnce;
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 1234,
          type: 'danger',
          message: 'Error',
        },
      });
    });
    it('dispatches a loadDocuments when view is loaded', () => {
      const dispatch = getDispatch();
      stub = sinon.stub(readViewApi, 'simpleReadView', (viewInfo, cb) => {
        viewInfo.should.be.eql('viewInfo');
        cb(null, { title: 'my view' });
      });
      actions.openView('viewInfo')(dispatch);
      dispatch.should.have.been.calledOnce;
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_VIEW_OPEN,
        payload: {
          view: { title: 'my view' },
        },
      });
    });
  });
  describe('openPage', () => {
    it('dispatches a global error message in case of error', () => {
      const dispatch = getDispatch();
      stub = sinon.stub(readPageApi, 'readPageAndViews', (pageInfo, cb) => {
        pageInfo.should.be.eql('page_info');
        cb('Error');
      });
      actions.openPage('page_info')(dispatch);
      dispatch.should.have.been.calledOnce;
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_MESSAGE_ADD,
        payload: {
          containerId: 'global',
          type: 'danger',
          message: 'Error',
        },
      });
    });
  });
});
