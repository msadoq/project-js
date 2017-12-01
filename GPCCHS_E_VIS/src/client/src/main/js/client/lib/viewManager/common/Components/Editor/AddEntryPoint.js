import React, { Component, PropTypes } from 'react';
import {
  Form,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';

const { shape, string, func, bool } = PropTypes;

class AddEntryPoint extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    initialValues: shape({
      name: string.isRequired,
    }),
    handleSubmit: func.isRequired,
    pristine: bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    reset: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
  };

  static defaultProps = {
    initialValues: { name: '' },
  };

  render() {
    return (
      <Form horizontal onSubmit={this.props.handleSubmit}>
        <HorizontalFormGroup label="Label">
          <Field
            name="name"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <ClearSubmitButtons
          pristine={this.props.pristine}
          submitting={this.props.submitting}
          valid={this.props.valid}
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
})(AddEntryPoint);
