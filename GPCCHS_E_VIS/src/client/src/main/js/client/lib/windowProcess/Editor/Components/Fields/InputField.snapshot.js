import React from 'react';
import renderer from 'react-test-renderer';
import InputField from './InputField';

const propsStub = {
  input: {
    value: 'testval',
    type: 'testtype',
  },
  meta: {
    touched: true,
  },
  type: 'testType',
};

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <InputField
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
