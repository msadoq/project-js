import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS19TabContainer from './PUS19TabContainer';

const propsStub = {
};

describe('PUS19TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS19TabContainer, propsStub, stateTest);
  });
});

