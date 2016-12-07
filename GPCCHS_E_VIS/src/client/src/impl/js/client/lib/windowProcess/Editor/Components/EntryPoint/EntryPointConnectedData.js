import React, { PropTypes } from 'react';
import {
  Form
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {
  InputField,
  TextareaField,
  ReactSelectField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';

export const unitOptions = [
  { value: 'ns', label: 'ns' },
  { value: 'us', label: 'us' },
  { value: 'ms', label: 'ms' },
  { value: 's', label: 's' },
  { value: 'min', label: 'min' },
  { value: 'h', label: 'h' },
  { value: 'day', label: 'day' },
  { value: 'year', label: 'year' },
  { value: 'century', label: 'century' },
  { value: 'V', label: 'V' }
];

export const formatOptions = [
  { value: 'decimal', label: 'decimal' },
  { value: 'hexadecimal', label: 'hexadecimal' },
  { value: 'binary', label: 'binary' }
];

export const axesOptions = [
  { value: 'time', label: 'time' },
  { value: 'frequency', label: 'frequency' },
  { value: 'temperature', label: 'temperature' }
];

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
      unit: PropTypes.string,
      digits: PropTypes.number,
      format: PropTypes.string,
      domain: PropTypes.string,
      timeline: PropTypes.string,
      axisId: PropTypes.string
    }).isRequired,
    axes: PropTypes.object,
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
      axes,
      timelines,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <HorizontalFormGroup label="Formula">
          <Field
            name="formula"
            component={TextareaField}
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
            component={ReactSelectField}
            clearable={false}
            options={unitOptions}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Format">
          <Field
            name="format"
            component={ReactSelectField}
            clearable={false}
            options={formatOptions}
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
            component="select"
            className="form-control input-sm"
          >
            <option value="*">*</option>
            {timelines.map((timeline, i) =>
              <option key={i} value={timeline.id}>{timeline.id}</option>
            )}
          </Field>
        </HorizontalFormGroup>

        {axes && <HorizontalFormGroup label="Axis">
          <Field
            name="axisId"
            className="form-control input-sm"
            component="select"
          >
            {Object.keys(axes).map((axisId) => {
              const axis = axes[axisId];
              return (
                <option key={axisId} value={axisId}>{axis.label}</option>
              );
            })}
          </Field>
        </HorizontalFormGroup>}

        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
      </Form>
    );
        /*

        {(format === 'decimal') ?
          <FormGroup controlId="formHorizontalDigits">
            <Col componentClass={ControlLabel} xs={3} >
              Digits
            </Col>
            <Col xs={9}>
              <FormControl
                type="number"
                className="input-sm"
                value={connectedData.digits}
                onChange={this.handleDigits}
              />
            </Col>
          </FormGroup>
          : null
        }
        {(type === 'FDS') ?
          <FormGroup controlId="formHorizontalUrl">
            <Col componentClass={ControlLabel} xs={3}>
              Url
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
         : null
        }
        {(type === 'FDS') ?
          <FormGroup controlId="formHorizontalVersion">
            <Col componentClass={ControlLabel} xs={3}>
              Version
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
        : null
        }
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} xs={3}>
            Filter
          </Col>
          <Col xs={5}>
            <FormControl componentClass="select" >
              <option value="noFilter">No Filter</option>
              <option value="convertedValue">Converted value</option>
              <option value="extractedValue">Extracted value</option>
              <option value="groundDate">Ground date</option>
              <option value="isNominal">Is nominal</option>
              <option value="isObsolete">Is obsolete</option>
              <option value="monitoringState">Monitoring state</option>
              <option value="onBoardDate">Onboard date</option>
              <option value="rawValue">Row value</option>
              <option value="triggerOffCounter">Trigger off counter</option>
              <option value="triggerOnCounter">Trigger on counter</option>
              <option value="validityState">Validity state</option>
            </FormControl>
          </Col>
          <Col xs={2}>
            <FormControl componentClass="select" >
              <option value="equals"> = </option>
              <option value="notEquals"> &ne; </option>
              <option value="inf"> &lt; </option>
              <option value="infOrEq"> &le; </option>
              <option value="sup"> &gt; </option>
              <option value="supOrEq"> &ge; </option>
              <option value="contains"> CONTAINS </option>
              <option value="notContains"> !CONTAINS </option>
            </FormControl>
          </Col>
          <Col xs={2}>
            <FormControl type="text" className="input-sm" />
          </Col>
        </FormGroup>
        */
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
