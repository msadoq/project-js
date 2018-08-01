import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS19ViewContainer from './PUS19ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS19View/Components/View/PUS19ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS19ViewContainer, propsStub, stubState);
  });
});
