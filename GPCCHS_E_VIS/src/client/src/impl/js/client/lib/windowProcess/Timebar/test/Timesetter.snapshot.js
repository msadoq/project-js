import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import Timesetter from '../Timesetter';

const propsStub = {
  ...TimebarFixture,
  timebarId: TimebarFixture.timebarId,
  timebarMode: TimebarFixture.mode,
  updateCursors: () => null,
  onClose: () => null,
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
