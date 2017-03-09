import sinon from 'sinon';
import * as types from '../types';
import * as actions from './windows';
import { freezeMe } from '../../common/test';

describe('store:actions:windows', () => {
  const state = freezeMe({
    windows: {
      w1: {
        focusedPage: 'p1',
        pages: ['p1'],
      },
      w2: {
        focusedPage: null,
        pages: [],
      },
    },
    pages: {
      p1: {
        timebarUuid: 'tb1',
      },
      p2: {
        timebarUuid: 'unknown',
      },
    },
    hsc: {
      playingTimebarId: 'tb1',
    },
  });
  let getState;
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = () => state;
  });

  describe('focusPage', () => {
    it('set focus', () => {
      actions.focusPage('myWindowId', 'p1')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'p1',
        },
      });
    });
    it('set pause then set focus', () => {
      actions.focusPage('myWindowId', 'p2')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.an('object');

      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'p2',
        },
      });
    });
  });
});
