import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form
} from 'react-bootstrap';
import {
  ButtonToggleField,
  InputField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';
import {
  FormSectionLineStyle
} from '../FormSections';

class PlotGrid extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      // label: PropTypes.string,
      xAxisId: PropTypes.string,
      yAxisId: PropTypes.string,
      lineStyle: PropTypes.string,
      width: PropTypes.number,
      showGrid: PropTypes.bool
    }),
    axes: PropTypes.array,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  static defaultProps = {
    initialValues: {
      label: 'grid 1',
      xAxisId: null,
      yAxisId: null,
      lineStyle: 'Continuous',
      width: 1,
      showGrid: false
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      axes
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        {/* Keeping in case we need to name grids!
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>
        */}
        <HorizontalFormGroup label="Show">
          <Field
            name="showGrid"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Line">
          <FormSectionLineStyle />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="X Axis">
          <Field
            name="xAxisId"
            className="form-control input-sm"
            component="select"
          >
            {axes.map((axis, key) => (
              <option key={key}>{axis.label}</option>
            ))}
          </Field>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Y Axis">
          <Field
            name="yAxisId"
            className="form-control input-sm"
            component="select"
          >
            {axes.map((axis, key) => (
              <option key={key}>{axis.label}</option>
            ))}
          </Field>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Width">
          <Field
            name="width"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
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


const requiredFields = [];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

export default reduxForm({
  validate,
  warn,
  enableReinitialize: true
})(PlotGrid);
