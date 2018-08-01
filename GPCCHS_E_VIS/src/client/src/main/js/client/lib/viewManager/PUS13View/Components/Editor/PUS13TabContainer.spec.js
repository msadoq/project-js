import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS13TabContainer from './PUS13TabContainer';

const propsStub = {
};

describe('PUS13TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS13TabContainer, propsStub, stateTest);
  });
});

