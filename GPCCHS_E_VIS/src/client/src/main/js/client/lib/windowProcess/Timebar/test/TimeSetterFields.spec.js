import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimeSetterFields from '../TimeSetter/TimeSetterFields';

const propsStub = {
  ms: 1480417090581,
  cursor: 'lower',
  disabled: false,
  onChange: () => null,
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  undisplayed: false,
};

it('TimesetterFields renders correctly', () => {
  const tree = renderer.create(
    <TimeSetterFields
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
