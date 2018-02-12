import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import OnboardAlarmEditorForm from './OnboardAlarmEditorForm';

const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('OnboardAlarmEditorForm :: render', () => {
  test('OnboardAlarmEditorForm :: render', () => {
    const tree = shallow(
      <OnboardAlarmEditorForm
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
