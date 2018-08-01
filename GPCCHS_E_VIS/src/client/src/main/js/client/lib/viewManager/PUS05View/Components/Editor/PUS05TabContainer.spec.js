import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS05TabContainer from './PUS05TabContainer';

const propsStub = {
};

describe('PUS05TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS05TabContainer, propsStub, stateTest);
  });
});

