import React, { PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import {
  Form
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import {
  ClearSubmitButtons
} from '../Forms/';
import {
  EntryPointConnectedDataFields
} from './';

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
        {['x', 'y'].map(coor =>
          <div key={coor}>
            <div className="page-header">
              <h4>{coor === 'x' ? 'Abciss' : 'Ordinate'}</h4>
            </div>
            <EntryPointConnectedDataFields
              prefix={`${coor}.`}
              timelines={timelines}
              axes={axes}
            />
          </div>
        )}
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

export default reduxForm({
  validate,
  enableReinitialize: true
})(EntryPointConnectedDataXY);
