/* eslint-disable no-unused-expressions */
import identity from 'lodash/fp/identity';
import constant from 'lodash/fp/constant';

import { sinon, expect } from '../../common/test';
import createProfilingMiddleware from './profiling';

describe('store:middlewares', () => {
  describe('profiling', () => {
    const state = { data: true };
    let next;
    let profiler;
    let profilerCreator;
    let reduxAPI;
    let profilingMiddleware;
    beforeEach(() => {
      next = sinon.spy(identity);
      profilerCreator = sinon.spy(() => {
        profiler = {
          start: sinon.spy(),
          stop: sinon.spy(),
          print: sinon.spy(),
        };
        return profiler;
      });
      reduxAPI = { getState: sinon.spy(constant(state)), dispatch: sinon.spy(identity) };
      profilingMiddleware = createProfilingMiddleware(profilerCreator);
    });
    it('should make profiling', () => {
      const predicate = sinon.spy(constant(true));
      const action = {
        type: 'ANY_ACTION',
        payload: true,
        meta: {
          profiling: {
            namespace: 'namespace',
            key: 'key',
            msg: 'msg',
            predicate,
          },
        },
      };
      profilingMiddleware(reduxAPI)(next)(action).should.be.eql(action);
      expect(predicate.calledWith(state, action)).to.be.true;
      expect(profilerCreator.calledWith('namespace')).to.be.true;
      expect(profiler.start.calledWith('key')).to.be.true;
      expect(next.calledWith(action)).to.be.true;
      expect(profiler.stop.calledWith('key', 'msg')).to.be.true;
      expect(profiler.print.called).to.be.true;
      sinon.assert.callOrder(
        predicate,
        profilerCreator,
        profiler.start,
        next,
        profiler.stop,
        profiler.print
      );
    });
    it('should not make profiling when no meta.profiling', () => {
      const action = {
        type: 'ANY_ACTION',
        payload: true,
        meta: {},
      };
      profilingMiddleware(reduxAPI)(next)(action).should.be.eql(action);
      sinon.assert.notCalled(profilerCreator);
    });
    it('should not make profiling when predicate return false', () => {
      const predicate = sinon.spy(constant(false));
      const action = {
        type: 'ANY_ACTION',
        payload: true,
        meta: {
          profiling: { predicate },
        },
      };
      profilingMiddleware(reduxAPI)(next)(action).should.be.eql(action);
      expect(predicate.calledWith(state, action)).to.be.true;
      expect(predicate.returned(false)).to.be.true;
      sinon.assert.notCalled(profilerCreator);
    });
  });
});
