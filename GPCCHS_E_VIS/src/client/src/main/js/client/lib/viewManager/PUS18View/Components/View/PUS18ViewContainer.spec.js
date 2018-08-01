import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS18ViewContainer from './PUS18ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS18View/Components/View/PUS18ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS18ViewContainer, propsStub, stubState);
  });
});
