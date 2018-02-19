import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';

const { bool, func } = PropTypes;

export default function WithForm(WrappedComponent) {
// eslint-disable-next-line react/prefer-stateless-function
  class WrapperForm extends React.Component {
    static propTypes = {
      pristine: bool.isRequired,
      handleSubmit: func.isRequired,
      reset: func.isRequired,
      submitting: bool.isRequired,
      valid: bool.isRequired,
    };

    render() {
      const {
        pristine,
        reset,
        submitting,
        valid,
        handleSubmit,
      } = this.props;

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
          <WrappedComponent {...this.props} />
        </Form>
      );
    }
  }

  return reduxForm({
    enableReinitialize: true,
  })(WrapperForm);
}

