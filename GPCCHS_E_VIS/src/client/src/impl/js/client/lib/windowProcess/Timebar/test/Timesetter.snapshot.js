import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import Timesetter from '../Timesetter';

const propsStub = {
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  timebarId: TimebarFixture.timebarId,
  timebarMode: TimebarFixture.mode,
  updateCursors: () => null,
  cursor: 'lower',
};

test('Timesetter renders correctly', () => {
  const tree = renderer.create(
    <Timesetter
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
