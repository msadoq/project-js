import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import GroundAlarmEditorForm from './GroundAlarmEditorForm';

const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('GroundAlarmEditorForm :: render', () => {
  test('GroundAlarmEditorForm :: render', () => {
    const tree = shallow(
      <GroundAlarmEditorForm
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
