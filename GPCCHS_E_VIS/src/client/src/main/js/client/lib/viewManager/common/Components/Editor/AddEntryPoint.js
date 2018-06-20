import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
} from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';

class AddEntryPoint extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    initialValues: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    initialValues: { name: '' },
  };

  render() {
    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
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
