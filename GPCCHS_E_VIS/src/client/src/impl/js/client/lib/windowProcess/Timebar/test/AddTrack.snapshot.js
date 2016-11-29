import React from 'react';
import renderer from 'react-test-renderer';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import SessionsFixture from '../../../../test/__mocks__/Sessions';
import AddTrack from '../AddTrack';

const propsStub = {
  onChange: () => null,
  toggleAddTimeline: () => null,
  timelines: TimelinesFixture,
  sessions: SessionsFixture,
  color: '#123789',
};

test('AddTrack renders correctly', () => {
  const tree = renderer.create(
    <AddTrack
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
