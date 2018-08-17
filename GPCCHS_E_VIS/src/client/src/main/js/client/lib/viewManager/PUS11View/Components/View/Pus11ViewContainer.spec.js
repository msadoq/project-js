import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS11ViewContainer, { mapStateToProps } from './PUS11ViewContainer';

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
  describe('mapStateToProps', () => {
    const state = {};
    const props = { viewId: 'Pus11ViewId' };
    it('should update headers constants', () => {
      expect(mapStateToProps(state, props)).toEqual(
        {}
      );
    });
  });

  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS11ViewContainer, propsStub, stubState);
  });
});
