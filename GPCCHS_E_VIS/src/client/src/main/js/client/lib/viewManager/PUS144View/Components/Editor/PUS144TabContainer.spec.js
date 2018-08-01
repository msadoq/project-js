import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import PUS144TabContainer from './PUS144TabContainer';

const propsStub = {
};

describe('PUS144TabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS144TabContainer, propsStub, stateTest);
  });
});

