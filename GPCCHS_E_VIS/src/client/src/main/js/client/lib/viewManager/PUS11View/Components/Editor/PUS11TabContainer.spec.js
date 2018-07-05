import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS11TabContainer from './PUS11TabContainer';

const propsStub = {
};

describe('PUS11TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS11TabContainer, propsStub, stateTest);
  });
});

