import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from 'mocks/Timebar'; // eslint-disable-line import/no-unresolved,import/extensions
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
