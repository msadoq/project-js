import AddTimelineWrapper from './AddTimelineWrapper';
import { shallowRenderSnapshot } from '../../../common/jest/utils';
import stateTest from '../../../common/jest/stateTest';

const propsStub = {
  closeModal: () => null,
  createNewTimeline: () => null,
  updateMasterId: () => null,
  updateOffset: () => null,
  timebarUuid: Object.keys(stateTest.timebars)[0],
  timelines: stateTest.timelines,
  sessions: stateTest.sessions,
};

describe('windowProcess/Timebar/LeftTab/AddTimelineWrapper', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(AddTimelineWrapper, propsStub, {});
  });
});
