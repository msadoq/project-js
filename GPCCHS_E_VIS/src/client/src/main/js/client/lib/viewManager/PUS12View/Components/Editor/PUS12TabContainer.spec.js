import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS12TabContainer from './PUS12TabContainer';

const propsStub = {
};

describe('PUS12TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS12TabContainer, propsStub, stateTest);
  });
});

