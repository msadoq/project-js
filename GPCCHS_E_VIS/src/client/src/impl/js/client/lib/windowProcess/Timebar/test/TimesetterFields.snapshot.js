import React from 'react';
import renderer from 'react-test-renderer';
import TimesetterFields from '../TimesetterFields';
import TimebarFixture from '../../../../test/__mocks__/Timebar';

const propsStub = {
  ms: 1480417090581,
  value: 'lower',
  disabled: false,
  onChange: () => null,
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
};

test('TimesetterFields renders correctly', () => {
  const tree = renderer.create(
    <TimesetterFields
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
