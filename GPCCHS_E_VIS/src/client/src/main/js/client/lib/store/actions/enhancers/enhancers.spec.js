import __ from 'lodash/fp';
import addUuids from './addUuids';
import ifPathChanged from './ifPathChanged';
import { should, freezeArgs } from '../../../common/test';

const createDummyAction = freezeArgs((payload = {}) => ({
  type: 'DUMMY_ACTION',
  payload,
  meta: { },
}));

describe('store:actions:enhancers', () => {
  describe('addUuids', () => {
    it('should does nothing', () => {
      const action = createDummyAction();
      const enhancedAction = addUuids(__.constant(action))();
      enhancedAction.should.be.eql(action);
    });
    it('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoint: {} } });
      const enhancedAction = addUuids(__.constant(action))();
      enhancedAction.payload.configuration.entryPoint.id.should.be.a('string');
      enhancedAction.should.not.be.eql(action);
    });
    it('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoints: [{}, {}, {}] } });
      const enhancedAction = addUuids(__.constant(action))();
      enhancedAction.payload.configuration.entryPoints.forEach((ep) => {
        ep.id.should.be.a('string');
      });
      enhancedAction.should.not.be.eql(action);
    });
  });
  describe('ifPathChanged', () => {
    const dispatch = __.identity;
    const getState = __.constant({
      views: {
        v1: {
          path: '/',
        },
      },
    });
    it('does nothing if no newPath', () => {
      const action = createDummyAction({ viewId: 'v1' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      should.not.exist(result);
    });
    it('does nothing if unknown view', () => {
      const action = createDummyAction({ viewId: 'unknown' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      should.not.exist(result);
    });
    it('does nothing if resolved path are not different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '/..' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      should.not.exist(result);
    });
    it('dispatch action if resolved path are different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '.' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      result.payload.newPath.should.be.eql('.');
      should.exist(result);
    });
  });
});
