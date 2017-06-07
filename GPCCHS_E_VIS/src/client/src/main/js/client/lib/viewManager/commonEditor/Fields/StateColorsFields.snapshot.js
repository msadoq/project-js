import React from 'react';
import renderer from 'react-test-renderer';
import StateColorsFields from './StateColorsFields';

const propsStub = {
  fields: {
    push: () => null,
    remove: () => null,
    insert: () => null,
    getAll: () => [{
      color: '#FFAAFF',
      condition: {
        field: 'field',
        operator: '<=',
        operand: 'operand',
      },
    }],
  },
};

it('StateColorsFields renders correctly', () => {
  const tree = renderer.create(
    <StateColorsFields
      fields={propsStub.fields}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
