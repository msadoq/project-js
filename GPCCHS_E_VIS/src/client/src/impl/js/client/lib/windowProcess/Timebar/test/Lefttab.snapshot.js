import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from 'mocks/Timebar'; // eslint-disable-line import/no-unresolved,import/extensions
import TimelinesFixture from 'mocks/Timelines'; // eslint-disable-line import/no-unresolved,import/extensions
import SessionsFixture from 'mocks/Sessions'; // eslint-disable-line import/no-unresolved,import/extensions
import Lefttab from '../Lefttab';

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
  timebarId: TimebarFixture.timebarId,
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
