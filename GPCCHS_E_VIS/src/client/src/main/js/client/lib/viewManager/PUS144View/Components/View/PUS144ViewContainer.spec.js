import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS144ViewContainer from './PUS144ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS144View/Components/View/PUS144ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS144ViewContainer, propsStub, stubState);
  });
});
