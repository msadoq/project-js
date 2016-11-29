import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from 'mocks/Timebar'; // eslint-disable-line import/no-unresolved,import/extensions
import TimelinesFixture from 'mocks/Timelines'; // eslint-disable-line import/no-unresolved,import/extensions
import EditTrack from '../EditTrack';

const propsStub = {
  hideEditTimeline: () => null,
  editTimeline: () => null,
  timeline: TimelinesFixture[0],
  masterId: TimebarFixture.masterId,
};

test('EditTrack renders correctly', () => {
  const tree = renderer.create(
    <EditTrack
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
