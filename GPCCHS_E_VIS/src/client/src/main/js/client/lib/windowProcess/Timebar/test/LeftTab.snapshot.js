import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import SessionsFixture from '../../../../test/__mocks__/Sessions';
import LeftTab from '../LeftTab/LeftTab';

const propsStub = {
  addAndMountTimeline: () => null,
  unmountTimeline: () => null,
  onTimelinesVerticalScroll: () => null,
  updateId: () => null,
  updateMasterId: () => null,
  updateOffset: () => null,
  createNewTimeline: () => null,
  removeTimeline: () => null,
  updateTimebarId: () => null,
  updateSessionId: () => null,
  updateColor: () => null,
  collapseTimebar: () => null,
  timelines: TimelinesFixture,
  sessions: SessionsFixture,
  timebarUuid: TimebarFixture.timebarUuid,
  timebarName: TimebarFixture.id,
  focusedPageId: 'rezter-456789',
  masterId: TimebarFixture.masterId,
  verticalScroll: 0,
};

test('Lefttab renders correctly', () => {
  const tree = renderer.create(
    <LeftTab
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
