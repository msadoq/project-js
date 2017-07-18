import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimeSetter from '../TimeSetter/TimeSetter';

const propsStub = {
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  timebarUuid: TimebarFixture.timebarUuid,
  timebarMode: TimebarFixture.mode,
  isPlaying: TimebarFixture.isPlaying,
  timebarRulerResolution: TimebarFixture.rulerResolution,
  cancelRemoveMessage: () => null,
  updateCursors: () => null,
  updateDefaultWidth: () => null,
  pause: () => null,
  jump: () => null,
  updateViewport: () => null,
  removeMessage: () => null,
  messages: [],
  cursor: 'lower',
};

test('Timesetter renders correctly', () => {
  const tree = renderer.create(
    <TimeSetter
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
