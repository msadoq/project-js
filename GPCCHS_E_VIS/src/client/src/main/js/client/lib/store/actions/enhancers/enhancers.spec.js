// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Add tests about action creators enhancers
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Rename addUuids action creator enhancer into addUuidsToEntryPoints
// VERSION : 1.1.2 : FA : #5475 : 22/02/2017 : Debug ifPathChanged higher order action creator
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import __ from 'lodash/fp';
import { freezeArgs } from 'common/jest';
import addUuidsToEntryPoints from './addUuidsToEntryPoints';
import ifPathChanged from './ifPathChanged';

const createDummyAction = freezeArgs((payload = {}) => ({
  type: 'DUMMY_ACTION',
  payload,
  meta: { },
}));

describe('store:actions:enhancers', () => {
  describe('addUuidsToEntryPoints', () => {
    test('should does nothing', () => {
      const action = createDummyAction();
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      expect(enhancedAction).toEqual(action);
    });
    test('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoint: {} } });
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      expect(typeof enhancedAction.payload.configuration.entryPoint.id).toBe('string');
      expect(enhancedAction).not.toEqual(action);
    });
    test('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoints: [{}, {}, {}] } });
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      enhancedAction.payload.configuration.entryPoints.forEach((ep) => {
        expect(typeof ep.id).toBe('string');
      });
      expect(enhancedAction).not.toEqual(action);
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
    test('dispatches with null newPath', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: null });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeDefined();
      expect(result).toMatchObject({
        type: 'DUMMY_ACTION',
        payload: { viewId: 'v1', newPath: null },
      });
    });
    test('does nothing if unknown view', () => {
      const action = createDummyAction({ viewId: 'unknown' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeFalsy();
    });
    test('does nothing if resolved path are not different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '/..' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeFalsy();
    });
    test('dispatches action if resolved path are different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '.' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result.payload.newPath).toEqual('.');
      expect(result).toBeDefined();
    });
  });
});
