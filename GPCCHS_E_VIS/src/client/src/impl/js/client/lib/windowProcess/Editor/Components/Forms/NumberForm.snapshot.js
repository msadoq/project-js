import React from 'react';
import renderer from 'react-test-renderer';
import NumberForm from './NumberForm'

test('NumberForm simple message correctly', () => {
  const tree = renderer.create(
    <NumberForm />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
