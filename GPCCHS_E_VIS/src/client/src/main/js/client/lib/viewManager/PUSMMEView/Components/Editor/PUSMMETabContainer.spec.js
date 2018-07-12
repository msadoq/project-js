import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUSMMETabContainer from './PUSMMETabContainer';

const propsStub = {
};

describe('PUSMMETabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUSMMETabContainer, propsStub, stateTest);
  });
});

