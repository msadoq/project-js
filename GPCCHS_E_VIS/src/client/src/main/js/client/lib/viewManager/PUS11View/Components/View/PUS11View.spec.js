import PUS11View from 'viewManager/PUS11View/Components/View/PUS11View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 11,
  scheduleStatus: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: Date.now(),
  lastUpdateType: 'string',
  subSchedules: [],
  enabledApids: [],
  commands: [],
};

describe('PUS11View :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS11View, propsStub, stateTest);
  });
});

