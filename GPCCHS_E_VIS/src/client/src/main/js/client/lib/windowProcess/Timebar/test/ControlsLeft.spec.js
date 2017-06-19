import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import ControlsLeft from '../Controls/ControlsLeft';

const propsStub = {
  updateSpeed: () => null,
  toggleTimesetter: () => null,
  pause: () => null,
  play: () => null,
  restoreWidth: () => null,
  goNow: () => null,
  jump: () => null,
  openModal: () => null,
  isPlaying: true,
  currentSessionExists: false,
  masterSessionId: 0,
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
