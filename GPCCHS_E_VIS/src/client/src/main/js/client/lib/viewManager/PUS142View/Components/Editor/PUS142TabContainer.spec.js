import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS142TabContainer from './PUS142TabContainer';

const propsStub = {
};

describe('PUS142TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS142TabContainer, propsStub, stateTest);
  });
});

