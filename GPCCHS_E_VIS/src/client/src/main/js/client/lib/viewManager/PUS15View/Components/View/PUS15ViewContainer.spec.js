import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS15ViewContainer from './PUS15ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS15View/Components/View/PUS15ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS15ViewContainer, propsStub, stubState);
  });
});
