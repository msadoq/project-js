/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './views';
import { freezeMe, isV4 } from '../../common/test';

describe('store:actions:views', () => {
  const state = freezeMe({
    domains: [
      { name: 'fr.cnes.isis' },
    ],
    windows: {
      w1: {
        pages: ['pageWithLayout', 'emptyPage'],
      },
    },
    views: {
      textview: {
        uuid: 'textview',
        type: 'TextView',
        configuration: { collapsed: false },
        path: '/folder1/oldPath',
        absolutePath: '/folder1/oldPath',
      },
      plotview: {
        uuid: 'plotview',
        type: 'PlotView',
      },
    },
    pages: {
      pageWithLayout: {
        uuid: 'pageWithLayout',
        views: ['textview'],
        timebarUuid: 'tb1',
        layout: [
          {
            i: 'textview',
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
      emptyPage: {
        uuid: 'emptyPage',
        views: ['plotview'],
        timebarUuid: 'unknownTimbarId',
      },
    },
    timebars: {
      tb1: {
        masterId: 'masterId',
      },
    },
  });
  const emptyEntryPoint = {
    connectedData: {},
  };
  const entryPoint = {
    connectedData: { timeline: 1, domain: 2 },
  };

  let dispatch;
  const getState = () => state;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('update path', () => {
    describe('updatePath', () => {
      it('should dispatch', () => {
        actions.updatePath('textview', '/folder1/newPath')(dispatch, getState);
        expect(dispatch).have.been.calledOnce;
        dispatch.getCall(0).calledWith({
          type: types.WS_VIEW_UPDATEPATH,
          payload: { viewId: 'textview', newPath: '/folder1/newPath' },
        });
      });
      it('should dispatch when newPath is falsy', () => {
        actions.updatePath('textview', '')(dispatch, getState);
        expect(dispatch).have.been.calledOnce;
        dispatch.getCall(0).calledWith({
          type: types.WS_VIEW_UPDATEPATH,
          payload: { viewId: 'textview', newPath: '' },
        });
      });
      it('should not dispatch when view is unknow', () => {
        actions.updatePath('unknow_view', '/folder1/newPath')(dispatch, getState);
        expect(dispatch).have.not.been.calledOnce;
      });
      it('should not dispatch when newPath and oldPath are the same', () => {
        actions.updatePath('textview', '/../folder1/oldPath')(dispatch, getState);
        expect(dispatch).have.not.been.calledOnce;
      });
    });

    describe('updateAbsolutePath', () => {
      it('should dispatch', () => {
        actions.updateAbsolutePath('textview', '/folder1/newPath')(dispatch, getState);
        expect(dispatch).have.been.calledOnce;
        dispatch.getCall(0).calledWith({
          type: types.WS_VIEW_UPDATE_ABSOLUTEPATH,
          payload: { viewId: 'textview', newPath: '/folder1/newPath' },
        });
      });
      it('should not dispatch when newPath is falsy', () => {
        actions.updateAbsolutePath('textview', '')(dispatch, getState);
        expect(dispatch).have.been.calledOnce;
        dispatch.getCall(0).calledWith({
          type: types.WS_VIEW_UPDATE_ABSOLUTEPATH,
          payload: { viewId: 'textview', newPath: '' },
        });
      });
      it('should not dispatch when view is unknow', () => {
        actions.updateAbsolutePath('unknow_view', '/folder1/newPath')(dispatch, getState);
        expect(dispatch).have.not.been.calledOnce;
      });
      it('should not dispatch when newPath and oldPath are the same', () => {
        actions.updateAbsolutePath('textview', '/../folder1/oldPath')(dispatch, getState);
        expect(dispatch).have.not.been.calledOnce;
      });
    });
  });
  describe('addEntryPoint', () => {
    it('should works with a TexView, with empty entryPoint', () => {
      actions.addEntryPoint('textview', emptyEntryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');

      expect(isV4(dispatch.getCall(0).args[0].payload.entryPoint.id)).toBe(true);
      expect(dispatch.getCall(0).args[0]).have.properties({
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'textview',
          entryPoint: {
            connectedData: { timeline: '*', domain: '*' },
          },
        },
      });
    });
    it('should works with a TexView, with entryPoint', () => {
      actions.addEntryPoint('textview', entryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');

      expect(isV4(dispatch.getCall(0).args[0].payload.entryPoint.id)).toBe(true);
      expect(dispatch.getCall(0).args[0]).have.properties({
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'textview',
          entryPoint: {
            connectedData: { timeline: 1, domain: 2 },
          },
        },
      });
    });

    it('should works with a PlotView, with empty entryPoint', () => {
      actions.addEntryPoint('plotview', emptyEntryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');

      expect(isV4(dispatch.getCall(0).args[0].payload.entryPoint.id)).toBe(true);
      expect(dispatch.getCall(0).args[0]).have.properties({
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'plotview',
          entryPoint: {
            connectedData: { timeline: '*', domain: '*' },
          },
        },
      });
    });

    it('should works with a TexView, with entryPoint', () => {
      actions.addEntryPoint('plotview', entryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(1);
      expect(typeof dispatch.getCall(0).args[0]).toBe('object');

      expect(isV4(dispatch.getCall(0).args[0].payload.entryPoint.id)).toBe(true);
      expect(dispatch.getCall(0).args[0]).have.properties({
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'plotview',
          entryPoint: {
            connectedData: { timeline: 1, domain: 2 },
          },
        },
      });
    });
  });
  describe('dropEntryPoint', () => {
    it('should works with a TexView, with empty entryPoint', () => {
      actions.dropEntryPoint('textview', emptyEntryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');

      // TODO: dispatched action on drag should be listened by pages/page/panels reducer and
      // dispatch.getCall(1).args[0].should.be.an('object');
      //        open editor
      // dispatch.getCall(1).should.have.been.calledWith({
      //   type: types.WS_PAGE_EDITOR_OPEN,
      //   payload: {
      //     pageId: 'pageWithLayout',
      //     viewId: 'textview',
      //   },
      // });
    });
    it('should works with a TexView, with entryPoint', () => {
      actions.dropEntryPoint('textview', entryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');

      // TODO: dispatched action on drag should be listened by pages/page/panels reducer and
      // dispatch.getCall(1).args[0].should.be.an('object');
      //        open editor
      // dispatch.getCall(1).should.have.been.calledWith({
      //   type: types.WS_PAGE_EDITOR_OPEN,
      //   payload: {
      //     pageId: 'pageWithLayout',
      //     viewId: 'textview',
      //   },
      // });
    });
    it('should works with a PlotView, with empty entryPoint', () => {
      actions.dropEntryPoint('plotview', emptyEntryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');

      // TODO: dispatched action on drag should be listened by pages/page/panels reducer and
      // dispatch.getCall(1).args[0].should.be.an('object');
      //        open editor
      // dispatch.getCall(1).should.have.been.calledWith({
      //   type: types.WS_PAGE_EDITOR_OPEN,
      //   payload: {
      //     pageId: 'emptyPage',
      //     viewId: 'plotview',
      //   },
      // });
    });
    it('should works with a TexView, with entryPoint', () => {
      actions.dropEntryPoint('plotview', entryPoint)(dispatch, getState);

      expect(dispatch).have.been.callCount(2);
      expect(typeof dispatch.getCall(0).args[0]).toBe('function');

      // TODO: dispatched action on drag should be listened by pages/page/panels reducer and
      // dispatch.getCall(1).args[0].should.be.an('object');
      //        open editor
      // dispatch.getCall(1).should.have.been.calledWith({
      //   type: types.WS_PAGE_EDITOR_OPEN,
      //   payload: {
      //     pageId: 'emptyPage',
      //     viewId: 'plotview',
      //   },
      // });
    });
  });
  describe('focusView', () => {
    it('focusView when view exists', () => {
      actions.focusView('textview')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
    it('focusView with unknown view', () => {
      actions.focusView('unknownview')(dispatch, getState);
      dispatch.should.have.been.callCount(0);
    });
  });
});
