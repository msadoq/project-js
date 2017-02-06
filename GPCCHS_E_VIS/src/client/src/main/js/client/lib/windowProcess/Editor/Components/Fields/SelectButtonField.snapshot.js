import React from 'react';
import renderer from 'react-test-renderer';
import SelectButtonField from './SelectButtonField';

const propsStub = {
  input: {
    value: 'testval',
    type: 'testtype',
  },
  buttons: ['ok'],
  type: 'testType',
};

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <SelectButtonField
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
