// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix windowProcess/commonReduxForm jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import SelectButtonField from './SelectButtonField';

const propsStub = {
  input: {
    value: 'testval',
    type: 'testtype',
    onChange: () => null,
  },
  buttons: [{
    value: 'testval',
    label: 'testlabel',
  }],
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
