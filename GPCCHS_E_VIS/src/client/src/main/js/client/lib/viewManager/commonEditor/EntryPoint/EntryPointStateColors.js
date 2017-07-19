import React, { PropTypes } from 'react';
import {
  reduxForm,
  FieldArray,
} from 'redux-form';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import StateColorsFields from '../Fields/StateColorsFields';
import EntryPointMonitoringStateColors from './EntryPointMonitoringStateColors';
import ClearSubmitButtons from '../../../windowProcess/commonReduxForm/ClearSubmitButtons';

/*
const filters = [
  'convertedValue', 'extractedValue', 'groundDate',
  'isNominal', 'isObsolete', 'monitoringState',
  'onBoardDate', 'rawValue', 'triggerOffCounter',
  'triggerOnCounter', 'validityState'
];
*/

const EntryPointStateColors = (props) => {
  const {
    pristine,
    reset,
    submitting,
    valid,
    handleSubmit,
  } = props;

  return (
    <div>
      <EntryPointMonitoringStateColors />
      <h4>Custom colors</h4>
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
        />
        <FieldArray
          name="stateColors"
          component={StateColorsFields}
        />
      </Form>
    </div>
  );
};

EntryPointStateColors.propTypes = {
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  enableReinitialize: true,
})(EntryPointStateColors);
