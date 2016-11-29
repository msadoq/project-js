import React from 'react';
import renderer from 'react-test-renderer';
import TimelinesFixture from 'mocks/Timelines'; // eslint-disable-line import/no-unresolved,import/extensions
import SessionsFixture from 'mocks/Sessions'; // eslint-disable-line import/no-unresolved,import/extensions
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
