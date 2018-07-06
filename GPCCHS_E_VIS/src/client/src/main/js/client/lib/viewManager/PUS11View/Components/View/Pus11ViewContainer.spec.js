import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS11ViewContainer from './PUS11ViewContainer';

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

describe('viewManager/PUS11View/Components/View/PUS11ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS11ViewContainer, propsStub, stubState);
  });
});
