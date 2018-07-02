import React from 'react';
import { Field } from 'redux-form';
import InputField from '../../../windowProcess/commonReduxForm/InputField';

export default () => (
  <Field
    name="connectedData.path"
    component={InputField}
    type="text"
  />
);
