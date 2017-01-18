import React, { PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { HorizontalFormGroup, ClearSubmitButtons } from '../Forms/';
import {
  InputField,
  TextareaField,
  ReactSelectField,
} from '../Fields/';
/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedData extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      formula: PropTypes.string,
      domain: PropTypes.string,
      timeline: PropTypes.string,
    }).isRequired,
    timelines: PropTypes.array,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      timelines,
    } = this.props;
    // const { formula, domain, timeline } = initialValues;

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
  }
}

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
  enableReinitialize: true
})(EntryPointConnectedData);
