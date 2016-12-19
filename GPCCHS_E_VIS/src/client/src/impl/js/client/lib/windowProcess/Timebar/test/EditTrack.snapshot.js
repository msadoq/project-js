import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import EditTrack from '../EditTrack';

const propsStub = {
  hideEditTimeline: () => null,
  onClose: () => null,
  editTimeline: () => null,
  timeline: TimelinesFixture[0],
  masterId: TimebarFixture.masterId,
  sessions: [],
};

test('EditTrack renders correctly', () => {
  const tree = renderer.create(
    <EditTrack
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
