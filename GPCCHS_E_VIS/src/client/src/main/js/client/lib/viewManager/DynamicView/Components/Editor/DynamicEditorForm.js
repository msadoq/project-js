import React, { PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import TextareaField from '../../../../windowProcess/commonReduxForm/TextareaField';

const EntryPointConnectedData = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    valid,
    timelines,
  } = props;

  return (
    <Form horizontal onSubmit={handleSubmit}>
      <HorizontalFormGroup label="Formula">
        <Field
          name="formula"
          component={TextareaField}
          className="form-control input-sm"
        />
      </HorizontalFormGroup>
      <HorizontalFormGroup label="Domain">
        <Field
          name="domain"
          component={InputField}
          type="text"
          className="form-control input-sm"
        />
      </HorizontalFormGroup>

      <HorizontalFormGroup label="Timeline">
        <Field
          name="timeline"
          clearable={false}
          component={ReactSelectField}
          free
          options={timelines.map(t =>
            ({
              label: t.id,
              value: t.id,
            })
          ).concat({
            label: '*',
            value: '*',
          })}
        />
      </HorizontalFormGroup>
      <ClearSubmitButtons
        pristine={pristine}
        submitting={submitting}
        reset={reset}
        valid={valid}
      />
    </Form>
  );
};

EntryPointConnectedData.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  initialValues: PropTypes.shape({
    formula: PropTypes.string,
    domain: PropTypes.string,
    timeline: PropTypes.string,
  }).isRequired,
  timelines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

const requiredFields = ['formula', 'domain', 'timeline'];
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
})(EntryPointConnectedData);
