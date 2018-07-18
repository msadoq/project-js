import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS14ViewContainer from './PUS14ViewContainer';

const stubState = {};

const propsStub = {
  groundDate: 1527520025823,
  serviceApid: 100,
  status: 1,
  serviceApidName: 'myString',
  uniqueId: 100,
};

describe('viewManager/PUS14View/Components/View/PUS14ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS14ViewContainer, propsStub, stubState);
  });
});
