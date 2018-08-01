import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS18TabContainer from './PUS18TabContainer';

const propsStub = {
};

describe('PUS18TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS18TabContainer, propsStub, stateTest);
  });
});

