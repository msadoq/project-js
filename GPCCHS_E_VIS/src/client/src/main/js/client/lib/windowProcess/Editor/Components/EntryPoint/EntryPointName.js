import React, { PropTypes } from 'react';
import {
  Form,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {
  InputField,
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons,
} from '../Forms/';

class EntryPointName extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
    } = this.props;

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
  }
}

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

export default reduxForm({
  validate,
  enableReinitialize: true,
})(EntryPointName);
