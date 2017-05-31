import React, { Component, PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import HorizontalFormGroup from '../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../windowProcess/commonReduxForm/InputField';
import FileInputField from '../../../windowProcess/commonReduxForm/FileInputField';


class AddLink extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    change: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    initialValues: { name: '', path: '' },
  };

  changePath = (val) => {
    this.props.change('path', val);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
      reset,
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

        <HorizontalFormGroup label="Path or OID">
          <Field
            name="path"
            changePath={this.changePath}
            component={FileInputField}
            onHandleSubmit={handleSubmit}
          />
        </HorizontalFormGroup>

        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          valid={valid}
          reset={reset}
        />
      </Form>
    );
  }
}

const requiredFields = ['name', 'path'];
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
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        name: selector(state, 'name'),
        path: selector(state, 'path'),
      };
    }
  )(AddLink)
);
