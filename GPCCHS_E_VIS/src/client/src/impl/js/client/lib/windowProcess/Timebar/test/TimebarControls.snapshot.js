import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimebarControls from '../TimebarControls';

const propsStub = {
  updateSpeed: () => null,
  updateCursors: () => null,
  updateMode: () => null,
  pause: () => null,
  play: () => null,
  isPlaying: true,
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  timebarSpeed: TimebarFixture.speed,
  timebarMode: TimebarFixture.mode,
  timebarId: TimebarFixture.timebarId,
  currentSessionOffsetMs: 800,
};

test('TimebarControls renders correctly', () => {
  const tree = renderer.create(
    <TimebarControls {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
