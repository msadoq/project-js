import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray } from 'redux-form';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';

export default function WithForm(WrappedComponent, fieldArrayName) {
  const WithFormFieldArray = (props) => {
    const {
      pristine,
      reset,
      submitting,
      valid,
      handleSubmit,
    } = props;

    return (
      <Form
        horizontal
        onSubmit={handleSubmit}
        className={classnames(
          { 'redux-form-dirty': !pristine },
          'redux-form-padded'
        )}
      >
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
        <br />
        <FieldArray
          name={fieldArrayName}
          component={WrappedComponent}
          {...props}
        />
      </Form>
    );
  };

  WithFormFieldArray.propTypes = {
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  return reduxForm({
    enableReinitialize: true,
  })(WithFormFieldArray);
}

