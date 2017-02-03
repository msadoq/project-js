import sinon from 'sinon';
import { identity, constant } from 'lodash/fp';
import * as types from '../types';
import { updatePath, updateAbsolutePath } from './views';
import { freezeMe, expect } from '../../common/test';

describe('store:actions:views', () => {
  const state = freezeMe({
    views: {
      view1: {
        path: '/folder1/oldPath',
        absolutePath: '/folder1/oldPath',
      },
    },
  });
  let dispatch;
  const getState = constant(state);

  beforeEach(() => {
    dispatch = sinon.spy(identity);
  });

  const doUpdatePathTests = (updatePathFn, type) => {
    it('should dispatch', () => {
      const action = updatePathFn('view1', '/folder1/newPath')(dispatch, getState);
      dispatch.calledOnce.should.be.eql(true);
      action.should.be.eql({
        type,
        payload: { viewId: 'view1', newPath: '/folder1/newPath' },
      });
    });
    it('should not dispatch when newPath is falsy', () => {
      const action = updatePathFn('view1', '')(dispatch, getState);
      dispatch.calledOnce.should.be.eql(false);
      expect(action).to.be.an('undefined');
    });
    it('should not dispatch when view is unknow', () => {
      const action = updatePathFn('unknow_view', '/folder1/newPath')(dispatch, getState);
      dispatch.calledOnce.should.be.eql(false);
      expect(action).to.be.an('undefined');
    });
    it('should not dispatch when newPath and oldPath are the same', () => {
      const oldPath = '../../../../../../../../../../../../folder1/oldPath';
      const action = updatePathFn('view1', oldPath)(dispatch, getState);
      dispatch.calledOnce.should.be.eql(false);
      expect(action).to.be.an('undefined');
    });
  };

  describe('updatePath', () => {
    doUpdatePathTests(updatePath, types.WS_VIEW_UPDATEPATH);
  });

  describe('updateAbsolutePath', () => {
    doUpdatePathTests(updateAbsolutePath, types.WS_VIEW_UPDATE_ABSOLUTEPATH);
  });
});
