// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Restore commonEditor/Fields/FiltersFields tests + add test env in babelrc
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

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
