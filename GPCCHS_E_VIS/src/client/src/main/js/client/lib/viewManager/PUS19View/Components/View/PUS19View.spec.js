import PUS19View from 'viewManager/PUS19View/Components/View/PUS19View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-196b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 19,
  serviceApid: 19,
  serviceApidName: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: 1528359679639,
  lastUpdateType: 'string',
  onBoardStorages: [],
  stroragesDef: [],
  apids: [{ apidName: 'ORBIT', apidRawValue: '0' }],
};

describe('viewManager/PUS19View/Components/View/PUS19View', () => {
  describe('PUS19View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS19View, propsStub, stateTest);
    });
  });
});
