/* eslint-disable no-unused-expressions */
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

  describe('add', () => {
    it('add a window without page', () => {
      actions.add()(dispatch, getState);
      dispatch.should.have.been.callCount(2);

      dispatch.getCall(0).calledWith({
        type: types.WS_WINDOW_ADD,
        payload: {
          windowId: undefined,
          title: undefined,
          geometry: undefined,
          pages: undefined,
          focusedPage: undefined,
          isModified: undefined,
        },
      });
      dispatch.getCall(1).args[0].should.be.a('function');
    });
    it('add a window with page', () => {
      actions.add(true, true, true, true, true, true)(dispatch, getState);
      dispatch.should.have.been.calledOnce;

      dispatch.getCall(0).calledWith({
        type: types.WS_WINDOW_ADD,
        payload: {
          windowId: true,
          title: true,
          geometry: true,
          pages: true,
          focusedPage: true,
          isModified: true,
        },
      });
    });
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
  describe('addAndMount', () => {
    it('add Page with new id', () => {
      actions.addAndMount('myWindowId')(dispatch, getState);
      dispatch.should.have.been.callCount(3);

      dispatch.getCall(0).args[0].should.be.an('function');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(1).args[0].type.should.be.eql(types.WS_WINDOW_PAGE_MOUNT);
    });

    it('add Page with existing page object', () => {
      actions.addAndMount('myWindowId', 'myPageId', {})(dispatch, getState);
      dispatch.should.have.been.callCount(3);

      dispatch.getCall(0).args[0].should.be.an('function');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(1).args[0].type.should.be.eql(types.WS_WINDOW_PAGE_MOUNT);
    });
  });
  describe('unmountAndRemove', () => {
    it('remove unselected page', () => {
      actions.unmountAndRemove('w1', 'p2')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_WINDOW_PAGE_UNMOUNT,
        payload: {
          windowId: 'w1',
          pageId: 'p2',
        },
      });
    });
    it('remove selected page', () => {
      actions.unmountAndRemove('w1', 'p1')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_WINDOW_PAGE_UNMOUNT,
        payload: {
          windowId: 'w1',
          pageId: 'p1',
        },
      });
    });
    it('remove last page', () => {
      actions.unmountAndRemove('w2', 'unknown')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_WINDOW_PAGE_UNMOUNT,
        payload: {
          windowId: 'w2',
          pageId: 'unknown',
        },
      });
    });
  });
});
