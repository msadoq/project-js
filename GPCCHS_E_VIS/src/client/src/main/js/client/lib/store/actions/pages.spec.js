/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './pages';
import { createGetState } from '../../common/test';

describe('store:actions:pages', () => {
  let getState;
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = createGetState([
      {
        pages: {
          p1: {
            layout: [],
            views: [],
          },
          p2: {
            layout: [],
            views: ['v1', 'v2', 'v3'],
          },
        },
        views: {
          v1: {
            configuration: {
              collapsed: true,
            },
          },
          v2: {
            configuration: {
              collapsed: true,
            },
          },
          v3: {
            configuration: {
              collapsed: false,
            },
          },
        },
      },
      {
        pages: {
          p1: {
            layout: [],
            views: [],
          },
          newPageId: {
            layout: [],
            views: [],
          },
        },
        views: {
          v1: {
            configuration: {
              collapsed: true,
            },
          },
          v2: {
            configuration: {
              collapsed: true,
            },
          },
        },
      },
    ]);
  });

  describe('updateLayout', () => {
    it('dispatches a simple updateLayout', () => {
      actions.updateLayout('myPageId', [])(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_UPDATE_LAYOUT,
        payload: {
          pageId: 'myPageId',
          layout: [],
        },
      });
    });
    it('uncollapses all collapsed layouts with height upper than 1px', () => {
      const layouts = [
        { h: 0 },
        { h: 3, i: 'unknownView' },
        { h: 3, i: 'v1' },
        { h: 3, i: 'v2' },
        { h: 3, i: 'v3' },
      ];
      actions.updateLayout('myPageId', layouts)(dispatch, getState);
      dispatch.should.have.been.callCount(3);

      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_VIEW_SETCOLLAPSED,
        payload: {
          viewId: 'v1',
          flag: false,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_VIEW_SETCOLLAPSED,
        payload: {
          viewId: 'v2',
          flag: false,
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_PAGE_UPDATE_LAYOUT,
        payload: {
          pageId: 'myPageId',
          layout: layouts,
        },
      });
    });
  });

  describe('addAndMount', () => {
    it('adds blank view then mount', () => {
      actions.addAndMount('myPageId')(dispatch, getState);
      dispatch.should.have.been.callCount(2);

      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).args[0].type.should.be.eql(types.WS_VIEW_ADD);

      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].type.should.be.eql(types.WS_PAGE_VIEW_MOUNT);
    });
    it('adds view then mount', () => {
      actions.addAndMount('myPageId', 'newId', {})(dispatch, getState);
      dispatch.should.have.been.callCount(2);

      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).args[0].type.should.be.eql(types.WS_VIEW_ADD);

      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].type.should.be.eql(types.WS_PAGE_VIEW_MOUNT);
    });
  });

  describe('unmountAndRemove', () => {
    it('removes and unmounts a view', () => {
      actions.unmountAndRemove('myPageId', 'myViewId')(dispatch, getState);
      dispatch.should.have.been.callCount(2);

      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_VIEW_UNMOUNT,
        payload: {
          pageId: 'myPageId',
          viewId: 'myViewId',
        },
      });

      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_VIEW_REMOVE,
        payload: {
          viewId: 'myViewId',
        },
      });
    });
  });

  describe('moveViewToPage', () => {
    it('doest nothing when move a view to the same page', () => {
      actions.moveViewToPage('myWindowId', 'page1', 'page1', 'myViewId')(dispatch, getState);
      dispatch.should.not.been.called;
    });
    it('remounts view to an other page', () => {
      actions.moveViewToPage('myWindowId', 'oldPageId', 'p1', 'myViewId')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_VIEW_UNMOUNT,
        payload: {
          pageId: 'oldPageId',
          viewId: 'myViewId',
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_PAGE_VIEW_MOUNT,
        payload: {
          pageId: 'p1',
          viewId: 'myViewId',
          layout: [{ i: 'myViewId', w: 5, h: 5, x: 0, y: 0 }],
        },
      });
    });
    it('creates another page if does not exist', () => {
      actions.moveViewToPage('myWindowId', 'oldPageId', 'newPageId', 'myViewId')(dispatch, getState);
      dispatch.should.have.been.callCount(4);

      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');
      dispatch.getCall(3).args[0].should.be.an('object');

      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_PAGE_VIEW_UNMOUNT,
        payload: {
          pageId: 'oldPageId',
          viewId: 'myViewId',
        },
      });
      dispatch.getCall(3).should.have.been.calledWith({
        type: types.WS_PAGE_VIEW_MOUNT,
        payload: {
          pageId: 'newPageId',
          viewId: 'myViewId',
          layout: [{ i: 'myViewId', w: 5, h: 5, x: 0, y: 0 }],
        },
      });
    });
  });
  describe('remove', () => {
    it('does nothing when page doest not exist', () => {
      actions.remove('unknownPage')(dispatch, getState);
      dispatch.should.not.have.been.called;
    });
    it('remove page without associated views', () => {
      actions.remove('p1')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_PAGE_REMOVE,
        payload: {
          pageId: 'p1',
        },
      });
    });
    it('remove page and all associated views', () => {
      actions.remove('p2')(dispatch, getState);
      dispatch.should.have.been.callCount(4);
      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.a('function');
      dispatch.getCall(3).args[0].should.be.an('object');

      dispatch.getCall(3).should.have.been.calledWith({
        type: types.WS_PAGE_REMOVE,
        payload: {
          pageId: 'p2',
        },
      });
    });
  });
});
