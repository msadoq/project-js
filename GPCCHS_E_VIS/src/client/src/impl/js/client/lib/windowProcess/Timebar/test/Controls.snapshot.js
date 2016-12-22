import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import Controls from '../Controls';

const propsStub = {
  updateSpeed: () => null,
  updateCursors: () => null,
  updateMode: () => null,
  toggleTimesetter: () => null,
  pause: () => null,
  play: () => null,
  switchToFixedMode: () => null,
  switchToExtensibleMode: () => null,
  switchToRealtimeMode: () => null,
  switchToNormalMode: () => null,
  restoreWidth: () => null,
  goNow: () => null,
  jump: () => null,
  isPlaying: true,
  currentSessionExists: true,
  timebarSpeed: TimebarFixture.speed,
  timebarMode: TimebarFixture.mode,
  timebarId: TimebarFixture.timebarId,
  messages: [],
};

test('Controls renders correctly', () => {
  const tree = renderer.create(
    <Controls {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
