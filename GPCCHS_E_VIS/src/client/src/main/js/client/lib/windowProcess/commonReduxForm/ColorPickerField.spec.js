import React from 'react';
import renderer from 'react-test-renderer';
import ColorPickerField from './ColorPickerField';

const propsStub = {
  input: {
    value: '#FFF',
    onChange: () => null,
  },
  color: '#F0F0F0',
};

it('Navigation renders correctly', () => {
  const tree = renderer.create(
    <ColorPickerField
      input={propsStub.input}
      color={propsStub.color}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
