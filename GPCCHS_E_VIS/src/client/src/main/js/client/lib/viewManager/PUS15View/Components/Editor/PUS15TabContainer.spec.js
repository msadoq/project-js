import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS15TabContainer from './PUS15TabContainer';

const propsStub = {
};

describe('PUS15TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS15TabContainer, propsStub, stateTest);
  });
});

