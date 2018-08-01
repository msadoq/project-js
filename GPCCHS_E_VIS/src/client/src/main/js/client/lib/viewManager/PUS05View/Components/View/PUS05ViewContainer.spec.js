import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS05ViewContainer from './PUS05ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  spaceInNumberOfCommands: 'spaceInNumberOfCommands',
  scheduleStatus: 'scheduleStatus',
  lastUpdateTimeScheduleStatus: 'lastUpdateTimeScheduleStatus',
  lastUpdateModeScheduleStatus: 'lastUpdateModeScheduleStatus',
  noFreeCommands: 'noFreeCommands',
  lastUpdateTimeNoFreeCommands: 'lastUpdateTimeNoFreeCommands',
  lastUpdateModeNoFreeCommands: 'lastUpdateModeNoFreeCommands',
  freeSpace: 'freeSpace',
  lastUpdateTimeFreeSpace: 'lastUpdateTimeFreeSpace',
  lastUpdateModeFreeSpace: 'lastUpdateModeFreeSpace',
  serviceApidName: 'serviceApidName',
};

describe('viewManager/PUS05View/Components/View/PUS05ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS05ViewContainer, propsStub, stubState);
  });
});
