/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import { isV4 } from '../../common/test';
import * as actions from './pages';
import * as types from '../types';

describe('store:actions:pages', () => {
  let getState;
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = () => ({
      hsc: {
        focusWindow: 'w1',
      },
      timebars: { tb1: {} },
      windows: {
        w1: { pages: ['page1'] },
      },
    });
  });

  describe('addBlankPage', () => {
    it('dispatches WS_PAGE_ADD_BLANK with given windowId and newPageId', () => {
      actions.addBlankPage('myWindow1', 'myPage1')(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_PAGE_ADD_BLANK,
        payload: {
          windowId: 'myWindow1',
          page: { uuid: 'myPage1', timebarUuid: 'tb1' },
        },
      });
    });
    it('dispatches WS_PAGE_ADD_BLANK without windowId', () => {
      actions.addBlankPage(undefined, 'myPage1')(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_PAGE_ADD_BLANK,
        payload: {
          windowId: 'w1',
          page: { uuid: 'myPage1', timebarUuid: 'tb1' },
        },
      });
    });
    it('dispatched WS_PAGE_ADD_BLANK without newPageId', () => {
      actions.addBlankPage('myWindow1', undefined)(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_PAGE_ADD_BLANK,
        payload: {
          windowId: 'myWindow1',
          page: {
            uuid: dispatch.getCall(0).args[0].payload.page.uuid,
            timebarUuid: 'tb1',
          },
        },
      });
      expect(isV4(dispatch.getCall(0).args[0].payload.page.uuid)).toBe(true);
    });
    it('dispatched WS_PAGE_ADD_BLANK without windowId and newPageId', () => {
      actions.addBlankPage(undefined, undefined)(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_PAGE_ADD_BLANK,
        payload: {
          windowId: 'w1',
          page: {
            uuid: dispatch.getCall(0).args[0].payload.page.uuid,
            timebarUuid: 'tb1',
          },
        },
      });
      expect(isV4(dispatch.getCall(0).args[0].payload.page.uuid)).toBe(true);
    });
  });

  describe('moveViewToPage', () => {
    it('dispatches a WS_VIEW_MOVE_TO_PAGE', () => {
      actions.moveViewToPage('w1', 'fromPage', 'toPage', 'myViewId')(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_VIEW_MOVE_TO_PAGE,
        payload: {
          fromPageId: 'fromPage',
          toPageId: 'toPage',
          viewId: 'myViewId',
        },
      });
    });
    it('dispatches addBlankPage and WS_VIEW_MOVE_TO_PAGE', () => {
      actions.moveViewToPage('w1', 'fromPage', '', 'myViewId')(dispatch, getState);
      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');
      expect(typeof dispatch.getCall(1).args[0]).toBe('object');
      expect(dispatch.getCall(1)).have.been.calledWith({
        type: types.WS_VIEW_MOVE_TO_PAGE,
        payload: {
          fromPageId: 'fromPage',
          toPageId: dispatch.getCall(1).args[0].payload.toPageId,
          viewId: 'myViewId',
        },
      });
    });
  });
  describe('focusPage', () => {
    it('focusPage when page exists', () => {
      actions.focusPage('page1')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
    it('focusPage with unknown page', () => {
      actions.focusPage('unknownpage')(dispatch, getState);
      dispatch.should.have.been.callCount(0);
    });
  });
});
