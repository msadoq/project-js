import * as actions from '../../store/actions/views';
import viewConfigurationReducer from './reducer';
import { freezeArgs } from '../../common/jest';

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
});
