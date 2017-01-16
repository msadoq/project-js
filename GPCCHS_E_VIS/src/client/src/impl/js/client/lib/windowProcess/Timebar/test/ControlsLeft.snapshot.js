import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import ControlsLeft from '../ControlsLeft';

const propsStub = {
  updateSpeed: () => null,
  toggleTimesetter: () => null,
  pause: () => null,
  play: () => null,
  restoreWidth: () => null,
  goNow: () => null,
  jump: () => null,
  isPlaying: true,
  timebarSpeed: TimebarFixture.speed,
  timebarMode: TimebarFixture.mode,
  timebarUuid: TimebarFixture.timebarUuid,
  messages: [],
};

test('Controls renders correctly', () => {
  const tree = renderer.create(
    <ControlsLeft {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
