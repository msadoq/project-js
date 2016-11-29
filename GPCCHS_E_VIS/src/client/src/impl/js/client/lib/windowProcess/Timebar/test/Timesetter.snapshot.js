import React from 'react';
import renderer from 'react-test-renderer';
import Timesetter from '../Timesetter';
import TimebarFixture from '../../../../test/__mocks__/Timebar';

const propsStub = {
  ...TimebarFixture,
  timebarId: TimebarFixture.keyId,
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
