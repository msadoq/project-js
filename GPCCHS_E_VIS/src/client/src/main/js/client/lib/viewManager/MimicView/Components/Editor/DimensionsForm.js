// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import { validateRequiredFields } from '../../../common';

const { Addon } = InputGroup;

class DimensionsForm extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
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
        /><br />
        <HorizontalFormGroup label="Width">
          <InputGroup>
            <Field
              name="width"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>px</Addon>
          </InputGroup>
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Height">
          <InputGroup>
            <Field
              name="height"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>px</Addon>
          </InputGroup>
        </HorizontalFormGroup>
      </Form>
    );
  }
}


const requiredFields = ['title'];

export default reduxForm({
  validate: validateRequiredFields(requiredFields),
  warn: () => ({}),
  enableReinitialize: true,
})(DimensionsForm);
