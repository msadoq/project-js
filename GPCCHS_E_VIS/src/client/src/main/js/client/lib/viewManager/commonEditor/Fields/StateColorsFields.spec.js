// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Restore some snapshots in viewManager and windowProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

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

test('StateColorsFields renders correctly', () => {
  const tree = renderer.create(
    <StateColorsFields
      fields={propsStub.fields}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
