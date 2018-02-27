import React, { PropTypes } from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';

const { bool, func } = PropTypes;

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
    pristine: bool.isRequired,
    handleSubmit: func.isRequired,
    reset: func.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired,
  };

  return reduxForm({
    enableReinitialize: true,
  })(WithFormFieldArray);
}

