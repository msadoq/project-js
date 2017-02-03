import React from 'react';
import renderer from 'react-test-renderer';
import ColorPickerField from './ColorPickerField';

const propsStub = {
  input: {
    value: 'testval',
  },
};

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <ColorPickerField
      input={propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
