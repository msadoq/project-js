import React, { PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import {
  reduxForm,
  formValueSelector,
  Field,
} from 'redux-form';
import { ClearSubmitButtons } from '../../../../windowProcess/commonReduxForm/';
import { ButtonToggleField } from '../../../commonEditor/Fields/';
import EntryPointConnectedDataFields from './EntryPointConnectedDataFields';

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedDataXY extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      x: PropTypes.object,
      y: PropTypes.object,
      timeBasedData: PropTypes.bool,
    }).isRequired,
    axes: PropTypes.shape({}).isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    valid: PropTypes.bool.isRequired,
    xUnit: PropTypes.string.isRequired,
    yUnit: PropTypes.string.isRequired,
    timeBasedData: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    submitting: false,
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
      initialValues,
      timeBasedData,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <h4
          style={{
            display: 'inline-block',
          }}
        >
          Time based data&nbsp;&nbsp;
        </h4>
        <Field
          name="timeBasedData"
          component={ButtonToggleField}
          textOn="YES"
          textOff="NO"
        />

        <div>
          <div className="page-header">
            <h4>Abciss</h4>
          </div>
          <EntryPointConnectedDataFields
            prefix="x."
            unit={this.props.xUnit}
            timelines={timelines}
            axes={axes}
            axisId={initialValues.x.axisId}
            timeBasedData={timeBasedData}
          />
        </div>


        <div className="page-header">
          <h4>Ordinate</h4>
        </div>
        <EntryPointConnectedDataFields
          prefix="y."
          unit={this.props.yUnit}
          timelines={timelines}
          axes={axes}
          axisId={initialValues.y.axisId}
        />

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

const requiredFields = [
  'x.formula', 'x.domain', 'x.timeline',
  'y.formula', 'y.domain', 'y.timeline',
];

const validate = (values = {}) => {
  const errors = {};
  requiredFields.forEach((fieldPath) => {
    if (!_get(values, fieldPath)) {
      _set(errors, fieldPath, 'Required');
    }
  });

  return errors;
};

export default connect((state, { form }) => {
  const x = formValueSelector(form)(state, 'x');
  const y = formValueSelector(form)(state, 'y');
  return {
    timeBasedData: formValueSelector(form)(state, 'timeBasedData') === true,
    xUnit: x ? x.unit : '',
    yUnit: y ? y.unit : '',
  };
})(
  reduxForm({
    validate,
    enableReinitialize: true,
  })(EntryPointConnectedDataXY)
);
