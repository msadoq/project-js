import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from 'mocks/Timebar'; // eslint-disable-line import/no-unresolved,import/extensions
import TimesetterFields from '../TimesetterFields';

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
