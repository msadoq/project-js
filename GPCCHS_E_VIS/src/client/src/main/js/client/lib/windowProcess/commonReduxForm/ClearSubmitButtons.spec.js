import React from 'react';
import renderer from 'react-test-renderer';
import ClearSubmitButtons from './ClearSubmitButtons';

const propsStub = {
  submitting: true,
  valid: true,
  pristine: true,
};

it('Navigation renders correctly', () => {
  const tree = renderer.create(
    <ClearSubmitButtons {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
