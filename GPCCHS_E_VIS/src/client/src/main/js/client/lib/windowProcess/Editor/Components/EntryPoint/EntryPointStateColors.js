import React, { PropTypes } from 'react';
import {
  reduxForm,
  FieldArray,
} from 'redux-form';
import { Form } from 'react-bootstrap';
import {
  StateColorsFields,
} from '../Fields/';
import EntryPointMonitoringStateColors from './EntryPointMonitoringStateColors';
import {
  ClearSubmitButtons,
  HorizontalFormGroup,
} from '../Forms/';

/*
const filters = [
  'convertedValue', 'extractedValue', 'groundDate',
  'isNominal', 'isObsolete', 'monitoringState',
  'onBoardDate', 'rawValue', 'triggerOffCounter',
  'triggerOnCounter', 'validityState'
];
*/

class EntryPointStateColors extends React.Component {
  static propTypes = {
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  render() {
    const {
      pristine,
      reset,
      submitting,
      valid,
      handleSubmit,
    } = this.props;

    return (
      <div>
        <EntryPointMonitoringStateColors />
        <h4>Custom colors</h4>
        <Form horizontal onSubmit={handleSubmit}>
          <FieldArray
            name="stateColors"
            component={StateColorsFields}
          />
          <HorizontalFormGroup>
            <ClearSubmitButtons
              pristine={pristine}
              submitting={submitting}
              reset={reset}
              valid={valid}
            />
          </HorizontalFormGroup>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
})(EntryPointStateColors);
