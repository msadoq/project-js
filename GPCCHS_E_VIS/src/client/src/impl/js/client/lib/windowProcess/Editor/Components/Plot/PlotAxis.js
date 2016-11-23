import React, { PropTypes, PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  InputGroup,
  Col
} from 'react-bootstrap';
import {
  ButtonToggleField, ColorPickerField,
  SelectButtonField, SelectFontField, InputField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';

const { Addon } = InputGroup;

class PlotAxis extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    initialValues: PropTypes.shape({
      label: PropTypes.string,
      unit: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      autoLimits: PropTypes.bool,
      tickStep: PropTypes.number,
      autoTick: PropTypes.bool,
      showTicks: PropTypes.bool,
      showTickLabels: PropTypes.bool,
      isLogarithmic: PropTypes.bool,
      showAxis: PropTypes.bool,
      style: PropTypes.object
    }),
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  static defaultProps = {
    initialValues: {
      unit: '',
      min: 0,
      max: 0,
      autoLimits: true,
      tickStep: 1,
      autoTick: true,
      showTicks: true,
      showTickLabels: true,
      isLogarithmic: false,
      showAxis: true,
      style: {
        font: 'Arial',
        size: 12,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        align: 'left',
        colour: '#000000'
      }
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Font">
          <div className="row">
            <Col xs={6}>
              <Field
                name="style.font"
                component={SelectFontField}
                className="form-control input-sm"
                type="text"
              />
            </Col>
            <Col xs={6}>
              <InputGroup>
                <Field
                  name="style.size"
                  component={InputField}
                  normalize={value => parseInt(value, 10)}
                  className="form-control input-sm"
                  type="number"
                />
                <Addon>px</Addon>
              </InputGroup>
            </Col>
          </div>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Style">
          <Field
            name="style.bold"
            component={ButtonToggleField}
            textOn="B"
            textOff="B"
          />
          <Field
            name="style.italic"
            component={ButtonToggleField}
            textOn="I"
            textOff="I"
          />
          <Field
            name="style.underline"
            component={ButtonToggleField}
            textOn="U"
            textOff="U"
          />
          <Field
            name="style.strikeOut"
            component={ButtonToggleField}
            textOn="S"
            textOff="S"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="style.colour"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Align">
          <Field
            component={SelectButtonField}
            name="style.align"
            buttons={[
              { label: 'left', icon: 'alignLeft' },
              { label: 'center', icon: 'alignCenter' },
              { label: 'right', icon: 'alignRight' }
            ]}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Show">
          <Field
            name="showAxis"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Min">
          <Field
            name="min"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Max">
          <Field
            name="max"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Auto Limit">
          <Field
            name="autoLimits"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Auto Tick">
          <Field
            name="autoTick"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Tick step">
          <Field
            name="tickStep"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
            step="any"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Show ticks">
          <Field
            name="showTicks"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Ticks label">
          <Field
            name="showTickLabels"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Logarithmic">
          <Field
            name="isLogarithmic"
            component={ButtonToggleField}
            styleOff="warning"
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

const requiredFields = ['label'];
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
})(PlotAxis);
