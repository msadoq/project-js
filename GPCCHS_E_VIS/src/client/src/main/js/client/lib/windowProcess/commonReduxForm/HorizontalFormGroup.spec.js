import React from 'react';
import renderer from 'react-test-renderer';
import HorizontalFormGroup from './HorizontalFormGroup';

const propsStub = {
  children: 1,
};

it('Navigation renders correctly', () => {
  const tree = renderer.create(
    <HorizontalFormGroup
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
