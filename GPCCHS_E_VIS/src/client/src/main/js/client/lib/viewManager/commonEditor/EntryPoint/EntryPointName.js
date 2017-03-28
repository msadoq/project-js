import React, { PropTypes } from 'react';
import {
  Form,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../windowProcess/commonReduxForm/InputField';

const EntryPointName = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    valid,
  } = props;

  return (
    <Form horizontal onSubmit={handleSubmit}>
      <HorizontalFormGroup label="Label">
        <Field
          name="name"
          component={InputField}
          className="form-control input-sm"
          type="text"
        />
      </HorizontalFormGroup>

      <ClearSubmitButtons
        pristine={pristine}
        submitting={submitting}
        valid={valid}
      />
    </Form>
  );
};

const requiredFields = ['name'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

EntryPointName.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

EntryPointName.defaultProps = {
  initialValues: { name: '' },
};
export default reduxForm({
  validate,
  enableReinitialize: true,
})(EntryPointName);
