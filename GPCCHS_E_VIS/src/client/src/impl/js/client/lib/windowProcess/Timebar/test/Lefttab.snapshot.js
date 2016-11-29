import React from 'react';
import renderer from 'react-test-renderer';
import Lefttab from '../Lefttab';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import SessionsFixture from '../../../../test/__mocks__/Timelines';

const propsStub = {
  addAndMountTimeline: () => null,
  unmountTimeline: () => null,
  onTimelinesVerticalScroll: () => null,
  updateId: () => null,
  updateMasterId: () => null,
  updateOffset: () => null,
  updateTimebarId: () => null,
  timelines: TimelinesFixture,
  sessions: SessionsFixture,
  timebarId: TimebarFixture.keyId,
  timebarName: TimebarFixture.id,
  focusedPageId: 'rezter-456789',
  masterId: TimebarFixture.masterId,
  verticalScroll: 0,
};

test('Lefttab renders correctly', () => {
  const tree = renderer.create(
    <Lefttab
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
