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
        pages: ['p1', 'p2', 'p3', 'p4'],
      },
    },
    pages: {
      p1: {
        timebarUuid: 'tb1',
        views: [1, 2, 3],
      },
      p2: {
        timebarUuid: 'unknown',
        views: [4, 5, 6],
      },
      p3: {
        views: [7, 8, 9],
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
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'p1',
        },
      });
    });
    it('set pause then set focus', () => {
      actions.focusPage('myWindowId', 'p2')(dispatch, getState);
      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');
      expect(typeof dispatch.getCall(1).args[0]).toBe('object');
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.HSC_PAUSE,
        payload: { },
      });

      expect(dispatch.getCall(1)).have.been.calledWith({
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'p2',
        },
      });
    });
  });
  describe('closeWindow', () => {
    it('dispatches an action with all documents ids which should be close', () => {
      actions.closeWindow('w2')(dispatch, getState);
      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');

      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_WINDOW_CLOSE,
        payload: {
          windowId: 'w2',
          pages: ['p1', 'p2', 'p3', 'p4'],
          views: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      });
    });
  });
});
