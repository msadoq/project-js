import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimeSetter from '../TimeSetter';

const propsStub = {
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  timebarId: TimebarFixture.timebarId,
  timebarMode: TimebarFixture.mode,
  isPlaying: TimebarFixture.isPlaying,
  updateCursors: () => null,
  pause: () => null,
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
