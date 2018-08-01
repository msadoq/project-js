import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS142ViewContainer from './PUS142ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS142View/Components/View/PUS142ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS142ViewContainer, propsStub, stubState);
  });
});
