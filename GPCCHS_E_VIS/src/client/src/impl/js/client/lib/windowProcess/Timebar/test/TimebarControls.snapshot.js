import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import Controls from '../Controls';

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

test('Controls renders correctly', () => {
  const tree = renderer.create(
    <Controls {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
