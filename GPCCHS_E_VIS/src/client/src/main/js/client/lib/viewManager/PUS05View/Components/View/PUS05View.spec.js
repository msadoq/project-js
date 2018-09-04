import PUS05View from 'viewManager/PUS05View/Components/View/PUS05View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 5,
  scheduleStatus: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: 1528359679639,
  lastUpdateType: 'string',
  onBoardEvents: [],
  received: [],
  openModal: () => null,
  onCommandCellDoubleClick: () => null,
};

describe('viewManager/PUS05View/Components/View/PUS05View', () => {
  describe('PUS05View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS05View, propsStub, stateTest);
    });
  });
});
