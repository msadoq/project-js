// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import {
  Form,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';

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

EntryPointName.defaultProps = {
  initialValues: { name: '' },
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(EntryPointName);
