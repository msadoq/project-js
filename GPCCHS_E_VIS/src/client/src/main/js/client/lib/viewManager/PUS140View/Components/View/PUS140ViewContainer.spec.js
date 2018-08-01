import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS140ViewContainer from './PUS140ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS140View/Components/View/PUS140ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS140ViewContainer, propsStub, stubState);
  });
});
