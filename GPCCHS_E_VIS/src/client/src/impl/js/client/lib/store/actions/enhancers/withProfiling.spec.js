/* eslint-disable no-unused-expressions */
import constant from 'lodash/fp/constant';
import { sinon, expect } from '../../../common/test';
import withProfiling from './withProfiling';

describe('actions/enhancers', () => {
  describe('withProfiling higher order action creator', () => {
    it('enhanced action creator should take several parameters', () => {
      const actionCreator = () => ({ type: 'ANY_ACTION', payload: true });
      const enhancedActionCreator = sinon.spy(withProfiling('', actionCreator));
      enhancedActionCreator(1, 2, 3, 4);
      expect(enhancedActionCreator.calledWith(1, 2, 3, 4)).to.be.true;
    });
    it('works without .meta', () => {
      const action = { type: 'ANY_ACTION', payload: true };
      const enhancedAction = withProfiling('The message', constant(action))();

      enhancedAction.should.have.properties({ type: 'ANY_ACTION', payload: true });
      enhancedAction.meta.profiling.predicate.should.be.a('function');
      enhancedAction.meta.profiling.predicate().should.be.true;
      enhancedAction.meta.profiling.should.have.properties({
        namespace: 'ANY_ACTION',
        key: 'ANY_ACTION',
        msg: 'The message',
      });
    });
    it('do not overrides other .meta fields', () => {
      const action = { type: 'ANY_ACTION', payload: true, meta: { test: true } };
      const enhancedAction = withProfiling('The message', constant(action))();

      enhancedAction.meta.test.should.be.true;
    });
    it('overrides meta.profiling field', () => {
      const action = { type: 'ANY_ACTION', payload: true, meta: { profiling: { test: true } } };
      const enhancedAction = withProfiling('The message', constant(action))();
      expect(enhancedAction.meta.profiling.test).to.be.an('undefined');
    });
    it('execute msg if is a function', () => {
      const action = { type: 'ANY_ACTION', payload: true };
      const msg = sinon.spy(constant('The message'));
      const enhancedAction = withProfiling(msg, constant(action))();
      enhancedAction.meta.profiling.msg.should.be.eql('The message');
      expect(msg.calledWith(action)).to.be.true;
    });
    it('works with custom options', () => {
      const action = { type: 'ANY_ACTION', payload: true };
      const options = { predicate: constant(42), namespace: 'namespace', key: 'key' };
      const enhancedAction = withProfiling('The message', constant(action), options)();
      enhancedAction.meta.profiling.predicate.should.be.a('function');
      enhancedAction.meta.profiling.predicate().should.be.eql(42);
      enhancedAction.meta.profiling.should.have.properties({
        namespace: 'namespace',
        key: 'key',
        msg: 'The message',
      });
    });
  });
});
