import * as actions from 'store/actions/views';
import { freezeArgs } from 'common/jest';
import viewConfigurationReducer from './reducer';

const reducer = freezeArgs(viewConfigurationReducer);

describe('store:reducer:viewConfiguration', () => {
  describe('touch', () => {
    const stateConf = {
      entryPoints: [],
    };
    test('should be touched', () => {
      const myView = reducer(stateConf, actions.touchViewConfiguration('myView'));
      expect(myView).not.toBe(stateConf);
    });
  });
  describe('remove EntryPoint', () => {
    const stateConf = {
      entryPoints: [
        { id: 'ep01' },
        { id: 'ep02' },
      ],
    };
    test('should be removed', () => {
      const myView = reducer(stateConf, actions.removeEntryPoint('myView', 'ep01'));
      expect(myView).toEqual({ entryPoints: [{ id: 'ep02' }] });
    });
  });
  describe('update EntryPoint', () => {
    const stateConf = {
      entryPoints: [
        { id: 'ep01' },
      ],
    };
    test('should be updated', () => {
      const myView = reducer(stateConf, actions.updateEntryPoint('myView', 'ep01', { id: 'ep01', connectedData: {} }));
      expect(myView.entryPoints[0]).toEqual({ id: 'ep01', connectedData: {} });
    });
  });
});
