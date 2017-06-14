import React from 'react';
import renderer from 'react-test-renderer';
import FiltersFields from './FiltersFields';

const propsStub = {
  fields: {
    push: () => null,
    remove: () => null,
    insert: () => null,
    getAll: () => [{
      field: 'convertedValue',
      operator: '<=',
      operand: '0',
    }],
  },
};

describe('component:FiltersFields', () => {
  test('FiltersFields renders correctly', () => {
    const tree = renderer.create(
      <FiltersFields
        fields={propsStub.fields}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
