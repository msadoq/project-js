import React from 'react';
import { reduxForm } from 'redux-form';
import {
  Button
} from 'react-bootstrap';
import renderer from 'react-test-renderer';
import FormSectionPointStyle from './FormSectionPointStyle';

const formSectionPointStyle = reduxForm()(FormSectionPointStyle);

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <Button>test</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
