// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix windowProcess/commonReduxForm jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #7145 : 02/08/2017 : Fix InputField component test .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import InputField from './InputField';

const propsStub = {
  input: {
    onChange: () => {},
    value: 'testval',
    type: 'testtype',
  },
  className: '',
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
