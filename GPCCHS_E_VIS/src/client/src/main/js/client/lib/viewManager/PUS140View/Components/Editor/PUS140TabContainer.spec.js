import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS140TabContainer from './PUS140TabContainer';

const propsStub = {
};

describe('PUS140TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS140TabContainer, propsStub, stateTest);
  });
});

