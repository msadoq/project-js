/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './views';
import { freezeMe } from '../../common/test';

describe('store:actions:views', () => {
  const state = freezeMe({
    views: {
      view1: {
        configuration: { collapsed: false },
        path: '/folder1/oldPath',
        absolutePath: '/folder1/oldPath',
      },
    },
    pages: {
      page1: {
        layout: [
          {
            i: 'view1',
            maxH: 100,
            maxW: 100,
            x: 0,
            y: 0,
            h: 3,
            w: 5,
          },
          {
            i: 'unknown',
            maxH: 100,
            maxW: 100,
            x: 0,
            y: 0,
            h: 3,
            w: 5,
          },
        ],
      },
    },
  });
  let dispatch;
  const getState = () => state;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('update path', () => {
    const doUpdatePathTests = (updatePathFn, type) => {
      it('should dispatch', () => {
        updatePathFn('view1', '/folder1/newPath')(dispatch, getState);
        dispatch.should.have.been.calledOnce;
        dispatch.getCall(0).calledWith({
          type,
          payload: { viewId: 'view1', newPath: '/folder1/newPath' },
        });
      });
      it('should not dispatch when newPath is falsy', () => {
        updatePathFn('view1', '')(dispatch, getState);
        dispatch.should.have.not.been.calledOnce;
      });
      it('should not dispatch when view is unknow', () => {
        updatePathFn('unknow_view', '/folder1/newPath')(dispatch, getState);
        dispatch.should.have.not.been.calledOnce;
      });
      it('should not dispatch when newPath and oldPath are the same', () => {
        updatePathFn('view1', '/../folder1/oldPath')(dispatch, getState);
        dispatch.should.have.not.been.calledOnce;
      });
    };

    describe('updatePath', () => {
      doUpdatePathTests(actions.updatePath, types.WS_VIEW_UPDATEPATH);
    });

    describe('updateAbsolutePath', () => {
      doUpdatePathTests(actions.updateAbsolutePath, types.WS_VIEW_UPDATE_ABSOLUTEPATH);
    });
  });

  describe('setCollapsedAndUpdateLayout', () => {
    it('collapses', () => {
      actions.setCollapsedAndUpdateLayout('page1', 'view1', true)(dispatch, getState);

      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_VIEW_SETCOLLAPSED,
        payload: { viewId: 'view1', flag: true },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_VIEW_SETMODIFIED,
        payload: { viewId: 'view1', flag: true },
      });

      const dispatchedThunk = dispatch.getCall(0).args[0];

      dispatch.reset(); // reset dispatch spy
      dispatchedThunk(dispatch, getState);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_UPDATE_LAYOUT,
        payload: {
          pageId: 'page1',
          layout: [
            {
              minW: 3,
              minH: 3,
              i: 'view1',
              maxH: 3,
              maxW: 5,
              x: 0,
              y: 0,
              h: 1,
              w: 3,
            },
            {
              minW: 3,
              minH: 3,
              i: 'unknown',
              maxH: 100,
              maxW: 100,
              x: 0,
              y: 0,
              h: 3,
              w: 5,
            },
          ],
        },
      });
    });
    it('uncollapses', () => {
      actions.setCollapsedAndUpdateLayout('page1', 'view1', false)(dispatch, getState);

      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_VIEW_SETCOLLAPSED,
        payload: { viewId: 'view1', flag: false },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_VIEW_SETMODIFIED,
        payload: { viewId: 'view1', flag: true },
      });

      const dispatchedThunk = dispatch.getCall(0).args[0];

      dispatch.reset(); // reset dispatch spy
      dispatchedThunk(dispatch, getState);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_UPDATE_LAYOUT,
        payload: {
          pageId: 'page1',
          layout: [
            {
              minW: 3,
              minH: 3,
              i: 'view1',
              maxH: undefined,
              maxW: undefined,
              x: 0,
              y: 0,
              h: 100,
              w: 100,
            },
            {
              minW: 3,
              minH: 3,
              i: 'unknown',
              maxH: 100,
              maxW: 100,
              x: 0,
              y: 0,
              h: 3,
              w: 5,
            },
          ],
        },
      });
    });
  });
});
