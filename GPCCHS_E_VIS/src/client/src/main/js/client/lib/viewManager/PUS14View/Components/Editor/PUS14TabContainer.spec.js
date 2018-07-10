import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS14TabContainer from './PUS14TabContainer';

const propsStub = {
};

describe('PUS14TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS14TabContainer, propsStub, stateTest);
  });
});

