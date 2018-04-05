import GroundAlarmTab from 'viewManager/GroundAlarmView/Components/Editor/GroundAlarmTab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  cols: [],
  panels: {},
  updateTableCols: () => {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('GroundAlarmTab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(GroundAlarmTab, propsStub, stateTest);
  });
});

