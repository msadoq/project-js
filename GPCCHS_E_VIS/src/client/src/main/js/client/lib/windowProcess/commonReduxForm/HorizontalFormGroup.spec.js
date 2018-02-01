// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix windowProcess/commonReduxForm jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import HorizontalFormGroup from './HorizontalFormGroup';

const propsStub = {
  children: 1,
};

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <HorizontalFormGroup
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
