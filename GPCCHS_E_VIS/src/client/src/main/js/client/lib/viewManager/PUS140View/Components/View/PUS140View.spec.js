import PUS140View from 'viewManager/PUS140View/Components/View/PUS140View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 140,
  serviceApid: 140,
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: 1528359679639,
  lastUpdateType: 'string',
  parameters: [],
  apids: [{ apidName: 'ORBIT', apidRawValue: '0' }],
};

describe('viewManager/PUS140View/Components/View/PUS140View', () => {
  describe('PUS140View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS140View, propsStub, stateTest);
    });
  });
});
